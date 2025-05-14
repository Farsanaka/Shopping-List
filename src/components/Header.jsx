import Logo from "./Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { performLogout } from "../redux/authSlice";

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(performLogout());
    navigate("/login");
  };

  return (
    <div>
      <nav className="flex p-3 place-content-between bg-black">
        <Logo />
        <div className="flex gap-4">
          <div>
            <div className="text-white">
              {" "}
              Welcome, {user ? user.name : "Guest"}{" "}
              {/* Display user name or Guest */}
            </div>
            <div className="flex justify-end">
              <FontAwesomeIcon icon={faUser} className="mt-4 text-white" />

              {isAuthenticated ? (
                <button onClick={handleLogout} className="text-white pl-2 mt-3">
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="text-white pl-2 mt-3"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
