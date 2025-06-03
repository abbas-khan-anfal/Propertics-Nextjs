// components/PropertyCard/SkeletonCard.jsx
import React from 'react';
import Styles from './Skeleton.module.css';

const SkeletonCard = () => (
  <div className={`card ${Styles.propCardBox}`}>
    <div className={Styles.propCardSec1}>
      <div className={Styles.skeletonImg}></div>
    </div>
    <div className={`card-body ${Styles.propCardSec2}`}>
      <div className={Styles.skeletonTitle}></div>
      <div className={Styles.skeletonText}></div>
      <div className={Styles.skeletonLocation}></div>
      <div className={Styles.skeletonBtn}></div>
    </div>
  </div>
);

export default SkeletonCard;
