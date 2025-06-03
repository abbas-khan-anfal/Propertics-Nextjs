"use client";
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import PropertyCard from "./components/PropertyCard/PropertyCard";
import Title from "./components/Title/Title";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import axios from "axios";
import Message from "./components/Message/Message";
import Link from "next/link";
import Loader from "./components/Loader/Loader";

function page() {
  const [properties, setProperties] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/properties/public_routes/fetch_random`
        );
        setProperties(response?.data?.properties);
      } catch (error) {
        console.log(error?.response?.data?.message || error?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <>
      <Navbar />

      <>
        <Hero />
      </>

      <div className="container py-5">
        <div className="row">
          <div className="col-12">
            <Title title="Latest Properties" />
          </div>

          {!loading ? (
            properties && properties.length > 0 ? (
              <>
                {properties.map((property) => (
                  <div
                    key={property._id}
                    className="col-lg-4 col-md-6 col-sm-12"
                  >
                    <PropertyCard cardData={property} />
                  </div>
                ))}
              </>
            ) : (
              <Message message="No property found!" />
            )
          ) : (
            <div className="col-12 d-flex justify-content-center py-5">
              <Loader loaderWidth="100px" />
            </div>
          )}

          <div className="col-12 mt-3 text-center">
            <Link href="/properties" className="unBtn mdBtn">
              View More
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default page;
