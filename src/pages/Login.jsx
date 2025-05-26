import Logo from "../components/Logo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure, loginPending } from "../redux/authSlice";
import { fetchUsers } from "../services/api";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = data;

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginPending());
    await checkUser();
  };

  const checkUser = async () => {
    try {
      const response = await fetchUsers();
      const users = Array.isArray(response) ? response : response.users;

      console.log("Fetched users:", users);
      const usercheck = users.find(
        (user) => user.username === username && user.password === password
      );

      if (usercheck) {
        dispatch(loginSuccess(usercheck));
        navigate("/home");
      } else {
        dispatch(loginFailure("Wrong password or username"));
        alert("Wrong password or username");
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
      console.log(error);
    }
  };

  return (
    <div className="relative bg-[url(/img/bg.jpg)] h-screen bg-cover bg-center font-poppins">
      <div className="relative z-10">
        <Logo />
      </div>
      <div className="absolute inset-0 bg-[var(--color-black)] opacity-70"></div>

      <div className="relative flex items-center justify-center h-[var(--height-190)]">
        <div className="bg-[var(--color-bg-light)] p-[var(--spacing-xl)] rounded-[var(--radius-lg)] shadow-lg text-center">
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                placeholder="Username"
                name="username"
                value={username}
                onChange={changeHandler}
                className="px-[80px] my-[var(--spacing-sm)] py-[var(--spacing-xs)] text-center border border-[var(--color-border)] rounded-[var(--radius-sm)]"
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
                className="px-[80px] my-[var(--spacing-sm)] py-[var(--spacing-xs)] text-center border border-[var(--color-border)] rounded-[var(--radius-sm)]"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="px-[var(--spacing-md)] py-[var(--spacing-xs)] mt-[var(--spacing-sm)] bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-[var(--radius-sm)] font-semibold text-[var(--color-bg-light)]"
              >
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
