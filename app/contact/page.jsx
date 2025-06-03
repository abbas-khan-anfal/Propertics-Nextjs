'use client';
import React, { useState } from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import notFoundImg from '@/app/assets/not-found.png'; // place your image in public/images
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Title from '../components/Title/Title';
import axios from 'axios';
import toast from 'react-hot-toast';
import Message from '../components/Message/Message';

const ContactPage = () => {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [thankYou, setThankYou] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBtnLoading(true);
    const dataObj = {fullName, email, message};
    try {
      const response = await axios.post("/api/messages", dataObj, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success(response?.data?.message || "Message sent successfully");
      setFullName("");
      setEmail("");
      setMessage("");
      setLoading(false);
      setBtnLoading(false);
      if(response?.data?.success)
      {
        setTimeout(() => {
          setThankYou(true);
        }, 1000);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "failed sending message");
    }
  };

  return (
    <>
    <Navbar/>
    <div className={`container ${styles.contactPage}`}>
      <div className="row align-items-center">

        {/* Left Form Section */}
        <div className="col-lg-6 col-md-12 col-sm-12">
          <Title title="Contact Us" />
          <p className={styles.subtitle}>
            Have a question or want to work with us? Fill out the form below.
          </p>

          {
            !thankYou
            ?
            (
              <form className={styles.form} onSubmit={submitHandler}>
                <fieldset disabled={loading}>
                <div className="mb-3">
                  <input type="text" className='inputField' placeholder='Enter full name' onChange={e => setFullName(e.target.value)} value={fullName} required />
                </div>

                <div className="mb-3">
                    <input type="email" className='inputField' placeholder='Enter email' onChange={e => setEmail(e.target.value)} value={email} required />
                </div>

                <div className="mb-3">
                  <textarea
                    rows="4"
                    className="inputField"
                    placeholder="Write your message"
                    onChange={e => setMessage(e.target.value)} value={message}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="unBtn lgBtn">
                  {btnLoading ? "Message sending..." : "Send Message"}
                </button>
                </fieldset>
              </form>
            )
            :
            (
              <>
              <Message message="Thank you for contacting us. We will be in touch with you shortly." />
              </>
            )
          }
          
        </div>

        {/* Right Image Section */}
        <div className="col-lg-6 col-md-12 col-sm-12 mt-3">
          <Image
            src={notFoundImg}
            alt="Contact Us"
            className={`img-fluid ${styles.image}`}
          />
        </div>


      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ContactPage;
