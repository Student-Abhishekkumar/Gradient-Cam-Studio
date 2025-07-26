import { useState, useRef, useEffect } from 'react';

const Recorder = () => {
  const [stream, setStream] = useState(null);
  const [recorder, setRecorder] = useState(null);
  const [chunks, setChunks] = useState([]);
  const [recordingStartTime, setRecordingStartTime] = useState(null);
  const [recordedVideos, setRecordedVideos] = useState([]);
  const [status, setStatus] = useState('idle');
  const [notification, setNotification] = useState(null);
  
  const previewRef = useRef(null);
  const videoListRef = useRef(null);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const updateStatus = (newStatus) => {
    setStatus(newStatus);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const addVideoToGallery = (blob, filename, duration) => {
    const url = URL.createObjectURL(blob);
    const video = {
      url: url,
      filename: filename,
      timestamp: new Date(),
      duration: duration,
      blob: blob
    };
    
    setRecordedVideos(prev => [video, ...prev]);
    setNotification(`Recording saved: ${filename}`);
  };

  const deleteVideo = (index) => {
    if (confirm('Are you sure you want to delete this recording?')) {
      const newVideos = [...recordedVideos];
      URL.revokeObjectURL(newVideos[index].url);
      newVideos.splice(index, 1);
      setRecordedVideos(newVideos);
    }
  };

  const playVideo = (url) => {
    if (previewRef.current) {
      previewRef.current.srcObject = null;
      previewRef.current.src = url;
      previewRef.current.controls = true;
      previewRef.current.muted = false;
    }
    document.querySelector('#recorder').scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 1280, height: 720 }, 
        audio: true 
      });
      setStream(mediaStream);
      if (previewRef.current) {
        previewRef.current.srcObject = mediaStream;
        previewRef.current.controls = false;
        previewRef.current.muted = true;
      }
      updateStatus('idle');
      document.querySelector('#recorder').scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (err) {
      alert('Could not access camera/microphone: ' + err.message);
    }
  };

  const startRecording = () => {
    if (!stream) return;
    
    setChunks([]);
    setRecordingStartTime(Date.now());
    
    const mediaRecorder = new MediaRecorder(stream, { 
      mimeType: 'video/webm; codecs=vp9,opus',
      videoBitsPerSecond: 2500000
    });
    
    mediaRecorder.ondataavailable = e => { 
      if (e.data.size > 0) {
        setChunks(prev => [...prev, e.data]);
      }
    };
    
    mediaRecorder.onstop = () => {
      const duration = Math.round((Date.now() - recordingStartTime) / 1000);
      const blob = new Blob(chunks, { type: 'video/webm' });
      const filename = `recording_${new Date().toISOString().replace(/[:.]/g, '-')}.webm`;
      
      addVideoToGallery(blob, filename, duration);
      updateStatus('idle');
    };
    
    mediaRecorder.start();
    setRecorder(mediaRecorder);
    updateStatus('recording');
  };

  const stopRecording = () => {
    if (recorder && recorder.state === 'recording') {
      recorder.stop();
    }
  };

  return (
    <section className="recorder-section" id="recorder">
      <h2 className="section-title"><i className="fas fa-video"></i> Video Recorder</h2>
      <div className="recorder-container">
        <div className="recording-section">
          <h3 className="section-title recorder">
            <span className={`status-indicator ${status}`}></span>
            Live Recording
          </h3>
          <video ref={previewRef} id="preview" autoPlay muted></video>
          <div className="controls">
            <button 
              onClick={startCamera} 
              className="start-camera"
              disabled={!!stream}
            >
              <i className="fas fa-video"></i> Start Camera
            </button>
            <button 
              onClick={startRecording} 
              className="start-record" 
              disabled={!stream || status === 'recording'}
            >
              <i className="fas fa-record-vinyl"></i> Start Recording
            </button>
            <button 
              onClick={stopRecording} 
              className="stop-record" 
              disabled={!recorder || recorder.state !== 'recording'}
            >
              <i className="fas fa-stop"></i> Stop Recording
            </button>
          </div>
        </div>

        <div className="video-gallery">
          <div className="video-gallery-header">
            <h3 className="section-title recorder"><i className="fas fa-folder-open"></i> Recorded Videos</h3>
          </div>
          <div id="video-list" ref={videoListRef}>
            {recordedVideos.length === 0 ? (
              <div className="empty-state">
                <p>No recordings yet. Start your first recording to see it here!</p>
              </div>
            ) : (
              recordedVideos.map((video, index) => (
                <div className="video-item" key={index}>
                  <div className="video-info">
                    <div className="video-name">{video.filename}</div>
                    <div className="video-time">
                      <span><i className="fas fa-clock"></i> {formatDuration(video.duration)}</span>
                      <span><i className="fas fa-calendar"></i> {formatDate(video.timestamp)}</span>
                    </div>
                  </div>
                  <div className="video-actions">
                    <a 
                      href={video.url} 
                      className="download-btn" 
                      download={video.filename}
                    >
                      <i className="fas fa-download"></i>
                    </a>
                    <button 
                      className="play-btn" 
                      onClick={() => playVideo(video.url)}
                    >
                      <i className="fas fa-play"></i>
                    </button>
                    <button 
                      className="delete-btn" 
                      onClick={() => deleteVideo(index)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {notification && (
        <div className="notification" style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: 'var(--success-gradient)',
          color: 'white',
          padding: '15px 25px',
          borderRadius: '10px',
          boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
          zIndex: 1000,
          animation: 'fadeIn 0.3s, fadeOut 0.3s 2.7s'
        }}>
          <i className="fas fa-check-circle" style={{ marginRight: '10px' }}></i>
          {notification}
        </div>
      )}
    </section>
  );
};

export default Recorder;