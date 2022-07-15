import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import LoginInput from "../components/LoginInput";
import Error from "../components/Error";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://slick-phonebook-api.herokuapp.com/api/users/login", { username, password });
      if (!res.data) throw new Error("unexpected error");
      if (res.data.status === "success") {
        setCookie("token", res.data.token, { path: "/" });
        navigate("/contacts");
      } else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      setError(err.message || "unexpexted error");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="flex justify-center pt-80 font-normal text-[#212529] w-screen h-screen text-lg">
      <div className="w-[300px] h-[340px] flex  flex-col items-center">
        <div className="flex items-center flex-col gap-4">
          <LoginInput placeholder="username" value={username} set={setUsername} />
          <LoginInput placeholder="password" value={password} set={setPassword} />
        </div>
        {error && <Error message={error} /> }
        <div>
          <div className="mt-8">
            <button type="button" className="rounded-lg text-[#ffffff] font-normal bg-[#212529] w-[191px] h-[53px] " onClick={handleLogin}>
              log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
