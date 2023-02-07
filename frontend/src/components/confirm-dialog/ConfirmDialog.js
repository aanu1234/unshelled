import * as React from "react";
import PropTypes from "prop-types";
// @mui
import {
  Dialog,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  Slide,
} from "@mui/material";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// ----------------------------------------------------------------------

ConfirmDialog.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.node,
  action: PropTypes.node,
  content: PropTypes.node,
  onClose: PropTypes.func,
};

export default function ConfirmDialog({
  children,
  title,
  content,
  action,
  open,
  onClose,
  onCloseText,
  full = false,
  ...other
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      fullScreen={full && fullScreen}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      open={open}
      {...other}
      aria-describedby="dialog-slide-description"
    >
      <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>

      {content && (
        <DialogContent sx={{ typography: "body2" }}> {content} </DialogContent>
      )}

      {children && <DialogContent> {children} </DialogContent>}

      <DialogActions>
        {action}

        <Button color="inherit" onClick={onClose}>
          {onCloseText ? onCloseText : "Cancel"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
