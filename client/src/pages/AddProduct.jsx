import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveProduct } from "../redux/productRedux";
import { toast } from "react-toastify";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState("");
  const [price, setPrice] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.currentUser);

  const createProduct = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        await dispatch(saveProduct({ title, categories, price }));
        toast.success("Berhasil tambah produk baru");
        navigate("/");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="mt-10">
      <form className="shadow-md p-4" onSubmit={createProduct}>
        <div className="block">
          <label className="block">Nama produk : </label>
          <input type="text" placeholder="Produk" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="block mt-5">
          <label htmlFor="category">Kategori : </label>
          <select name="category" id="category" value={categories} onChange={(e) => setCategories(e.target.value)}>
            <option className="italic" value="">
              --Pilih--
            </option>
            <option value="Gadget">Gadget</option>
            <option value="Peralatan kantor">Peralatan kantor</option>
            <option value="Aksesoris">Aksesoris</option>
            <option value="Peralatan rumah tangga">Peralatan rumah tangga</option>
          </select>
        </div>
        <div className="block mt-5">
          <label className="block">Harga : </label>
          <input type="text" placeholder="Harga" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <button className="bg-slate-300 rounded mt-2 p-1 w-full">Tambah</button>
      </form>
    </div>
  );
}
