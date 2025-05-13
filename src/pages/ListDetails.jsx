import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchListById } from "../features/shoppingList/shoppingListSlice";
import { updateListStatus } from "../features/shoppingList/shoppingListSlice";

const ListDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentList = useSelector((state) => state.shoppingList.currentList);

  // Local state to handle item selection and editing
  const [itemStates, setItemStates] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchListById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentList && currentList.items) {
      setItemStates(
        currentList.items.map((item) => ({
          ...item,
          completed: false,
        }))
      );
    }
  }, [currentList]);

  const handleCheckboxChange = (index) => {
    const newItems = [...itemStates];
    newItems[index].completed = !newItems[index].completed;
    setItemStates(newItems);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedStatus = itemStates.every((item) => item.completed)
      ? "completed"
      : "in-progress";

    dispatch(
      updateListStatus({ listId: currentList.id, status: updatedStatus })
    );
    setIsEditing(false);
    alert("Changes saved!");
  };

  const handleMarkAsComplete = () => {
    const updatedItems = itemStates.map((item) => ({
      ...item,
      completed: true,
    }));
    setItemStates(updatedItems);
  };

  if (!currentList) return <p>Loading...</p>;

  return (
    <div className="flex justify-center">
      <div className="flex flex-col bg-stone-200 rounded-lg m-4 w-fit p-10">
        <h2 className="text-xl font-bold mb-4 text-center">
          {currentList.name}
        </h2>

        <p>
          Date: <strong>{currentList.date}</strong>
        </p>
        <p>
          Category: <strong>{currentList.category}</strong>
        </p>
        <p>
          Status: <strong>{currentList.status}</strong>
        </p>

        <p className="mt-4 font-semibold">Items List:</p>
        {itemStates.length > 0 ? (
          <ul className="list-none">
            {itemStates.map((item, index) => (
              <li key={index} className="flex items-center gap-2 my-1">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleCheckboxChange(index)}
                />
                <span
                  className={`${
                    item.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  <strong>Item {index + 1}</strong>: {item.itemName} - Quantity:{" "}
                  <strong>{item.quantity}</strong>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No items listed.</p>
        )}

        {/* Buttons */}
        <div className="flex gap-4 mt-6 justify-center">
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white px-4 py-1 rounded-lg shadow-md hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={handleMarkAsComplete}
            className="bg-green-500 text-white px-4 py-1 rounded-lg shadow-md hover:bg-green-600"
          >
            Mark All Complete
          </button>
          <button
            onClick={handleSave}
            className="bg-gray-600 text-white px-4 py-1 rounded-lg shadow-md hover:bg-gray-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListDetails;
