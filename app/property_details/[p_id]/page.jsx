'use client';
import React from 'react';
import Title from '@/app/components/Title/Title';
import Image from 'next/image';
import notFound from '@/app/assets/not-found.png';
import Styles from './page.module.css';
import Link from 'next/link';
import PropertyCard from '@/app/components/PropertyCard/PropertyCard';
import Navbar from '@/app/components/Navbar/Navbar';
import Footer from '@/app/components/Footer/Footer';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Message from '@/app/components/Message/Message';
import Loader from '@/app/components/Loader/Loader';
import Skel1 from './Skeletons/Skel1';
import Skel2 from './Skeletons/Skel2';

function page() {
    const { p_id } = useParams();

    const [property, setProperty] = React.useState({});
    const [properties, setProperties] = React.useState([]);
    const [largeImage, setLargeImage] = React.useState("");
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchProperty = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/api/properties/public_routes/fetch_single/${p_id}`);
                setProperty(response?.data?.property || {});
                setLargeImage(response?.data?.property?.img_paths?.[0] || notFound);
                setProperties(response?.data?.properties);
            } catch (error) {
                console.log(error?.response?.data?.message || error?.message);
            }
            finally
            {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [p_id]);

  return (
    <>
    <Navbar />
    <div className={`container ${Styles.propertyDetailsPage}`}>
        <div className="row">

            <div className="col-12 mb-3">
                <Title title="Property Details" />
            </div>

            <div className={`col-lg-6 col-md-12 col-sm-12 ${Styles.imageSection}`}>
                {
                    loading
                    ?
                    (
                        <Skel2/>
                    )
                    :
                    (
                        <Image 
                            src={largeImage}
                            alt="Property Image" 
                            className={`img-fluid ${Styles.largeImg}`} 
                            title="Property Image" 
                            width={1000}
                            height={1000}
                        />
                    )
                }

                <hr></hr>
                {
                    loading
                    ?
                    (
                        <Skel1 />
                    )
                    :
                    (
                        property?.img_paths?.length > 0
                        ?
                        (
                            property?.img_paths.map((imgPath, index) => (
                            <Image
                                key={index}
                                src={imgPath || notFound}
                                alt="Property Image"
                                className={`img-fluid ${Styles.smallImg}`}
                                title="Property Image"
                                width={500}
                                height={500}
                                onClick={() => setLargeImage(imgPath)}
                                onError={(e) => {
                                    e.target.src = notFound;
                                }}
                            />
                            ))
                        )
                        :
                        (
                            <Message message="Property has no images!" />
                        )
                    )

                }
            </div>

            <div className={`col-lg-6 col-md-12 col-sm-12 ${Styles.textSection}`}>
                <div className="mb-4">
                    <p className={Styles.pageNavigateText}><Link href="/">Home</Link> / property_details / {property?.title}</p>
                </div>

                {
                    !loading
                    ?
                    (
                        <>
                            <div className="mb-4">
                                <h6 className={Styles.smallTitle}>Property Title:</h6>
                                <h4 className={Styles.title}>{property?.title}</h4>
                            </div>
                            <div className="mb-4">
                                <h6 className={Styles.smallTitle}>Property Description:</h6>
                                <p className={Styles.text}>{property?.description}</p>
                            </div>
                            <div className="mb-4">
                                <h6 className={Styles.smallTitle}>Location:</h6>
                                <Link 
                                    href={`${property?.location_url}`} 
                                    className={Styles.propLocation} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    >
                                    <i className="fa-solid fa-location-dot"></i> {property?.location_name}
                                </Link>

                            </div>
                            <div className="mb-4">
                                <h6 className={Styles.smallTitle}>Property Price:</h6>
                                <span className={Styles.text}>Rs : {property?.price}</span>
                            </div>
                            <div className="mb-4">
                                <h6 className={Styles.smallTitle}>Property Owner:</h6>
                                <span className={Styles.text}>{property?.user?.username}</span>
                            </div>
                        </>
                    )
                    :
                    (
                        <Loader loaderWidth="50px" />
                    )
                }
            </div>


            <hr></hr>

            <div className="col-12 mb-3">
                <Title title="Related Properties" />
            </div>

            {
            !loading
            ?
            (
                properties && properties.length > 0
                ?
                (
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
            )
            :
            (
                <Loader loaderWidth="100px" />
            )
            }

        </div>
    </div>
    <Footer />
    </>
  )
}

export default page;