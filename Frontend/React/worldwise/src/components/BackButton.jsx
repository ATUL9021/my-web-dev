import Button from "./Button";
import { useNavigate } from "react-router-dom";

function BackButton() {
  console.log("im bak");
  const navigate = useNavigate();
  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      &larr; Back
    </Button>
  );
}

export default BackButton;
