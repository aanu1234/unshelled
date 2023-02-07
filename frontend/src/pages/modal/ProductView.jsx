import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../api";

// @mui
import { Stack } from "@mui/material";

// component
import ConfirmDialog from "../../components/confirm-dialog";
import { HFButton } from "../../components/hook-form";
import Snackbar from "../../components/snackbar";

// import { AuthContext } from "../../context/AuthContext";

// ---------------------------------------------------

const ProductView = ({ open, handleClose, product }) => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const defaultValues = {
    product_id: product?.product_id || "",
    product_category: product?.product_category || "",
    price: product?.price || "",
    date: product?.date || "",
  };

  const { product_id, product_category, price, date } = defaultValues;

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.deleteOrderItem(product?._id);
      if (data?.error) throw new Error(data.error);
      setSuccess(true);
      setMessage("Deleted Successfully");
    } catch (error) {
      setError(true);
      setMessage(error.message);
    }
    setLoading(false);
  };

  const handleEdit = () => {
    sessionStorage.setItem("product", JSON.stringify(product));
    navigate("/single");
  };

  return (
    <ConfirmDialog
      title="Product View"
      open={open}
      onClose={handleClose}
      onCloseText="Close"
    >
      <Stack spacing={2}>
        {error && <Snackbar open={error} severity="error" message={message} />}
        {success && (
          <Snackbar open={success} severity="success" message={message} />
        )}
        <div className="item">
          <div className="details">
            {/* <h5 className="itemTitle"></h5> */}
            <div className="detailItem">
              <span className="itemKey">Product ID</span>
              <span className="itemValue">{product_id}</span>
            </div>
            <div className="detailItem">
              <span className="itemKey">Product Category</span>
              <span className="itemValue">{product_category}</span>
            </div>
            <div className="detailItem">
              <span className="itemKey">Price</span>
              <span className="itemValue">{price}</span>
            </div>
            <div className="detailItem">
              <span className="itemKey">Date</span>
              <span className="itemValue">{date}</span>
            </div>
          </div>
        </div>
      </Stack>
      <Stack direction="row" justifyContent="flex-end" mt={2}>
        <HFButton type="button" onClick={handleEdit} text="Edit" />
        <HFButton
          type="submit"
          onClick={handleDelete}
          text="Delete"
          disabled={loading}
        />
      </Stack>
    </ConfirmDialog>
  );
};

export default ProductView;
