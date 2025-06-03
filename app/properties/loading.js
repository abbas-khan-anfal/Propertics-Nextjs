'use client';
import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Loader from '../components/Loader/Loader';
import Footer from '../components/Footer/Footer';

function loading() {
  return (
    <>
        <Navbar/>
            <div className="col-12 py-5 d-flex justify-content-center">
                <Loader loaderWidth="100px" />
            </div>
        <Footer/>
    </>
  )
}

export default loading;