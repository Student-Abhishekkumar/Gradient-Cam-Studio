const Features = () => {
  return (
    <section className="features" id="features">
      <h2 className="section-title">Key Features</h2>
      <div className="features-grid">
        {[
          {icon: 'camera', title: 'High-Quality Recording', desc: 'Record videos in HD resolution with crisp audio.'},
          {icon: 'palette', title: 'Gradient Visuals', desc: 'Beautiful gradient backgrounds for professional aesthetics.'},
          {icon: 'cloud-download-alt', title: 'Easy Download', desc: 'Save recordings instantly with one click.'},
          {icon: 'mobile-alt', title: 'Responsive Design', desc: 'Works perfectly on any device.'},
        ].map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon"><i className={`fas fa-${feature.icon}`}></i></div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;