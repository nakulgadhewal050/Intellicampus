import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import {
  setTicketError,
  setTicketLoading,
  setUserTickets,
} from "../redux/ticketSlice.js";

function GetAllTickets() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTickets = async () => {
      dispatch(setTicketLoading(true));
      try {
        const response = await axios.get(`${serverUrl}/api/admin/all-tickets`, {
          withCredentials: true,
        });
        dispatch(setUserTickets(response.data.tickets ?? []));
      } catch (error) {
        const message =
          error.response?.data?.message || "Unable to fetch tickets";
        dispatch(setTicketError(message));
        console.error("Get all tickets failed", error);
      }
    };

    fetchTickets();
  }, [dispatch]);
}

export default GetAllTickets;
