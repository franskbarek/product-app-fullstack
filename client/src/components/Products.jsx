import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { rupiah } from "../utils/moneyFormat";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts, productSelectors } from "../redux/productRedux";
import { Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { toast } from "react-toastify";

function createData(title, categories, price) {
  return { title, categories, price };
}

export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector(productSelectors.selectAll);

  React.useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="mt-10">
      <div className="text-right px-5">
        <div title="Tambah produk">
          <Link to={"/add"}>
            <AddBoxIcon />
            PRODUK
          </Link>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="left">Nama Produk</TableCell>
              <TableCell align="left">Kategori</TableCell>
              <TableCell align="left">Harga</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row, index) => (
              <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {index + 1}.
                </TableCell>
                <TableCell align="left">{row.title}</TableCell>
                <TableCell align="left">{row.categories}</TableCell>
                <TableCell align="left">{rupiah(row.price)}</TableCell>

                <Link to={`edit/${row._id}`}>
                  <td className="px-2" title="Edit">
                    <Edit />
                  </td>
                </Link>
                <button className="px-2" title="Delete" onClick={() => dispatch(deleteProduct(row._id)) && toast.error("Produk telah dihapus...")}>
                  <Delete />
                </button>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
