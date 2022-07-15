import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import RegistrationInput from "../components/RegistrationInput";
import Error from "../components/Error";

export default function RegistrationPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axios.post("https://slick-phonebook-api.herokuapp.com/api/users/signup", { username, password, confirmPassword });
      // const res = await axios.post("http://localhost:5000/api/users/signup", { username, password, confirmPassword });
      if (!res.data) throw new Error("unexpexted error");
      if (res.data.status === "success") {
        navigate("/login");
      } else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      setError(err.message || "unexpexted error");
      setTimeout(() => setError(""));
    }
  };

  return (
    <div className="flex justify-center pt-80 font-normal text-[#212529] w-screen h-screen text-lg">
      <div className="w-[300px] h-[340px] flex  flex-col items-center">
        <div className="flex items-center flex-col gap-4">
          <RegistrationInput placeholder="username" value={username} set={setUsername} />
          <RegistrationInput placeholder="password" value={password} set={setPassword} />
          <RegistrationInput placeholder="repeat password" value={confirmPassword} set={setConfirmPassword} />
        </div>
        {error && <Error message={error} /> }
        <div className="flex flex-col gap-4 mt-8">
          <button type="button" className="rounded-lg text-[#ffffff] font-normal bg-[#212529] w-[191px] h-[53px] " onClick={handleSignup}>
            sign up
          </button>
          <Link to="/login">
            <button type="button" className="rounded-lg text-[#ffffff] font-normal bg-[#212529] w-[191px] h-[53px] ">
              log in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
