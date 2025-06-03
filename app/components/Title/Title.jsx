'use client';
import React from 'react';

function Title({title}) {
  return (
    <div className="mb-3">
        <h3 className='h3'>{title || ""}</h3>
    </div>
  )
}

export default Title;