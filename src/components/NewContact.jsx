import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function NewContact({ setShow, setContacts }) {
  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [cookies] = useCookies(["token"]);

  const handleSave = async () => {
    try {
      const res = await axios.post(
        "https://slick-phonebook-api.herokuapp.com/api/contact",
        { name: Name, number: Phone },
        { headers: { Authorization: cookies.token } },
      );
      if (!res.data) throw new Error("unexpected error");
      if (res.data.status === "success") {
        setShow(false);
        setContacts((prev) => [...prev, res.data.data.contact]);
      } else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      setError(err.message || "unexpexted error");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="flex flex-col bg-indigo-500 p-2 space-y-2 rounded-xl z-10">
      <div>
        <div className="flex flex-col justify-between items-start font-semibold">
          <input
            value={Name}
            onChange={(e) => setName(e.target.value)}
            className="bg-indigo-400 rounded outline-none mb-[2px] placeholder-black"
            placeholder="name"
          />
          <input
            value={Phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-indigo-400 rounded outline-none placeholder-black"
            placeholder="number"
          />
        </div>
      </div>
      <div className="flex flex-row justify-between  mt-4 text-[#FFFFFF]">
        <button className="bg-[#212529] w-16 h-10 rounded-lg" type="button" onClick={handleSave}>save</button>
        <button className="bg-[#212529] w-16 h-10 rounded-lg" type="button" onClick={() => setShow(false)}>cancel</button>
      </div>
    </div>
  );
}

NewContact.propTypes = {
  setShow: PropTypes.func.isRequired,
  setContacts: PropTypes.func.isRequired,
};
