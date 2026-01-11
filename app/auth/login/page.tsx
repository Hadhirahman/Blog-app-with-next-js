"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await axios.post(
        "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
     <div className="flex justify-center my-10">
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center">
                       Log in
                    </h2>
                    <div>

                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text">Email ID:</span>
                            </div>
                            <input
                                type="text"
                                value={email}
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text">Password</span>
                            </div>
                            <input
                                type="password"
                                value={password}
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                    </div>
                    <p className="text-red-500">{error}</p>
                    <div className="card-actions justify-center m-2">
                        <button
                            className="btn btn-primary"
                            onClick={handleLogin}
                        >
                            Sign Up
                        </button>
                    </div>

                 <Link href="/auth/register"> <p className="m-auto cursor-pointer py-2">Existing User? signup Here</p> </Link>  
                </div>
            </div>
        </div>
  );
}
