import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import PhoneBookCard from "../components/PhoneBookCard";
import Searchbar from "../components/Searchbar";
import NewContact from "../components/NewContact";
import useAxios from "../utils/axios";

export default function PhoneBookPage() {
  const [filter, setFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [cookies] = useCookies(["token"]);

  const navigate = useNavigate();
  const axios = useAxios();

  useEffect(() => {
    if (!cookies.token) navigate("/login");
    let controller;
    const fetchData = async () => {
      try {
        controller = new AbortController();
        const res = await axios.get("contact/", { signal: controller.signal });
        if (!res.data) throw new Error("unexpected error");
        if (res.data.status === "success") {
          setData(res.data.data.contacts);
        } else {
          throw new Error("unexpected error");
        }
      } catch (err) {
        setError(err.message || "unexpexted error");
        setTimeout(() => setError(""), 3000);
      }
    };
    fetchData();
    return () => { controller.abort(); };
  }, []);
  return (
    <div>
      <div className="flex justify-center pt-36 pb-10 space-x-8">
        <Searchbar setFilter={setFilter} />
        <button className="bg-[#212529] text-white p-2 rounded-lg" type="button" onClick={() => setShowModal(true)}>add contact</button>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 xl:grid-cols-4 sm:grid-cols-2 w-3/4">
          {data.length > 0 && data.filter((el) => el.name.includes(filter) || (el.number && el.number.toString().includes(filter))).map((el) => (
            <PhoneBookCard
              name={el.name}
              phone={(el.number && el.number.toString()) || ""}
              _id={el._id}
              key={el._id}
              setContacts={setData}
            />
          ))}
        </div>
      </div>
      {showModal && (
      <div className="flex justify-center items-center w-screen h-screen  absolute top-0">
        <div className="w-full h-full absolute  backdrop-blur-sm" />
        <NewContact setShow={setShowModal} setContacts={setData} />
      </div>
      )}

    </div>

  );
}
