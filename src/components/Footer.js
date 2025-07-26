import Link from 'next/link';

const Footer = () => {
  return (
    <footer>
      <div className="footer-logo">Gradient Cam Studio</div>
      <p>Professional video recording with stunning visuals</p>
      
      <div className="social-links">
        {['twitter', 'facebook-f', 'instagram', 'linkedin-in', 'github'].map((platform) => (
          <a href="#" className="social-link" key={platform}>
            <i className={`fab fa-${platform}`}></i>
          </a>
        ))}
      </div>
      
      <nav>
        <ul>
          <li><Link href="#">Home</Link></li>
          <li><Link href="#features">Features</Link></li>
          <li><Link href="#recorder">Recorder</Link></li>
          <li><Link href="#testimonials">Testimonials</Link></li>
          <li><Link href="#">Privacy Policy</Link></li>
        </ul>
      </nav>
      
      <div className="copyright">
        &copy; {new Date().getFullYear()} Gradient Cam Studio. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;