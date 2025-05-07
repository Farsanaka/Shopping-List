import Logo from "../components/Logo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // Import useDispatch from Redux
import {
  loginSuccess,
  loginFailure,
  loginPending,
} from "../services/authSlice"; // Import actions from authSlice
import { fetchUsers } from "../services/api";

function Login() {
  const navigate = useNavigate(); // React Router hook for navigation
  const dispatch = useDispatch(); // Initialize dispatch function
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = data;

  const changeHandler = async (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginPending()); // Set loading state before checking user
    await checkUser(); // Call checkUser function to validate login
  };

  const checkUser = async () => {
    try {
      const users = await fetchUsers();
      const usercheck = users.find(
        (user) => user.username === username && user.password === password
      );

      if (usercheck) {
        dispatch(loginSuccess(usercheck)); // Dispatch loginSuccess with user data
        navigate("/home"); // Redirect to home page on successful login
      } else {
        dispatch(loginFailure("Wrong password or username")); // Dispatch loginFailure on error
        alert("Wrong password or username"); // Show an alert on failure
      }
    } catch (error) {
      dispatch(loginFailure(error.message)); // Dispatch loginFailure if an error occurs
      console.log(error);
    }
  };

  return (
    <div className="relative bg-[url(/img/bg.jpg)] h-screen bg-cover bg-center">
      <div className="relative z-10">
        <Logo />
      </div>
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="relative flex items-center justify-center h-120">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center w-full max-w-md">
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                placeholder="Username"
                name="username"
                value={username}
                onChange={changeHandler}
                className="px-20 my-2 py-1 text-center border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={changeHandler}
                className="px-20 my-2 py-1 text-center border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <button className="px-5 py-1 mt-3 bg-gradient-to-r from-fuchsia-700  to-gray-400 rounded-lg font-semibold">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
