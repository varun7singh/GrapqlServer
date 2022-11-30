import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";



const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#6E84D3",
  maxWidth: "200px",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#6E84D3",
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  borderColor: "#6E84D3",
  color: "#6E84D3",
  "&:hover": {
    backgroundColor: "#6E84D3",
    color: "#fff",
  },
}));

export { ColorButton, SecondaryButton };
