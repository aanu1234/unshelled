import { Button } from "@mui/material";

const HFButton = ({ text, ...others }) => {
  return (
    <Button variant="text" {...others}>
      {text}
    </Button>
  );
};

export default HFButton;
