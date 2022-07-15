import React, { useState } from "react";
import PropTypes from "prop-types";
// import { useCookies } from "react-cookie";
import useAxios from "../utils/axios";

export default function PhoneBookCard({
  name, phone, _id, setContacts,
}) {
  const [inpEnabled, setInpEnabled] = useState(false);
  const [Name, setName] = useState(name);
  const [Phone, setPhone] = useState(phone);
  // const [cookies] = useCookies(["token"]);

  const axios = useAxios();

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`contact/${_id}`);
      if (!res.data) throw new Error("unexpected error");
      if (res.data.status === "success") {
        const resp = await axios.get("contact");
        if (resp.data.status === "success") {
          setContacts(resp.data.data.contacts);
        }
      } else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      // console.log(err);
    }
  };

  const handleCall = async () => {
    try {
      const res = await axios.post("call", { contact: _id });
      if (!res.data) throw new Error("unexpected error");
      if (res.data.status === "success") {
        //
      } else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      // console.log(err);
    }
  };

  const handleSave = async () => {
    if (Name.length < 2 || Phone.length < 6) return;
    setInpEnabled(false);
    try {
      const res = await axios.patch(`contact/${_id}`, { name: Name, number: Phone });
      if (!res.data) throw new Error("unexpected error");
      if (res.data.status === "success") {
        const resp = await axios.get("contact");
        if (resp.data.status === "success") {
          setContacts(resp.data.data.contacts);
        }
      } else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <div className="  text-[#000000] bg-
         text-center text-base flex flex-row flex-wrap bg-indigo-500
        p-2 items-center justify-center m-2 rounded-xl sm:text-lg xs:text-left"
    >
      <div className="flex flex-col">
        <div className="flex flex-col justify-between items-start font-semibold">
          <input
            value={Name}
            disabled={!inpEnabled}
            onChange={(e) => setName(e.target.value)}
            className={`${inpEnabled ? "bg-indigo-400" : "bg-indigo-500"} rounded outline-none mb-[2px]`}
          />
          <input
            value={Phone}
            disabled={!inpEnabled}
            onChange={(e) => setPhone(e.target.value)}
            className={`${inpEnabled ? "bg-indigo-400" : "bg-indigo-500"} rounded outline-none`}
          />
        </div>
        <div className="flex flex-row justify-between  mt-4 text-[#FFFFFF]">
          <button className="bg-[#212529] w-16 h-10 rounded-lg" type="button" onClick={() => setInpEnabled(true)}>edit</button>
          <button className="bg-[#212529] w-16 h-10 rounded-lg" type="button" onClick={handleDelete}>delete</button>
          {inpEnabled && <button className="bg-[#212529] w-16 h-10 rounded-lg" type="button" onClick={handleSave}>save</button>}
          <button className="bg-[#212529] w-16 h-10 rounded-lg" type="button" onClick={handleCall}>call</button>
        </div>
      </div>
    </div>
  );
}

PhoneBookCard.propTypes = {
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  setContacts: PropTypes.func.isRequired,
};
