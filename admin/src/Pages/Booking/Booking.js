import { useEffect, useState } from "react";
import "./booking.styles.scss";
import { useParams, useNavigate } from "react-router-dom";
import { deleteBooking, reset } from "../../features/booking/bookingSlice";
import { useDispatch, useSelector } from "react-redux";

const Booking = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess } = useSelector((state) => state.booking);

  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      navigate("/dashboard");
    }
  }, [isSuccess]);

  useEffect(() => {
    dispatch(reset());
    const getBooking = async () => {
      try {
        const res = await fetch(`/api/bookings/${id}`);
        const data = await res.json();
        setBooking(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getBooking();
  }, []);

  const handleDelete = () => {
    dispatch(deleteBooking(id));
  };
  return (
    <div id="booking">
      <h1 className="heading center">Prenotazione</h1>

      {booking && (
        <div className="content-wrapper">
          <div className="text-wrapper">
            <h1 className="heading"> {booking.name}</h1>

            <p className="roomId"> {booking.roomId.name}</p>
            <p className="email"> {booking.email}</p>
            <p className="checkIn"> check-in: {booking.checkInDate}</p>
            <p className="checkOut"> check-out: {booking.checkOutDate}</p>
          </div>

          <div className="cta-wrapper">
            <button>Conferma</button>
            <button className="danger" onClick={handleDelete}>
              Cancella
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
