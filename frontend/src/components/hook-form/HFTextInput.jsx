import { TextField } from "@mui/material";

const HFTextInput = ({ type, value, ...others }) => {
  return (
    <TextField
      margin="dense"
      type={type ? type : "text"}
      value={value}
      {...others}
    />
  );
};

export default HFTextInput;
