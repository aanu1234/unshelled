import { forwardRef, useState } from "react";

// @mui
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// severity = success || warning || info || error

export default function SnackBar({ open, severity, message }) {
  const [state] = useState({
    vertical: "top",
    horizontal: "center",
  });
  const [openSnack, setOpenSnack] = useState(open);

  const { vertical, horizontal } = state;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(!open);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
