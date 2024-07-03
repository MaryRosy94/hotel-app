import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateRoom, reset } from "../../features/room/roomSlice";
import { useSelector, useDispatch } from "react-redux";

const EditRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess } = useSelector((state) => state.room);
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    desc: "",
    roomNumbers: "",
  });

  const { name, price, desc, roomNumbers } = formData;

  useEffect(() => {
    const getRoom = async () => {
      try {
        const res = await fetch(`/api/rooms/${id}`);
        const data = await res.json();

        const { roomNumbers, ...rest } = data;
        const roomMap = roomNumbers.map((item) => item.number);
        const roomString = roomMap.join(",");
        setFormData({
          ...rest,
          roomNumbers: roomString,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getRoom();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      //navigate to rooms
      dispatch(reset());
      navigate("/rooms");
    }
  }, [isSuccess]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !roomNumbers) {
      return;
    }

    const roomArray = roomNumbers.split(",").map((item) => {
      return {
        number: parseInt(item),
        unavailableDates: [],
      };
    });

    const dataToSubmit = {
      name,
      price,
      desc,
      roomNumbers: roomArray,
      roomId: id,
    };
    dispatch(updateRoom(dataToSubmit));
  };
  return (
    <div className="container">
      <h1 className="heading center">Modifica Camera</h1>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Nome stanza</label>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Inserisci nome stanza"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="price">Prezzo</label>
            <input
              type="text"
              name="price"
              value={price}
              placeholder="Inserisci prezzo"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="desc">Descrizione</label>
            <textarea
              name="desc"
              onChange={handleChange}
              value={desc}
              rows={5}
              cols={71}
            ></textarea>
          </div>

          <div className="input-group">
            <label htmlFor="roomNumbers">Numeri Stanza</label>
            <textarea
              name="roomNumbers"
              onChange={handleChange}
              value={roomNumbers}
              rows={5}
              cols={71}
              placeholder="inserisci numeri stanza separato da una virgola es: 202, 203, 204, 400"
            ></textarea>
          </div>

          <button type="submit">Modifica camera</button>
        </form>
      </div>
    </div>
  );
};

export default EditRoom;
