import React from 'react';
import Styles from './Skel1.module.css';

function Skel1() {
  return (
    <div className={Styles.smImgSkCont}>
        <div className={Styles.smImgSk}></div>
        <div className={Styles.smImgSk}></div>
        <div className={Styles.smImgSk}></div>
        <div className={Styles.smImgSk}></div>
    </div>
  )
}

export default Skel1;