import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import PropertyCard from "../components/PropertyCard/PropertyCard";
import Title from "../components/Title/Title";
import Styles from './page.module.css';
import Search from "../components/Search/Search";
import axios from "axios";
import Message from "../components/Message/Message";
import Link from "next/link";

// Updated fetch function with limit
const fetchDataHandler = async (limit) => {
  try {
    const response = await axios.get(`/api/properties/public_routes/fetch_limited?page=${limit}`);
    return response?.data;
  } catch (error) {
    console.log(error?.response?.data?.message || error?.message);
    return [];
  }
};

// Server component accepts searchParams
async function page({ searchParams }) {
  const searchPrms = await searchParams;
  const pageParam = searchPrms?.page || '1';
  const page = parseInt(pageParam, 10);

  const { data, currentPage, totalPages } = await fetchDataHandler(page);

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

          <div className="col-12">
            <Title title="Latest Properties" />
          </div>

          {data && data.length > 0 ? (
            <>
              {data.map((property) => (
                <div key={property._id} className="col-lg-4 col-md-6 col-sm-12">
                  <PropertyCard cardData={property} />
                </div>
              ))}

              <div className="col-12 text-center">
                {/* Increase limit by 5 each time */}
                {
                  currentPage > 1
                  ?
                  (
                    <Link
                      href={`/properties?page=${currentPage - 1}`}
                      className="unBtn mdBtn"
                    >
                      Prev
                    </Link>
                  )
                  :
                  (
                    <button
                      className="unBtn mdBtn" disabled
                    >
                      Prev
                    </button>
                  )
                }
                
                {
                  totalPages > currentPage
                  ?
                  (
                    <Link
                      href={`/properties?page=${currentPage + 1}`}
                      className="unBtn mdBtn"
                    >
                      Next
                    </Link>
                  )
                  :
                  (
                    <button
                      className="unBtn mdBtn" disabled
                    >
                      Next
                    </button>
                  )
                }

              </div>
            </>
          ) : (
            <Message message="No property found!" />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default page;
