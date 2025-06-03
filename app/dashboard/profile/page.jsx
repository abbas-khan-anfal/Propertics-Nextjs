"use client";
import React, { useEffect, useState } from "react";
import Title from "@/app/components/Title/Title";
import Styles from "./page.module.css";
import Image from "next/image";
import userAvatar from "@/app/assets/user.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loader from "@/app/components/Loader/Loader";
import Message from "@/app/components/Message/Message";
import dayjs from "dayjs";

function page() {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchProperty = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/auth/getuser");
      setUser(response?.data?.user || {});
    } catch (error) {
      console.log(error?.response?.data?.message || error?.message);
    } finally {
      setLoading(false); // ensure loading stops
    }
  };

  useEffect(() => {
    fetchProperty();
  }, []);

  return (
    <div className={`container ${Styles.profilePage}`}>
      <div className="row justify-content-center">
        <div className="col-lg-10 col-md-11 col-sm-12">
          <div className="mb-3">
            <button onClick={() => router.back()} className="circleBtn">
              <i className="fa-solid fa-arrow-left"></i>
            </button>
          </div>

          <div className="text-center">
            <Title title="Your Profile" />
          </div>

          {!loading ? (
            Object.keys(user).length > 0 ? (
              <>
                <div className="mb-3 text-center">
                  <span>
                    <h5 className="d-inline-block h5">Full Name:</h5> {user?.username}
                  </span>
                  <br />
                  <span>
                    <h5 className="d-inline-block h5">Email:</h5> {user?.email}
                  </span>
                  <br />
                  <span>
                    <h5 className="d-inline-block h5">Join At:</h5>{" "}
                    {dayjs(user?.createdAt).format("DD MMM YYYY")}
                  </span>
                </div>

                <div className="mb-3 text-center">
                    <Image
                      src={userAvatar}
                      className={Styles.profileImg}
                      width={500}
                      height={500}
                    />
                </div>

              </>
            ) : (
              <div className="mb-3 text-center">
                <Message message="No data found, Login to continue" />
                <Link href="/login" className="text-primary">
                  Login
                </Link>
              </div>
            )
          ) : (
            <div className="mb-3 d-flex justify-content-center">
              <Loader loaderWidth="40px" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default page;
