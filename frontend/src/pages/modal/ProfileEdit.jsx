import { useContext, useState } from "react";
import * as api from "../../api";

// @mui
import { Stack } from "@mui/material";

// component
import ConfirmDialog from "../../components/confirm-dialog";
import { HFTextInput, HFButton } from "../../components/hook-form";
import Snackbar from "../../components/snackbar";

// context
import { AuthContext } from "../../context/AuthContext";

const ProfileEdit = ({ open, handleClose }) => {
  const { currentUser } = useContext(AuthContext);
  const defaultValues = {
    city: currentUser?.seller_city || "",
    state: currentUser?.seller_state || "",
  };
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [formdata, setFormdata] = useState(defaultValues);

  const { city, state } = formdata;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.updateAccount(formdata);
      if (data?.error) throw new Error(data.error);
      // set new data
      const user = JSON.parse(localStorage.getItem("user"));
      user.seller_city = data.seller_city;
      user.seller_state = data.seller_state;
      localStorage.setItem("user", JSON.stringify(user));
      setSuccess(true);
      setMessage("Updated Successfully");
    } catch (error) {
      setError(true);
      setMessage(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <ConfirmDialog
      title="Update Profile"
      open={open}
      onClose={handleClose}
      onCloseText="Close"
    >
      {error && <Snackbar open={error} severity="error" message={message} />}
      {success && (
        <Snackbar open={success} severity="success" message={message} />
      )}
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <HFTextInput
            label="City"
            name="city"
            value={city}
            onChange={handleChange}
          />
          <HFTextInput
            label="State"
            name="state"
            value={state}
            onChange={handleChange}
          />
          <HFButton type="submit" text="Save Changes" />
          {message && (
            <span className="message" align="center">
              {message}
            </span>
          )}
        </Stack>
      </form>
    </ConfirmDialog>
  );
};

export default ProfileEdit;
