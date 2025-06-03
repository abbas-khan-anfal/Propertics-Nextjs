"use client";
import React, { useState } from "react";
import Title from "@/app/components/Title/Title";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function page() {

    const router = useRouter()
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [locationName, setLocationName] = useState("");
    const [locationUrl, setLocationUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        // check files length
        if(e?.target?.imgs?.files?.length > 5)
        {
            return toast.error("Please select at least 5 image");
        }

        const files = e?.target?.imgs?.files;

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("location_name", locationName);
        formData.append("location_url", locationUrl);
        for(let i = 0; i < files.length; i++)
        {
          formData.append("imgs", files[i]);
        }

        setLoading(true);
        try
        {
          const response = await axios.post("/api/properties/private_routes", formData, {
            headers: {
              "Content-Type" : "multipart/form-data"
            }
          });
          toast.success(response?.data?.message || "Property added successfully");
          setTitle("");
          setDescription("");
          setPrice("");
          setLocationName("");
          setLocationUrl("");
          e.target.reset();
        }
        catch(error)
        {
          toast.error(error?.response?.data?.message || error?.message);
        }
        finally
        {
          setLoading(false);
        }
    }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 col-md-12 col-sm-12">
          <div className="mb-3 d-flex">
            <button className="circleBtn mx-3" onClick={() => router.back()}><i className="fa-solid fa-arrow-left"></i></button>
            <Title title="Add Property" />
          </div>
          <form onSubmit={submitHandler}>
            <fieldset disabled={loading}>
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
              <label htmlFor="location" className="label">
                Location url <mark>https://example_city_url.com</mark>
              </label>
              <input type="text" className="inputField" id="location" onChange={e => setLocationUrl(e.target.value)} value={locationUrl} required />
              <mark>Note : copy location url from google map</mark>
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="label">
                Upload images<mark> Max 5 Images</mark>
              </label>
              <input type="file" multiple className="inputField" id="image" name="imgs" />
              <mark>Warning : Image must be less than 5mb.</mark>
            </div>
            <button type="submit" className="unBtn lgBtn">
              {
                loading ? "Property Saving..." : "Add Property"
              }
            </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}

export default page;
