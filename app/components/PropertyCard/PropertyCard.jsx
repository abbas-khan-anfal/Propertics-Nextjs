'use client';
import React from 'react';
import Styles from './PropertyCard.module.css';
import Image from 'next/image';
import notFoundImg from '@/app/assets/not-found.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function PropertyCard({ cardData }) {
  const router = useRouter();
  if (!cardData || Object.keys(cardData).length === 0) {
    return <>This property not found!</>;
  }

  return (
    <div className={`card ${Styles.propCardBox}`} onClick={() => {router.push(`/property_details/${cardData?._id.toString()}`)}}>
      <div className={Styles.propCardSec1}>
        <Image
          src={cardData?.img_paths?.length > 0 ? cardData?.img_paths[0] : notFoundImg}
          alt="Property Image"
          title="Property Image"
          className={`card-img-top ${Styles.propCardImg}`}
          width={1000}
          height={1000}
        />
      </div>
      <div className={`card-body ${Styles.propCardSec2}`}>
        <h4 className={`h4 ${Styles.propCardTitle}`}>{cardData?.title}</h4>
        <p className={`${Styles.propCardDesc}`}>{cardData?.description}</p>
        <h5 className={`h5 ${Styles.propLocation}`}>
          <i className="fa-solid fa-location-dot"></i> {cardData?.location_name}
        </h5>
        <Link href={`/property_details/${cardData?._id.toString()}`} className="unBtn mdBtn">
          <i className="fa-solid fa-eye"></i> View Property
        </Link>
      </div>
    </div>
  );
}

export default PropertyCard;
