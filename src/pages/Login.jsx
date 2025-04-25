import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate(); // React Router hook for navigation

  const handleLogin = (e) => {
    e.preventDefault();

    navigate("/home");
  };
  return (
    <div className="relative bg-[url(/img/bg.jpg)] h-screen bg-cover bg-center  ">
      <div className="relative z-10">
        <Logo />
      </div>
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="relative flex items-center justify-center h-120">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center w-full max-w-md">
          <form onSubmit={handleLogin}>
            <div>
              <input
                type="email"
                placeholder="Username"
                name="uname"
                class="px-20 my-2 py-1 text-center border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                name="uname"
                class="px-20 my-2 py-1 text-center border border-gray-300 rounded-lg"
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
