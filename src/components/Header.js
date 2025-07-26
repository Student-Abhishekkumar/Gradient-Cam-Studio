import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <div className="logo">
        <div className="logo-icon"><i className="fas fa-video"></i></div>
        <div>Gradient Cam Studio</div>
      </div>
      <nav>
        <ul>
          <li><Link href="#" className="active">Home</Link></li>
          <li><Link href="#features">Features</Link></li>
          <li><Link href="#recorder">Recorder</Link></li>
          <li><Link href="#testimonials">Testimonials</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;