"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Utiliser la version correcte de useRouter
import axios from "axios";
import { toast } from "sonner";

const SignInScreen = () => {
  const router = useRouter(); // Initialisation de useRouter
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Fonction pour gérer la connexion
  const handleSignIn = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/v1/users/login", {
        email,
        password,
      });

      // Stocker le token dans localStorage ou gérer comme nécessaire
      localStorage.setItem("token", response.data.token);

      // Afficher un message de succès
      toast.success("Connexion réussie !");
      
      // Rediriger vers le tableau de bord
      router.push("/dashboard");
    } catch (error) {
      // Gestion des erreurs
      toast.error("Email ou mot de passe incorrect !");
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
          <p className="text-gray-500">No Account?</p>
          <Link href="/signup" className="text-green-900 font-semibold mt-1">
            Sign Up
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="absolute inset-y-0 left-4 w-6 h-6 my-auto text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          </svg>
        </div>
      </div>

      {/* Sign In Button */}
      <div className="mt-8">
        <button
          className="w-full h-14 rounded-full bg-green-900 text-white font-semibold hover:bg-green-800"
          onClick={handleSignIn}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignInScreen;
