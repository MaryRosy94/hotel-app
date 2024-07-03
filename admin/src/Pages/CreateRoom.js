import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../helper/utils";
import { createRoom, reset } from "../features/room/roomSlice";

//create room
const CreateRoom = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { isSuccess } = useSelector((state) => state.room);

  const [files, setFiles] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    desc: "",
    roomNumbers: "",
  });

  const { name, price, desc, roomNumbers } = formData;

  useEffect(() => {
    if (!user) {
      // navigate to login
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      navigate("/rooms");
    }
  }, [isSuccess]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handle file change
  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
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

    // upload image to cloudinary
    let list = [];
    list = await Promise.all(
      Object.values(files).map(async (file) => {
        const url = await uploadImage(file);
        return url;
      })
    );

    const dataToSubmit = {
      name,
      price,
      desc,
      roomNumbers: roomArray,
      img: list,
    };

    //dispatch createRoom function
    dispatch(createRoom(dataToSubmit));
    //let dataTosubmit = { name, price, desc, roomNumbers, img };
  };

  return (
    <div className="container">
      <h1 className="heading center">Crea Camera</h1>

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

          <div className="input-group">
            <label htmlFor="name">Immagini</label>
            <input
              type="file"
              name="file"
              multiple
              onChange={handleFileChange}
            />
          </div>

          <button type="submit">Inserisci camera</button>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
