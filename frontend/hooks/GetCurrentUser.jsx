import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { serverUrl } from "../src/App.jsx";
import { setUserData } from "../src/redux/userSlice.js";

function GetCurrentUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/auth/current-user`, {
          withCredentials: true,
        });
        dispatch(setUserData(result.data));
      } catch (error) {
        console.error("Get current user failed", error);
      }
    };

    fetchUser();
  }, [dispatch]);
}

export default GetCurrentUser;
