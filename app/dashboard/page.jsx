"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Title from "../components/Title/Title";
import Message from "../components/Message/Message";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loader from "../components/Loader/Loader";

function page() {

    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [properties, setProperties] = useState([]);

    const fetchPropertiesHandler = async () => {

        setLoading(true);
        try
        {
          const response = await axios.get("/api/properties/private_routes");
          setProperties(response?.data?.properties || []);
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

    const deletePropertyHandler = async (e, propertyId) => {

        const delBtn = e.target;
        delBtn.disabled = true;
        delBtn.innerText = "Deleting...";
        if(propertyId.trim() === "")
        {
          toast.error("Invalid property id");
          return;
        }
        // if(!confirm("Are you sure you want to delete this property?")) return;

        try
        {
          const response = await axios.delete(`/api/properties/private_routes/delete_property/${propertyId}`);
          toast.success(response?.data?.message || "Property deleted successfully");
        }
        catch(error)
        {
          toast.error(error?.response?.data?.message || "Error deleting property");
        }
        finally
        {
          delBtn.disabled = false;
          delBtn.innerText = "Delete";
          fetchPropertiesHandler();
        }
    }

    useEffect(() => {
      fetchPropertiesHandler();
    }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <Title title="Your Properties" />
          <div className="mb-3 d-flex justify-content-end">
            <Link href="/dashboard/add_property" className="unBtn mdBtn">
              Add New Property
            </Link>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Sr:n</th>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Price</th>
                  <th scope="col">Contact</th>
                  <th scope="col">Location Url</th>
                  <th scope="col">Delete</th>
                  <th scope="col">Edit</th>
                </tr>
              </thead>
              <tbody>
                {
                  !loading
                  ?
                  (
                      properties.length > 0
                    ?
                    (
                      properties.map((singleProp, index) => (
                          <tr key={singleProp._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{singleProp.title.substring(0,20)+"..."}</td>
                            <td>{singleProp.description.substring(0,25)+"..."}</td>
                            <td>{singleProp.price}</td>
                            <td>{singleProp.contact}</td>
                            <td><Link href={singleProp?.location_url} target="_blank" className="text-primary">{singleProp?.location_name.substring(0,10)+"..."}</Link></td>
                            <td>
                              <button className="unBtn smBtn bg-danger" onClick={(e) => deletePropertyHandler(e, singleProp._id)}>Del</button>
                            </td>
                            <td>
                              <button onClick={() => router.push(`/dashboard/update_property/${singleProp._id}`)} className="unBtn smBtn bg-success">View or Edit</button>
                            </td>
                          </tr>
                        ))
                    )
                    :
                    (
                      <tr>
                        <td colSpan={7} className="text-center">
                          <Message message="You have no properties yet. try add your properties!" />
                        </td>
                      </tr>
                    )
                  )
                  :
                  (
                    <tr>
                      <td colSpan={5}>
                        <div className="col-12 d-flex justify-content-center">
                          <Loader loaderWidth="50px" />
                        </div>
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
