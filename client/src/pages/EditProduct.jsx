import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProducts, productSelectors, updateProduct } from "../redux/productRedux";
import { toast } from "react-toastify";

export default function EditProduct() {
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) => productSelectors.selectById(state, id));

  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setCategories(product.categories);
      setPrice(product.price);
    }
  }, [product]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        await dispatch(updateProduct({ id, title, categories, price }));
        toast.success("Berhasil update produk");
        navigate("/");
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  return (
    <div className="mt-10">
      <form className="shadow-md p-4" onSubmit={handleUpdate}>
        <div className="block">
          <label className="block">Nama produk : </label>
          <input type="text" placeholder="Nama produk" value={title} onChange={(e) => setTitle(e.target.value)} />
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
        <button className="bg-slate-300 rounded mt-2 p-1 w-full">Simpan perubahan</button>
      </form>
    </div>
  );
}
