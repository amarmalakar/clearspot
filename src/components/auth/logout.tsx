import { useNavigate } from "react-router-dom";
import { doSignOut } from "@/lib/firebase/auth";
import { Button } from "../ui/button";

export default function Logout() {
  const navigate = useNavigate();

  const logoutHandler = () => {
    doSignOut().then(() => {
      navigate("/login");
    });
  };

  return (
    <Button onClick={logoutHandler} className="">
      Logout
    </Button>
  );
}
