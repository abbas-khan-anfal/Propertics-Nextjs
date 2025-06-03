"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Title from "@/app/components/Title/Title";
import Logo from "@/app/components/ReusableLogo/Logo";
import logoImg from "@/app/assets/logo-b.png";

function page() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/login", { email, password }, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success(response?.data?.message || "Login successful");
      setEmail("");
      setPassword("");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container authPage">
      <div className="row justify-content-center">
        <div className="col-4">
          <div className="mb-3 text-center">
            <Logo srcImg={logoImg} />
          </div>
          <div className="mb-3 text-center">
            <hr />
          </div>
          <div className="mb-3 text-center">
            <Title title="Login" />
          </div>
          <form onSubmit={submitHandler}>
            <fieldset disabled={loading}>
              <div className="mb-3">
                <input
                  type="email"
                  className="inputField"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="inputField"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <button type="submit" className="unBtn lgBtn">
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </fieldset>
          </form>
          <div className="mb-3 text-center">
            <span className="authLinkText">
              Create new account? <Link href="/signup" className="a">Signup</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
