import Logo from "./Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import { performLogout } from "../services/authSlice"; // Import logout action

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch function
  const user = useSelector((state) => state.auth.user); // Access user from Redux store
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Check if user is authenticated

  const handleLogout = () => {
    dispatch(performLogout()); // Dispatch logout action
    navigate("/login"); // Redirect to login page
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

              {isAuthenticated ? ( // If user is authenticated, show logout button
                <button onClick={handleLogout} className="text-white pl-2 mt-3">
                  Logout
                </button>
              ) : (
                // Otherwise, show login button
                <button
                  onClick={() => navigate("/login")} // Navigate to login page
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
