import Link from 'next/link';
import React from 'react';
import Styles from './not-found.module.css';
 
export default function NotFound() {
  return (
    <div className={`container`}>
      <div className="row">
        <div className="col-6">
          <h2 className={``}>Not Found</h2>
          <p className={``}>Could not find requested resource</p>
          <Link href="/" className={``}>Return Home</Link>
        </div>
      </div>
    </div>
  )
}