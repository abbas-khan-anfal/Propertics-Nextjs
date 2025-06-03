'use client';
import React, { useContext } from 'react';
import Styles from './Dashboard.module.css';
import Logo from '@/app/components/ReusableLogo/Logo';
import logoImg from '@/app/assets/logo-w.png';
import userAvatar from '@/app/assets/user.png';
import { useDashNavToggleHandler } from '@/app/hooks/useFunctional';
import FunctionalContext from '@/app/context/Functional Context/context';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';
import Image from 'next/image';

function Dashboard({component}) {
    const router = useRouter();
    const { siteDashNav, setSiteDashNav } = useContext(FunctionalContext);
    const { dashNavToggleHandler } = useDashNavToggleHandler();
    const pathname = usePathname();

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("/api/auth/logout");
      toast.success(response?.data?.message || "Logout successful");
      setTimeout(() => {
        router.push('/login');
      },1000);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };
    
return (
  <div className={Styles.dashboard}>


  <aside className={`${Styles.dashAside} ${siteDashNav ? Styles.show : ''}`}>
      <div className={Styles.sec1}>
          <button className={`circleBtn ${Styles.dashCloseBtn}`} onClick={dashNavToggleHandler}>&#10005;</button>
          <div className={`${Styles.dashLogoBox}`}>
              <Logo srcImg={logoImg} />
          </div>

          <div className={Styles.dashLinks}>
              <Link href="/dashboard" className={pathname === "/dashboard" ? Styles.active : ''}>Home</Link>
              <Link href="/dashboard/add_property" className={pathname === "/dashboard/add_property" ? Styles.active : ''}>Add Property</Link>
              <Link href="/dashboard/messages" className={pathname === "/dashboard/messages" ? Styles.active : ''}>Messages</Link>
          </div>
      </div>

      <div className={Styles.sec2}>
          <button className={`unBtn lgBtn ${Styles.logoutBtn}`} onClick={logoutHandler}>Logout</button>
      </div>
  </aside>


  <main className={Styles.dashMain}>


      <nav className={Styles.dashNav}>
          <div className={Styles.dashNavData}>
              <button className={`circleBtn ${Styles.dashNavOpenBtn}`} onClick={dashNavToggleHandler}>&#9776;</button>
              <h4 className={`h4 ${Styles.dashNavTitle}`}>Dashboard</h4>
          </div>

          <button className="circleBtn" title='User Profile' onClick={() => router.push('/dashboard/profile')}>
            <i className="fa-solid fa-user"></i>
          </button>
          
      </nav>


      <section className={Styles.dashSection}>
          
          {component}

      </section>
  </main>
</div>
);
}

export default Dashboard