"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axiosClient from "../utils/axiosClient";
import { toast } from "sonner";
import axios from "axios";

const SignUpScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas !");
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await axiosClient.post("users/signup", {
        email,
        password,
      });

      toast.success("Inscription réussie !");

      // Rediriger vers l'écran de connexion
      router.push("/signin");
    }
    catch (error) {
  if (axios.isAxiosError(error)) {
    toast.error(error.response?.data?.message || "Erreur lors de l'inscription.");
  } else {
    toast.error("Une erreur inconnue s'est produite.");
  }
}


  };

  return (
    <div className="max-w-xl h-full mx-auto my-40 shadow-2xl rounded-2xl p-6 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start">
          <Image
            src="/Images/auth/Tasks.jpeg"
            width={50}
            height={50}
            alt="TaskMaster Logo"
          />
          <h1 className="bg-green-950 w-36 text-white h-10 flex items-center justify-center my-3 rounded">
            TaskMaster
          </h1>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-gray-500">Already have an account?</p>
          <Link href="/signin" className="text-green-900 font-semibold mt-1">
            Sign In
          </Link>
        </div>
      </div>

      {/* Email Input */}
      <div className="mt-8">
        <label htmlFor="email" className="block font-bold text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="devops@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-2 p-4 bg-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-900"
        />
      </div>

      {/* Password Input */}
      <div className="mt-6">
        <label htmlFor="password" className="block font-bold text-gray-700">
          Password
        </label>
        <div className="relative mt-2">
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 bg-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-900"
          />
        </div>
      </div>

      {/* Confirm Password Input */}
      <div className="mt-6">
        <label htmlFor="confirmPassword" className="block font-bold text-gray-700">
          Confirm Password
        </label>
        <div className="relative mt-2">
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-4 bg-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-900"
          />
        </div>
      </div>

      {/* Sign Up Button */}
      <div className="mt-8">
        <button
          className="w-full h-14 rounded-full bg-green-900 text-white font-semibold hover:bg-green-800"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUpScreen;
