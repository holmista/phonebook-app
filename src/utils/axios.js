import axios from "axios";
import { useCookies } from "react-cookie";
// import { useEffect } from "react";

const useAxios = () => {
  const [cookies] = useCookies(["token"]);
  const axiosInstance = axios.create({
    baseURL: "https://slick-phonebook-api.herokuapp.com/api/",
    timeout: 15000,
    headers: {
      Authorization: cookies.token,
    },
  });
  return axiosInstance;
};

export default useAxios;
