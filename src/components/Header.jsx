import Logo from "./Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
function NavBar() {
  return (
    <div>
      <nav className="flex p-3 place-content-between bg-black">
        <Logo />
        <div className="flex gap-4">
          <FontAwesomeIcon icon={faUser} className="mt-4 text-white " />

          <NavLink to="/login" className="text-white mt-4">
            Logout
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
