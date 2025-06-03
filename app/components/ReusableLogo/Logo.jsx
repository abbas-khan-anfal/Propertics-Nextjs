import React from 'react';
import Styles from './Logo.module.css';
import Image from 'next/image';

function Logo({srcImg}) {
  return (
    <>
        {
          srcImg
          ?
          <Image src={srcImg} alt="Logo" title='Logo' className={Styles.globalLogo} />
          :
          <h4 className='h4'>Your Logo here</h4>
        }
    </>
  )
}

export default Logo;