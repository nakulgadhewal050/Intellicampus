import React,{useEffect} from 'react'
import axios from "axios";
import { useDispatch } from "react-redux";
import { serverUrl } from "../App";
import { setTicketError, setTicketLoading, setUserTickets } from "../redux/ticketSlice";

function GetCurrentTicket() {
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchUserTickets = async () => {
      dispatch(setTicketLoading(true));
      try {
        const response = await axios.get(`${serverUrl}/api/ticket/user-tickets`, {
          withCredentials: true,
        });
        dispatch(setUserTickets(response.data.tickets));
      } catch (requestError) {
        dispatch(
          setTicketError(
            requestError.response?.data?.message,
          ),
        );
      }
    };

    fetchUserTickets();
  }, [dispatch]);
}

export default GetCurrentTicket