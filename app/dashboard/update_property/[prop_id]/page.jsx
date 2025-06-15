"use client";
import React, { useEffect, useState } from "react";
import Title from "@/app/components/Title/Title";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/app/components/Loader/Loader";

function page({params}) {

    const router = useRouter();
    const { prop_id } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [locationName, setLocationName] = useState("");
    const [locationUrl, setLocationUrl] = useState("");
    const [contact, setContact] = useState("");
    const [loading, setLoading] = useState(true);
    const [formLoading, setFormLoading] = useState(false);
    const [singleProperty, setSingleProperty] = useState({});

    const submitHandler = async (e) => {
        e.preventDefault();

        const files = e?.target?.imgs?.files;

        const formData = new FormData();
        formData.append("prop_id", prop_id);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("location_name", locationName);
        formData.append("location_url", locationUrl);
        formData.append("contact", contact);
        if(files.length > 0)
        {
          for(let i = 0; i < files.length; i++)
          {
            formData.append('imgs', files[i]);
          }
        }

        setFormLoading(true);
        try
        {
          const response = await axios.put("/api/properties/private_routes", formData, {
            headers: {
              "Content-Type" : "multipart/form-data"
            }
          });
          toast.success(response?.data?.message || "Property updated successfully");
        }
        catch(error)
        {
          toast.error(error?.response?.data?.message || error?.message);
        }
        finally
        {
          setFormLoading(false);
        }
    }

    const fetchSinglePropertyHandler = async (propId) => {

        setLoading(true);
        try
        {
          const response = await axios.get(`/api/properties/private_routes/fetch_single/${propId}`);
          setSingleProperty(response?.data?.property || {});
          setTitle(response?.data?.property?.title || "");
          setDescription(response?.data?.property?.description || "");
          setPrice(response?.data?.property?.price || "");
          setLocationName(response?.data?.property?.location_name || "");
          setLocationUrl(response?.data?.property?.location_url || "");
          setContact(response?.data?.property?.contact || "");
        }
        catch(error)
        {
          toast.error(error?.message);
          console.log(error?.message);
        }
        finally
        {
          setLoading(false);
        }
    }

    useEffect(() => {
        fetchSinglePropertyHandler(prop_id);
    },[prop_id]);
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 col-md-12 col-sm-12">
          <div className="mb-3 d-flex">
            <button className="circleBtn mx-3" onClick={() => router.back()}><i className="fa-solid fa-arrow-left"></i></button>
            <Title title="Edit Property" />
          </div>
          {
            !loading
            ?
            (
              <form onSubmit={submitHandler}>
                <fieldset disabled={formLoading}>
                <div className="mb-3">
                  <label htmlFor="title" className="label">
                    Title
                  </label>
                  <input type="text" className="inputField" id="title" onChange={e => setTitle(e.target.value)} value={title} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="label">
                    Description
                  </label>
                  <textarea
                    className="inputField"
                    id="description"
                    rows="3"
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="label">
                    Price
                  </label>
                  <input type="number" className="inputField" id="price" onChange={e => setPrice(e.target.value)} value={price} required />
                </div>
                  <div className="mb-3">
                    <label htmlFor="location" className="label">
                      Location name <mark>The example city</mark>
                    </label>
                    <input type="text" className="inputField" id="location" onChange={e => setLocationName(e.target.value)} value={locationName} required />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="number" className="label">
                      Contact Number
                    </label>
                    <input type="text" className="inputField" id="number" onChange={e => setContact(e.target.value)} value={contact} required />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="locationUrl" className="label">
                      Location url <mark>https://example_city_url.com</mark>
                    </label>
                    <input type="text" className="inputField" id="locationUrl" onChange={e => setLocationUrl(e.target.value)} value={locationUrl} required />
                  </div>
                <div className="mb-3">
                  <label htmlFor="image" className="label">
                    Upload new images<mark> Max 5 Images</mark>{" "}
                  </label>
                  <input type="file" multiple className="inputField" id="image" name="imgs" />
                  <mark>Warning : Image must be less than 5mb.</mark>
                </div>
                <button type="submit" className="unBtn lgBtn">
                  {formLoading ? "Updating..." : "Update Property"}
                </button>
                </fieldset>
              </form>
            )
            :
            (
              <div className="col-12 d-flex justify-content-start">
                <Loader loaderWidth="50px" />
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default page;
