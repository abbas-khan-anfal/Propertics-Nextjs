'use client';
import { useContext } from "react";
import FunctinalContext from "../context/Functional Context/context";

// toggle the navbar handler
export const useToggleNavHandler = () => {
    const {siteNav, setSiteNav} = useContext(FunctinalContext);
    
    const toggleNavHandler = () => {
        setSiteNav(!siteNav);
    }

    return {toggleNavHandler};
}


// toggle the dashboard navbar handler
export const useDashNavToggleHandler = () => {
    const {siteDashNav, setSiteDashNav} = useContext(FunctinalContext);

    const dashNavToggleHandler = () => {
        setSiteDashNav(!siteDashNav);
    }

    return {dashNavToggleHandler};
}