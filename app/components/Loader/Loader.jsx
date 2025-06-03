'use client';
import React from 'react';
import Styles from './Loader.module.css';

function Loader({loaderWidth}) {
  return (
    <div className={Styles.loader} style={{width:loaderWidth ? loaderWidth : '50px'}}></div>
  )
}

export default Loader;