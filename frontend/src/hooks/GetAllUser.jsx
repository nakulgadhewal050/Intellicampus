import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import {
  setAllUserError,
  setAllUserLoading,
  setAllUsers,
} from "../redux/allUserSlice.js";

function GetAllUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(setAllUserLoading(true));
      try {
        const result = await axios.get(`${serverUrl}/api/admin/all-user`, {
          withCredentials: true,
        });
        dispatch(setAllUsers(result.data));
      } catch (error) {
        const message =
          error.response?.data?.message || "Unable to fetch users";
        dispatch(setAllUserError(message));
        console.error("Get all users failed", error);
      }
    };
    fetchUsers();
  }, [dispatch]);
}

export default GetAllUser;
