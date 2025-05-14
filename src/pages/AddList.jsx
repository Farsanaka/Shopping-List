import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { addShoppingList } from "../features/shoppingList/shoppingListSlice";
import { fetchAll } from "../features/category/categorySlice";

function AddList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [items, setItems] = useState([]);
  const { status, error } = useSelector((state) => state.shoppingList);
  const auth = useSelector((state) => state.auth);
  const user = auth?.user; 
  const categories = useSelector((state) => state.category.categories);

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p className="text-red-500">Error: {error}</p>;
  }

  const canShowItemInput = formName.trim() && formCategory.trim();

  const handleAddItem = () => {
    if (!itemName.trim() || !quantity.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill both item name and quantity.",
        showConfirmButton: false,
      });
      return;
    }

    setItems([...items, { itemName, quantity }]);
    setItemName("");
    setQuantity("");
  };

  const handleSaveList = async () => {
    if (!formName.trim() || !formCategory.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill in both name and category.",
        showConfirmButton: false,
      });
      return;
    }

    if (items.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No Items Added",
        text: "Please add at least one item.",
        showConfirmButton: false,
      });
      return;
    }

    const today = new Date();
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = today.toLocaleDateString("en-GB", options);

    const newList = {
      name: formName,
      category: formCategory,
      status: "Pending",
      date: date,
      items: items,
      userid: user.id,
    };

    console.log("new list is", newList);
    dispatch(addShoppingList(newList));
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "List Added successfully!",
      showConfirmButton: false,
    });

    navigate("/home");
  };
  const handleRemove = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p className="text-red-500">Error: {error}</p>;
  }
  return (
    <div>
      <div className="flex justify-center mt-10 gap-2.5">
        <div className="flex justify-center font-bold mr-56">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 text-white bg-gray-700 rounded hover:bg-gray-800"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back
          </button>
        </div>
        <div className="flex justify-center ">
          <button
            onClick={() => navigate("/home/category")}
            className="px-4 py-1 bg-gradient-to-r from-green-400 to-gray-400 rounded-lg font-semibold  "
          >
            Add Category
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col justify-center bg-stone-300 rounded-lg m-4 w-fit center">
          <p className="p-2 text-center font-bold text-lg">ADD NEW LIST</p>

          <div className="flex justify-center gap-15 mx-6 my-4 ">
            <input
              type="text"
              placeholder="Name"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="bg-white rounded-lg text-center mx-4  shadow-lg shadow-gray-400/50 focus:outline-none focus:ring-2 focus:ring-gray-400 "
            />

            <select
              value={formCategory}
              onChange={(e) => setFormCategory(e.target.value)}
              className="bg-white rounded-lg text-center"
            >
              <option value="">Choose Category</option>
              {categories.map((cat) => (
                <option key={cat.code} value={cat.category}>
                  {cat.category}
                </option>
              ))}
            </select>
          </div>

          {canShowItemInput && (
            <div className="flex flex-col mx-6 my-4 gap-4">
              <div className="flex gap-4">
                <input
                  type="number"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="bg-white rounded-lg text-center mx-4  shadow-lg shadow-gray-400/50 focus:outline-none focus:ring-2 focus:ring-gray-400 "
                />
                <input
                  type="text"
                  placeholder="Item Name / Description"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="bg-white rounded-lg text-center mx-4  shadow-lg shadow-gray-400/50 focus:outline-none focus:ring-2 focus:ring-gray-400 "
                />
                <button
                  onClick={handleAddItem}
                  className="px-4 py-1 bg-gradient-to-r from-green-400 to-gray-400 rounded-lg font-semibold"
                >
                  Add Item
                </button>
              </div>

              <div className="flex flex-col items-center justify-center p-6">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center space-x-2 mb-2"
                  >
                    <div className="bg-gray-200 px-4 py-2 rounded-md h-8 flex items-center justify-center">
                      {item.quantity}
                    </div>
                    <div className="text-lg font-semibold">×</div>
                    <div className="bg-gray-200 px-4 py-2 rounded-md h-8 flex items-center justify-center">
                      {item.itemName}
                    </div>

                    <button
                      className="bg-red-500 text-white rounded-md h-8 w-8 flex items-center justify-center hover:bg-red-600"
                      onClick={() => handleRemove(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-center my-4">
                <button
                  onClick={handleSaveList}
                  className="px-6 py-2 bg-gradient-to-r from-blue-400 to-gray-400 rounded-lg font-bold"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddList;
