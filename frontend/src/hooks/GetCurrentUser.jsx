import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import { setLoading, setUserData } from "../redux/userSlice.js";

function GetCurrentUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(setLoading(true));
      try {
        const result = await axios.get(`${serverUrl}/api/auth/current-user`, {
          withCredentials: true,
        });
        dispatch(setUserData(result.data));
      } catch (error) {
        dispatch(setUserData(null));
        console.error("Get current user failed", error);
      }
    };
    fetchUser();
  }, [dispatch]);
}

export default GetCurrentUser;
