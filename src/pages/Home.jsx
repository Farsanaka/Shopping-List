import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAll } from "../features/shoppingList/shoppingListSlice";
import BackgroundLayout from "../components/BackgroudLayout";
import Header from "../components/Header";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { lists } = useSelector((state) => state.shoppingList);

  useEffect(() => {
    if (user) {
      dispatch(fetchAll(user.id));
    }
  }, [dispatch, user]);

  return (
    <BackgroundLayout bgImage="/img/homebg.jpg">
      <Header />
      <div className="flex justify-end">
        <button
          onClick={() => navigate("/home/list")}
          className="px-4 py-1 bg-gradient-to-r from-green-400  to-gray-400 rounded-lg font-semibold"
        >
          Add New List
        </button>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col items-center bg-stone-200 rounded-lg m-4 w-fit">
     
          <ul>
            {user && lists.length > 0 ? (
              lists.map((list) => (
                <li key={list.id} className="flex gap-2 m-2">
                  <input
                    type="text"
                    readOnly
                    value={list.date}
                    className="shadow-lg shadow-gray-400/50 bg-white rounded-lg px-2 py-1 text-center w-auto"
                  />
                  <input
                    type="text"
                    readOnly
                    value={list.category}
                    className="shadow-lg shadow-gray-400/50 bg-white rounded-lg px-1 py-1 text-center w-auto"
                  />
                  <input
                    type="text"
                    readOnly
                    value={list.name}
                    className="shadow-lg shadow-gray-400/50 bg-white rounded-lg px-2 py-1 text-center w-auto"
                  />
                  <input
                    type="text"
                    readOnly
                    value={list.status}
                    className="shadow-lg shadow-gray-400/50 bg-white rounded-lg px-2 py-1 text-center w-auto"
                    style={{ width: `${list.status.length + 3}ch` }}
                  />
                  <input
                    type="text"
                    readOnly
                    value={list.details}
                    className="shadow-lg shadow-gray-400/50 bg-white rounded-lg px-2 py-1 text-center w-auto"
                    style={{ width: `${list.status.length + 1}ch` }}
                  />
                  <button
                    onClick={() => handleDelete(list.id)}
                    className="shadow-lg shadow-gray-400/50
                    px-4
                    py-1
                    bg-gradient-to-r
                    from-red-400
                    to-gray-400
                    rounded-lg
                    font-semibold"
                  >
                    Delete
                  </button>
                </li>
              ))
            ) : (
              <p>Please Login to view the Shopping List.</p>
            )}
          </ul>
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default Home;
