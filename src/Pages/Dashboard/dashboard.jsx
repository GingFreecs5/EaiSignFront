import React from "react";
import { useNavigate } from "react-router-dom";
import { getEnveloppes } from "../../Redux/filesSlice";
import Body from "../../Components/Dashboard/Documents/body";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import TopBar from "../../Components/Dashboard/topbar";
import { deleteUser } from "../../Redux/auth";
export default function Dashboard() {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const accessToken = currentUser?.accessToken;

  const docs = useSelector((state) => state.files.enveloppes);
  useEffect(() => {
    if (accessToken !== "") {
      dispatch(getEnveloppes(accessToken))
        .unwrap()
        .then((ok) => {})
        .catch((er) => {});
    }
  }, []);

  return (
    <>
      <TopBar />
      <Body docs={docs} />
    </>
  );
}
