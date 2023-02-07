import "./table.css";

// @mui
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const OrderTable = ({ products, loading, viewProduct }) => {
  //   const products = [
  //     {
  //       id: 1143155,
  //       product_id: "Acer Nitro 5",
  //       date: "1 March",
  //       price: 785,
  //       product_category: "Cash on Delivery",
  //     },
  //     {
  //       id: 2235235,
  //       product_id: "Playstation 5",
  //       date: "1 March",
  //       price: 900,
  //       product_category: "Online Payment",
  //     },
  //     {
  //       id: 2342353,
  //       product_id: "Redragon S101",
  //       date: "1 March",
  //       price: 35,
  //       product_category: "Cash on Delivery",
  //     },
  //     {
  //       id: 2357741,
  //       product_id: "Razer Blade 15",
  //       date: "1 March",
  //       price: 920,
  //       product_category: "Online",
  //     },
  //     {
  //       id: 2342355,
  //       product_id: "ASUS ROG Strix",
  //       date: "1 March",
  //       price: 2000,
  //       product_category: "Online",
  //     },
  //   ];

  if (loading) return <h4>Loading...</h4>;

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">Product ID</TableCell>
            <TableCell className="tableCell">Product Category</TableCell>
            <TableCell className="tableCell">Price</TableCell>
            <TableCell className="tableCell">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row) => (
            <TableRow
              key={row._id}
              sx={{ cursor: "pointer" }}
              onClick={(e) => viewProduct(e, row)}
            >
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell"> {row.product_id}</TableCell>
              <TableCell className="tableCell">
                {row.product_category}
              </TableCell>
              <TableCell className="tableCell">{row.price}</TableCell>
              <TableCell className="tableCell">
                {new Date(row.date).toDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
