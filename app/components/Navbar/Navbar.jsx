'use client';
import React, { useContext } from 'react';
import Style from './Navbar.module.css';
import logoImg from '../../assets/logo-b.png';
import Image from 'next/image';
import { useToggleNavHandler } from '@/app/hooks/useFunctional';
import FunctionalContext from '@/app/context/Functional Context/context';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

function Navbar() {
    const router = useRouter();
    const { toggleNavHandler } = useToggleNavHandler();
    const { siteNav, setSiteNav } = useContext(FunctionalContext);
    const pathname = usePathname();
  return (
    <>
    <div className={`${Style.navBgLayer} ${siteNav ? Style.show : ''}`} onClick={toggleNavHandler}></div>

    <nav className={Style.navbar}>
        <div className={Style.logoBox}>
                <button className={`circleBtn ${Style.navOpenBtn}`} onClick={toggleNavHandler}>&#9776;</button>
            <Link href="/">
                <Image src={logoImg} className={Style.logoImg} alt="Logo" title='Logo' />
            </Link>
        </div>
        <div className={Style.navLinks}>
            <ul className={`${Style.navUl} ${siteNav ? Style.show : ''}`}>
                <button className={`circleBtn ${Style.navCloseBtn}`} onClick={toggleNavHandler}>&#10005;</button>
                <li className={Style.navLi}><Link href="/" className={`${Style.navLink} ${pathname === "/" ? Style.active : ''}`}>Home</Link></li>
                <li className={Style.navLi}><Link href="/properties" className={`${Style.navLink} ${pathname === "/properties" ? Style.active : ''}`}>Properties</Link></li>
                <li className={Style.navLi}><Link href="/about" className={`${Style.navLink} ${pathname === "/about" ? Style.active : ''}`}>About</Link></li>
                <li className={Style.navLi}><Link href="/contact" className={`${Style.navLink} ${pathname === "/contact" ? Style.active : ''}`}>Contact</Link></li>
                <span className={Style.divider}>|</span>
                <hr className={Style.hRole}></hr>
                <button className={`unBtn mdBtn ${Style.listBtn}`} onClick={() => router.push('/login')}>List Your Property</button>
            </ul>
        </div>
    </nav>
    </>
  )
}

export default Navbar;