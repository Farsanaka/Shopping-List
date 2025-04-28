import Logo from "./Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/auth";
import { fetchUsers } from "../services/api";
import { useState } from "react";
import { useEffect } from "react";

function NavBar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div>
      <nav className="flex p-3 place-content-between bg-black">
        <Logo />
        <div className="flex gap-4">
          <div>
            <div className="text-white ">
              {" "}
              Welcome, {user ? user.name : "Guest"}
            </div>
            <div className="flex justify-end">
              <FontAwesomeIcon icon={faUser} className="mt-4 text-white " />
              <button onClick={handleLogout} className="text-white pl-2 mt-3 ">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
