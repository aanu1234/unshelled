import "./single.css";

import Navbar from "../../components/navbar/Navbar";
import { Box, Stack } from "@mui/material";

import { HFTextInput, HFButton } from "../../components/hook-form";
import { useState } from "react";
import Snackbar from "../../components/snackbar";

const Single = () => {
  const [success, setSuccess] = useState(false);
  const product = JSON.parse(sessionStorage.getItem("product"));

  const defaultValues = {
    product_id: product?.product_id || "",
    product_category: product?.product_category || "",
    price: product?.price || "",
    date: product?.date || "",
  };

  const { product_id, product_category, price, date } = defaultValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(defaultValues);
    setTimeout(() => setSuccess(true), 1000);
  };

  return (
    <div className="single">
      <div className="singleContainer">
        <Navbar />
        <Box mt={5} component="form" onSubmit={handleSubmit}>
          {success && (
            <Snackbar
              open={success}
              severity="success"
              message="Updated successfully"
            />
          )}
          <Stack spacing={2}>
            {/* <HFTextInput label="Order Item Id" name="order_item_id" value={id} /> */}
            <HFTextInput
              label="Product ID"
              variant="standard"
              value={product_id}
            />
            <HFTextInput
              label="Product Category"
              variant="standard"
              value={product_category}
            />
            <HFTextInput label="Price" variant="standard" value={price} />
            <HFTextInput label="Date" variant="standard" value={date} />
          </Stack>
          <Stack direction="row" justifyContent="flex-end" mt={2}>
            <HFButton type="submit" text="Save Changes" />
          </Stack>
        </Box>
      </div>
    </div>
  );
};

export default Single;
