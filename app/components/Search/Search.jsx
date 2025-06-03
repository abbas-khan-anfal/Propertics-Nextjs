'use client';
import React, { useState } from "react";
import Styles from "./Search.module.css";
import { useRouter } from "next/navigation";

function Search() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");


  const submitHandler = (e) => {
    e.preventDefault();
    if(searchTerm.trim() !== "")
    {
      router.push(`/search/${searchTerm}`);
      setSearchTerm("");
    }
  }
  return (
    <form className="form-inline" onSubmit={submitHandler}>
      <label className="h5">Search By address or location</label>
      <div className={Styles.searchBox}>
        <input
          type="text"
          className={`inputField ${Styles.searchInput}`}
          placeholder="Search property"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className={`unBtn smBtn ${Styles.searchBtn}`}>
          <i className="fa-solid fa-magnifying-glass-location"></i>
        </button>
      </div>
    </form>
  );
}

export default Search;
