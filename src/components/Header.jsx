import Logo from "./Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/auth";
function NavBar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };
  return (
    <div>
      <nav className="flex p-3 place-content-between bg-black">
        <Logo />
        <div className="flex gap-4">
          <FontAwesomeIcon icon={faUser} className="mt-4 text-white " />

          <button onClick={handleLogout} className="text-white ">
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
