"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Title from "@/app/components/Title/Title";
import Message from "@/app/components/Message/Message";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loader/Loader";

function page() {

    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState([]);

    const fetchMessagesHandler = async () => {

        setLoading(true);
        try
        {
          const response = await axios.get("/api/messages");
          setMessages(response?.data?.messages || []);
        }
        catch(error)
        {
          toast.error(error?.message);
        }
        finally
        {
          setLoading(false);
        }
    }

    const deletePropertyHandler = async (e, msgId) => {

        const delBtn = e.target;
        delBtn.disabled = true;
        delBtn.innerText = "Deleting...";
        if(msgId.trim() === "")
        {
          toast.error("Invalid message id");
          return;
        }
        if(!confirm("Are you sure you want to delete this message?")) return;

        try
        {
          const response = await axios.delete(`/api/messages/delete/${msgId}`);
          toast.success(response?.data?.message || "Message deleted successfully");
        }
        catch(error)
        {
          toast.error(error?.message || "Error deleting message");
        }
        finally
        {
          delBtn.disabled = false;
          delBtn.innerText = "Delete";
          fetchMessagesHandler();
        }
    }

    useEffect(() => {
      fetchMessagesHandler();
    }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <Title title="Messages" />
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Sr:n</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Message</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  !loading
                  ?
                  (
                      messages.length > 0
                    ?
                    (
                      messages.map((singleMsg, index) => (
                          <tr key={singleMsg._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{singleMsg.fullName.substring(0,20)}</td>
                            <td>{singleMsg.email.substring(0,30)}</td>
                            <td>{singleMsg.message}</td>
                            <td>
                              <button className="unBtn smBtn bg-danger" onClick={(e) => deletePropertyHandler(e, singleMsg._id)}>Del</button>
                            </td>
                          </tr>
                        ))
                    )
                    :
                    (
                      <tr>
                        <td colSpan={7} className="text-center">
                          <Message message="No message found!" />
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
