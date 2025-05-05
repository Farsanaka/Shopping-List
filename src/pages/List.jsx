import BackgroundLayout from "../components/BackgroudLayout";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setName,
  setCategory,
  showItemInputFields,
} from "../features/shoppingList/shoppingListSlice";
import { fetchAll } from "../features/category/categorySlice";
import { useEffect } from "react";

function List() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { name, category, showItemInputs } = useSelector(
    (state) => state.shoppingList
  );
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchAll());
  }, []);

  const handleAddList = () => {
    if (category.trim()) {
      dispatch(showItemInputFields());
    } else {
      alert("Please enter list name and select category.");
    }
  };

  return (
    <BackgroundLayout bgImage="/img/homebg.jpg">
      <Header />
      <div className="flex justify-center">
        <div className="flex flex-col justify-center bg-stone-300 rounded-lg m-4 w-fit center">
          <p className="p-2 text-center font-bold text-lg">ADD NEW LIST</p>

          <div className="flex justify-center gap-15 mx-6 my-4">
            {/* <input
              type="text"
              placeholder="Name"
              className="bg-white rounded-lg text-center"
            /> */}
            {/* <select>
              <option value="someOption">Choose Category</option>
              <option value="otherOption">Other option</option>
            </select> */}

            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => dispatch(setName(e.target.value))}
              className="bg-white rounded-lg text-center"
            />

            <select
              value={category}
              onChange={(e) => dispatch(setCategory(e.target.value))}
            >
              <option value="">Choose Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.category}>
                  {cat.category}
                </option>
              ))}
            </select>

            <button
              onClick={handleAddList}
              className="px-4 py-1 bg-gradient-to-r from-green-400  to-gray-400 rounded-lg font-semibold"
            >
              Add List
            </button>
            <button
              onClick={() => navigate("/home/Category")}
              className="px-4 py-1 bg-gradient-to-r from-fuchsia-300  to-gray-400 rounded-lg font-semibold"
            >
              Add Category
            </button>
          </div>
          <div className="flex  gap-15 mx-6 my-4">
            {showItemInputs && (
              <div className="flex gap-15 mx-6 my-4">
                <input
                  type="text"
                  placeholder="Quantity"
                  className="bg-white rounded-lg text-center"
                />
                <input
                  type="text"
                  placeholder="Item Name / Description"
                  className="bg-white rounded-lg text-center px-3"
                />
                <button className="px-4 py-1 bg-gradient-to-r from-green-400 to-gray-400 rounded-lg font-semibold">
                  Add Item
                </button>
              </div>
            )}
            {/* <input
              type="text"
              placeholder="Quantity"
              className="bg-white rounded-lg text-center"
            />
            <input
              type="text"
              placeholder="Item Name / Description"
              className="bg-white rounded-lg text-center px-3"
            /> */}
            {/* <button className="px-4 py-1 bg-gradient-to-r from-green-400  to-gray-400 rounded-lg font-semibold">
              Add Item
            </button> */}
          </div>
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default List;
