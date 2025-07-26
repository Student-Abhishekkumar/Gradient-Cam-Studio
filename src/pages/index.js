import Head from 'next/head';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Features from '../components/Features';
import Recorder from '../components/Recorder';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Gradient Cam Studio | Professional Webcam Recording</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
      </Head>
      
      <Header />
      <Hero />
      <Stats />
      <Features />
      <Recorder />
      <Testimonials />
      <Footer />
    </div>
  );
}