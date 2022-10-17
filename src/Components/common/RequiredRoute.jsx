import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../Redux/auth";
export default function RequiredRoute() {
  const dispatch = useDispatch();
  const parseJwt = (token) => {
    try {
      const parsejwt = JSON.parse(atob(token.split(".")[1]));
      return parsejwt;
    } catch (e) {
      return null;
    }
  };
  const { user: currentUser } = useSelector((state) => state.auth);
  const token = currentUser?.accessToken;
  const decodedJwt = parseJwt(token);
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  } else if (decodedJwt?.exp * 1000 < Date.now()) {
    dispatch(deleteUser());
  } else {
    return <Outlet />;
  }
}
