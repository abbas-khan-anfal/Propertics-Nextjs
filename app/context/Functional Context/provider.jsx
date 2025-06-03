'use client';
import React, { useState } from 'react';
import Context from './context';

function Provider({ children }) {
    const [siteNav, setSiteNav] = useState(false);
    const [siteDashNav, setSiteDashNav] = useState(false);
  return (
    <Context.Provider value={{
      siteNav, setSiteNav,
      siteDashNav, setSiteDashNav
      }}>
        {children}
    </Context.Provider>
  )
}

export default Provider;