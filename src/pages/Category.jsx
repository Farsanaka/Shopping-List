import { useState, useEffect } from "react";
import BackgroundLayout from "../components/BackgroudLayout";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAll,
  addCategory,
  setCode,
  setCategory,
<<<<<<< HEAD
=======
  updateCategory,
>>>>>>> 98821663292bb5aad26bb1dd1658567900706e73
  deleteCategory,
} from "../features/category/categorySlice";

function Category() {
  const dispatch = useDispatch();
  const { categories, error, status, code, category } = useSelector(
    (state) => state.category
  );

  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({ code: "", category: "" });

  useEffect(() => {
    dispatch(fetchAll());
  }, []);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p className="text-red-500">Error: {error}</p>;
  }
  const handleAdd = () => {
    if (category.trim()) {
      const newCategory = { code, category }; // adjust to your API schema
      dispatch(addCategory(newCategory));
      dispatch(setCategory("")); // Reset input after dispatch
      dispatch(setCode(""));
    }
  };
<<<<<<< HEAD
  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
  };
=======

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
  };

>>>>>>> 98821663292bb5aad26bb1dd1658567900706e73
  return (
    <BackgroundLayout bgImage="/img/homebg.jpg">
      <Header />
      <div className="flex justify-center">
        <div className="bg-stone-300 rounded-lg m-4 w-fit">
          <p className="p-2 text-center font-bold text-lg">CATEGORY LIST</p>
          <div className="flex justify-center m-4 border p-4 rounded-lg border-gray-400 shadow">
            <input
              type="text"
              placeholder="Code"
              value={code}
              onChange={(e) => dispatch(setCode(e.target.value))}
              className="bg-white rounded-lg text-center mx-4  shadow-lg shadow-gray-400/50 focus:outline-none focus:ring-2 focus:ring-gray-400 "
            />
            <input
              type="text"
              placeholder="Name"
              value={category}
              onChange={(e) => dispatch(setCategory(e.target.value))}
              className="bg-white rounded-lg text-center mx-4 shadow-lg shadow-gray-400/50 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <button
              onClick={handleAdd}
              className="
                    px-4
                    py-1
                    mx-4
                    bg-gradient-to-r
                    from-green-400
                    to-gray-400
                    rounded-lg shadow-lg shadow-gray-400/50
                    font-semibold"
            >
              Add
            </button>
          </div>
          <ul className="m-4 mt-10">
<<<<<<< HEAD
            {categories.length > 0 ? (
              categories.map((cat, index) => (
                <li key={index} className="flex gap-4 mb-2">
                  <input
                    type="text"
                    readOnly
                    value={cat.code}
                    className="shadow-lg shadow-gray-400/50 bg-white rounded-lg px-2 py-1 text-center"
                  />
                  <input
                    type="text"
                    readOnly
                    value={cat.category}
                    className="shadow-lg shadow-gray-400/50 bg-white rounded-lg px-2 py-1 text-center"
                  />
                  <button
                    className="shadow-lg shadow-gray-400/50 
                    px-4
                    py-1
                    bg-gradient-to-r
                    from-amber-300
                    to-gray-400
                    rounded-lg
                    font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
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
              <p>No categories available.</p> // If no categories, show a fallback message
            )}
=======
            {categories.map((cat, index) => (
              <li key={index} className="flex gap-4 mb-2">
                {editIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={editData.code}
                      onChange={(e) =>
                        setEditData({ ...editData, code: e.target.value })
                      }
                      className="shadow-lg shadow-gray-400/50 bg-white rounded-lg px-2 py-1 text-center"
                    />
                    <input
                      type="text"
                      value={editData.category}
                      onChange={(e) =>
                        setEditData({ ...editData, category: e.target.value })
                      }
                      className="shadow-lg shadow-gray-400/50 bg-white rounded-lg px-2 py-1 text-center"
                    />
                    <button
                      onClick={() => {
                        console.log("Sending to updateCategory:", {
                          ...editData,
                          // prevcode: cat.code,
                          id: cat.id,
                        });
                        dispatch(
                          // updateCategory({ ...editData, prevcode: cat.code })
                          updateCategory({ ...editData, id: cat.id })
                        );
                        setEditIndex(null);
                      }}
                      className="shadow-lg shadow-gray-400/50 px-4 py-1 bg-gradient-to-r from-green-300 to-gray-400 rounded-lg font-semibold"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditIndex(index);
                        setEditData({ ...cat, prevCode: cat.code }); // store original code
                      }}
                      className="shadow-lg shadow-gray-400/50 px-4 py-1 bg-gradient-to-r from-gray-400 to-gray-200 rounded-lg font-semibold"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      readOnly
                      value={cat.code}
                      className="shadow-lg shadow-gray-400/50 bg-white rounded-lg px-2 py-1 text-center"
                    />
                    <input
                      type="text"
                      readOnly
                      value={cat.category}
                      className="shadow-lg shadow-gray-400/50 bg-white rounded-lg px-2 py-1 text-center"
                    />
                    <button
                      onClick={() => {
                        setEditIndex(index);
                        setEditData(cat);
                      }}
                      className="shadow-lg shadow-gray-400/50 px-4 py-1 bg-gradient-to-r from-amber-300 to-gray-400 rounded-lg font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="shadow-lg shadow-gray-400/50 px-4 py-1 bg-gradient-to-r from-red-400 to-gray-400 rounded-lg font-semibold"
                    >
                      Delete
                    </button>
                  </>
                )}
              </li>
            ))}
>>>>>>> 98821663292bb5aad26bb1dd1658567900706e73
          </ul>
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default Category;
