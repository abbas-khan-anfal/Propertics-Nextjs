"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Title from "@/app/components/Title/Title";
import Logo from "@/app/components/ReusableLogo/Logo";
import logoImg from "@/app/assets/logo-b.png";

function page() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if(password.length < 8)
    {
        toast.error("Password must be at least 8 characters long");
        return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/auth/signup", { username, email, password }, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success(res?.data?.message || "Signup successful");
      setUsername("");
      setEmail("");
      setPassword("");
      setTimeout(() => router.push("/login"), 1000);
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message);
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
          <div className="mb-3 text-center"><hr /></div>
          <div className="mb-3 text-center">
            <Title title="Signup" />
          </div>
          <form onSubmit={submitHandler}>
            <fieldset disabled={loading}>
              <div className="mb-3">
                <input type="text" className="inputField" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>
              <div className="mb-3">
                <input type="email" className="inputField" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="mb-3">
                <input type="password" className="inputField" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="mb-3">
                <button type="submit" className="unBtn lgBtn">{loading ? "Signing up..." : "Signup"}</button>
              </div>
            </fieldset>
          </form>
          <div className="mb-3 text-center">
            <span className="authLinkText">Already have an account? <Link href="/login" className="a">Login</Link></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
