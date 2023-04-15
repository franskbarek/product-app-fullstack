import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProducts, productSelectors, updateProduct } from "../redux/productRedux";
import { userRequest } from "../utils/requestMethods";

export default function UserProfile() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [editUser, setEditUser] = useState([]);

  const product = useSelector((state) => productSelectors.selectById(state, id));

  const user = useSelector((state) => state.user.currentUser);

  const updateUser = async (data) => {
    const response = await userRequest.patch(`${import.meta.env.VITE_APP_BASE_URL}/users/${user._id}`, data);
    setEditUser(response.data);
  };

  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setPassword(user.password || "");
      setGender(user.gender || "");
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = { username, password, gender };
    await updateUser(updatedData);
    navigate("/");
  };

  return (
    <div className="mt-10">
      <form className="shadow-md p-4" onSubmit={handleUpdate}>
        <div className="block">
          <label className="block">Username : </label>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className="block mt-5">
          <label className="block">Password : </label>
          <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="block mt-5">
          <label htmlFor="gender">Gender : </label>
          <select name="gender" id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option className="italic" value="">
              --Pilih--
            </option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>
        <Link to="/">
          <span>
            <button className="bg-slate-300 rounded mt-2 m-2 w-1/4 h-full">Batal</button>
          </span>
        </Link>
        <span>
          <button className="bg-slate-300 rounded mt-2 m-2 w-1/4 h-full">Simpan</button>
        </span>
      </form>
    </div>
  );
}
