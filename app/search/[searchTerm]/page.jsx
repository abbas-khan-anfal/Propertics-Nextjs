"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import PropertyCard from "@/app/components/PropertyCard/PropertyCard";
import Title from "@/app/components/Title/Title";
import Search from "@/app/components/Search/Search";
import { useParams } from "next/navigation";
import axios from 'axios';
import Message from "@/app/components/Message/Message";
import Loader from "@/app/components/Loader/Loader";

function page() {
  const {searchTerm} = useParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const newSearchTerm = searchTerm.replaceAll("%20", " ");


  const searchHandler = async (searchParam) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/properties/public_routes/search_properties/${searchParam}`);
      setProperties(response?.data?.data || []);
    } catch (error) {
      console.log(error?.response?.data?.message || error?.message);
    }
    finally
    {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchHandler(newSearchTerm);
  }, [newSearchTerm]);

  return (
    <>
      <Navbar />

      <div className="container py-5">

        <div className="row justify-content-center">
            <div className="col-lg-6 col-md-6 col-sm-12">
               <Search />
            </div>
        </div>

        <div className="row">
            <div className="my-5"></div>

            <div className="col-12 mb-1">
                <h4 className="h4">{`Search : ${newSearchTerm !== "" ? newSearchTerm : "Search properties"}`}</h4>
            </div>

        {
          !loading
          ?
          (
            <>
            <div className="col-12 mb-1">
                <span>{`${properties?.length} result found`}</span>
            </div>
            {
                properties && properties.length > 0 ? (
                <>
                  {properties.map((property) => (
                    <div key={property._id} className="col-lg-4 col-md-6 col-sm-12">
                      <PropertyCard cardData={property} />
                    </div>
                  ))}
                </>
              ) : (
                <Message message="No property found!" />
              )
            }
            </>
          )
          :
          (
            <div className="col-12 d-flex justify-content-start py-2">
              <Loader loaderWidth="50px" />
            </div>
          )
          }
            
        </div>
      </div>

      <Footer />
    </>
  );
}

export default page;
