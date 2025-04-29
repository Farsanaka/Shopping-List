import Logo from "../components/Logo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../services/api";
import { loginUser } from "../services/auth";
function Login() {
  const navigate = useNavigate(); // React Router hook for navigation
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
    await checkUser();
    console.log(checkUser());
  };
  const checkUser = async () => {
    const users = await fetchUsers();
    const usercheck = users.find(
      (user) => user.username === username && user.password === password
    );
    if (usercheck) {
      loginUser(usercheck);
      navigate("/home");
    } else {
      alert("Wrong password or username");
    }
    console.log(usercheck);
  };
  // const handleLogin = (e) => {
  //   e.preventDefault();

  //   navigate("/home");
  // };

  return (
    <div className="relative bg-[url(/img/bg.jpg)] h-screen bg-cover bg-center  ">
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
