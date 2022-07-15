import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function PrivateRoute() {
  const [valid, setValid] = useState(false);
  const [cookies] = useCookies(["token"]);
  useEffect(() => {
    if (!cookies.token) setValid(false);
    else setValid(true);
  });

  return (
    valid ? <Outlet /> : <Navigate to="/login" />
  );
}
