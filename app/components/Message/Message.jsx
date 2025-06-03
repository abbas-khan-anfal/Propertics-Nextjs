'use client';
import React from 'react';
import Styles from './Message.module.css';

function Message({message}) {
  return (
    <div className={Styles.message}>
        <span>{message || "something went wrong"}</span>
    </div>
  )
}

export default Message;