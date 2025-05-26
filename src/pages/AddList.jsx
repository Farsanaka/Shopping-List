import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { addShoppingList } from "../redux/shoppingListSlice";
import { fetchAll } from "../redux/categorySlice";

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
    if (user?.id) {
      dispatch(fetchAll(user.id));
    }
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
  return (
    <div>
      <div className="flex justify-center mt-[var(--spacing-10xl)] gap-[var(--spacing-xl)]">
        <div className="flex justify-center font-bold mr-[var(--spacing-56)]">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-[var(--spacing-sm)] px-[var(--spacing-2sm)] py-[var(--spacing-sm)] text-[var(--color-bg-light)] bg-[var(--color-gray-700)] rounded hover:bg-[var(--color-gray-800)]"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back
          </button>
        </div>
        <div className="flex justify-center ">
          <button
            onClick={() => navigate("/home/category")}
            className="px-[var(--spacing-sm)] py-[var(--spacing-xs)] bg-gradient-to-r from-[var(--color-green-400)] to-[var(--color-gray-400)] rounded-lg font-semibold  "
          >
            Add Category
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col justify-center bg-[var(--color-stone-300)] rounded-lg m-[var(--spacing-2sm)] w-fit center">
          <p className="p-[var(--spacing-sm)] text-center font-bold text-lg">
            ADD NEW LIST
          </p>

          <div className="flex justify-center gap-[var(--spacing-15xl)] mx-[var(--spacing-l)] my-[var(--spacing-2sm)] ">
            <input
              type="text"
              placeholder="Name"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="bg-[var(--color-bg-light)] rounded-lg text-center mx-[var(--spacing-2sm)]  shadow-lg shadow-[var(--color-gray-400-50)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] "
            />

            <select
              value={formCategory}
              onChange={(e) => setFormCategory(e.target.value)}
              className="bg-[var(--color-bg-light] rounded-lg text-center"
            >
              <option value="">Choose Category</option>
              {categories
                .filter((cat) => cat.userId === user.id)
                .map((cat) => (
                  <option key={cat.code} value={cat.code}>
                    {cat.code}
                  </option>
                ))}
            </select>
          </div>

          {canShowItemInput && (
            <div className="flex flex-col mx-[var(--spacing-l)] my-[var(--spacing-2sm)] gap-[var(--spacing-2sm)]">
              <div className="flex gap-4">
                <input
                  type="number"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="bg-white rounded-lg text-center mx-[var(--spacing-2sm)]  shadow-lg shadow-gray-400/50 focus:outline-none focus:ring-[var(--spacing-sm)] focus:ring-[var(--spacing-secondary)] "
                />
                <input
                  type="text"
                  placeholder="Item Name / Description"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="bg-[var(--color-bg-light)] rounded-lg text-center mx-[var(--spacing-2sm)] shadow-lg shadow-gray-400/50 focus:outline-none focus:ring-[var(--spacing-sm)] focus:ring-[var(--spacing-secondary)] "
                />
                <button
                  onClick={handleAddItem}
                  className="px-[var(--spacing-2sm)] py-[var(--spacing-xs)] bg-gradient-to-r from-[var(--color-green-400)] to-[var(--color-secondary)] rounded-lg font-semibold"
                >
                  Add Item
                </button>
              </div>

              <div className="flex flex-col items-center justify-center p-[var(--spacing-l)] ">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center space-x-[var(--spacing-sm)]  mb-[var(--spacing-sm)] "
                  >
                    <div className="bg-[var(--color-gray-200)] px-[var(--spacing-2sm)] py-[var(--spacing-sm)] rounded-md h-[var(--spacing-xl)] flex items-center justify-center">
                      {item.quantity}
                    </div>
                    <div className="text-lg font-semibold">×</div>
                    <div className="bg-[var(--color-gray-200)] px-[var(--spacing-2sm)] py-[var(--spacing-sm)] rounded-md h-[var(--spacing-xl)] flex items-center justify-center">
                      {item.itemName}
                    </div>

                    <button
                      className="bg-[var(--color-red-500)]  text-[var(--color-bg-light)]  rounded-md h-[var(--spacing-xl)] w-[var(--spacing-xl)] flex items-center justify-center hover:bg-[var(--color-red-600)] "
                      onClick={() => handleRemove(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-center my-[var(--spacing-2sm)]">
                <button
                  onClick={handleSaveList}
                  className="px-[var(--spacing-l)]  py-[var(--spacing-sm)]  bg-gradient-to-r from-blue-400 to-gray-400 rounded-lg font-bold"
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
