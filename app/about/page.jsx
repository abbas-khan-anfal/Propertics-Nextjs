import styles from './page.module.css';
import Image from 'next/image';
import notFoundImg from '@/app/assets/not-found.png'; // place your image in public/images
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Title from '../components/Title/Title';

const AboutPage = () => {
  return (
    <>
    <Navbar />
    <div className={`container ${styles.aboutPage}`}>
      <div className="row justify-content-center text-center mb-5">
        <div className="col-lg-8">
          <Title title="About Our Company" />
          <p className={styles.subtitle}>
            We’re a passionate group of innovators on a mission to change the future with cutting-edge technology, creativity, and teamwork.
          </p>
        </div>
      </div>

      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          <Image src={notFoundImg} alt="Our Mission" className={`img-fluid ${styles.image}`} />
        </div>
        <div className="col-md-6">
          <h2 className={styles.heading}>Our Mission</h2>
          <p className={styles.text}>
            Our mission is to democratize access to powerful digital tools and knowledge, enabling everyone to build, learn, and grow regardless of where they come from.
          </p>
        </div>
      </div>

      <div className="row align-items-center flex-md-row-reverse mb-5">
        <div className="col-md-6">
          <Image src={notFoundImg} alt="Our Vision" className={`img-fluid ${styles.image}`} />
        </div>
        <div className="col-md-6">
          <h2 className={styles.heading}>Our Vision</h2>
          <p className={styles.text}>
            We envision a connected world where technology fuels innovation, promotes equality, and unlocks human potential to solve real-world problems.
          </p>
        </div>
      </div>

      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          <Image src={notFoundImg} alt="Our Team" className={`img-fluid ${styles.image}`} />
        </div>
        <div className="col-md-6">
          <h2 className={styles.heading}>Our Team</h2>
          <p className={styles.text}>
            Our diverse team of developers, designers, and visionaries is united by a shared purpose — building digital experiences that matter. We value creativity, curiosity, and continuous growth.
          </p>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default AboutPage;
