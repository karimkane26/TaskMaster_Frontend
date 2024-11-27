import Image from "next/image";
const SignUpScreen = () => {
  return (
    <div className="max-w-xl h-full  mx-auto  my-40 shadow-2xl rounded-2xl  ">
<div className="flex ">
      <div className="flex flex-col py-11 items-start">
      <Image
      src="/Images/auth/Tasks.jpeg"
      width={50}
      height={50}
      alt="Picture of the author"
    />
        <h1 className= "bg-green-950 w-36 text-white h-10 my-3">TaskMaster</h1>
      </div>
      <div className="flex flex-col py-11  ml-auto mr-12 ">
        <p>No Account ?</p>
        <p className="text-green-900 my-3">Signup</p>
      </div>
      
    </div>

    {/* input et label */}
    <div className="w-full">
      <label htmlFor="Email" className="font-bold">Email</label> <br />
      <input className="w-full my-3 bg-gray-200 h-20 rounded-2xl" type="text" placeholder="Devops@gmail.com" />
    </div>

   <div className="w-full mt-11">
  <label htmlFor="password" className="font-bold">
    Password
  </label>
  <div className="relative my-3">
    <input
      id="password"
      type="password"
      placeholder="Password"
      className="w-full bg-gray-200 h-20 rounded-2xl pl-16 pr-4" // Ajoutez un padding gauche pour que l'icône ne recouvre pas le texte
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="absolute inset-y-0 left-4 w-6 h-6 my-auto text-gray-500" // Positionnez l'icône
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  </div>
</div>

  <div className="w-full mt-11">
  <label htmlFor="password" className="font-bold">
     Confirm Password
  </label>
  <div className="relative my-3">
    <input
      id="password"
      type="password"
      placeholder="Password"
      className="w-full bg-gray-200 h-20 rounded-2xl pl-16 pr-4" // Ajoutez un padding gauche pour que l'icône ne recouvre pas le texte
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="absolute inset-y-0 left-4 w-6 h-6 my-auto text-gray-500" // Positionnez l'icône
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  </div>
</div>

    <div>
      <button className="w-full h-14 rounded-full bg-green-900 my-6 text-white ">
        Sign In
      </button>
    </div>
    </div>
  )
}

export default SignUpScreen
