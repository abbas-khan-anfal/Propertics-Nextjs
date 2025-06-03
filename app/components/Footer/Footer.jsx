'use client';
import styles from './Footer.module.css';
import Image from 'next/image';
import LogoImage from '@/app/assets/logo-w.png';
import Logo from '../ReusableLogo/Logo';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="row">

          <div className={`col-lg-4 col-md-6 ${styles.col1}`}>
            <Logo srcImg={LogoImage} />
            <p className={styles.description}>The customer is at the heart of our unique business model, which includes design.</p>
            <ul className={styles.paymentIcons}>
              <li><a href="#">1</a></li>
              <li><a href="#">2</a></li>
              <li><a href="#">3</a></li>
              <li><a href="#">4</a></li>
            </ul>
          </div>

          <div className={`col-lg-2 col-md-3 ${styles.col2}`}>
            <h5 className={styles.title}>SHOPPING</h5>
            <ul className={styles.navList}>
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Course</a></li>
              <li><a href="#">Gallery</a></li>
              <li><a href="#">Content</a></li>
            </ul>
          </div>

          <div className={`col-lg-2 col-md-3 ${styles.col2}`}>
            <h5 className={styles.title}>SHOPPING</h5>
            <ul className={styles.navList}>
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Course</a></li>
              <li><a href="#">Gallery</a></li>
              <li><a href="#">Content</a></li>
            </ul>
          </div>

          <div className={`col-lg-4 col-md-12 ${styles.col3}`}>
            <h5 className={styles.title}>NEWLETTER</h5>
            <p className={styles.description}>Be the first to know about new arrivals, look books, sales & promos!</p>
            <div className="form-group">
              <input type="email" placeholder="Your email" className={styles.input} />
            </div>
          </div>

          <div className={`col-12 ${styles.col4}`}>
            <p>&copy; 2024 All rights reserved | This template is made with ❤️ by Colorlib</p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
