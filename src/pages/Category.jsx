import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAll,
  addCategory,
  setCode,
  setCategory,
  updateCategory,
  deleteCategory,
} from "../features/category/categorySlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Category() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, error, status, code, category } = useSelector(
    (state) => state.category
  );
  //
  const currentUser = useSelector((state) => state.auth.user);
  //
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({ code: "", category: "" });

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(fetchAll(currentUser.id));
    }
  }, [dispatch, currentUser]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p className="text-red-500">Error: {error}</p>;
  }

  const handleAdd = () => {
    if (category.trim()) {
      const newCategory = { code, category, userId: currentUser.id };
      dispatch(addCategory(newCategory));
      dispatch(setCategory(""));
      dispatch(setCode(""));

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Category added successfully!",
        showConfirmButton: false,
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: true,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Category name cannot be empty!",
        confirmButtonText: "OK",
      });
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
  };

  return (
    <div>
      <div className="flex justify-center mr-130 mt-10 font-bold">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 text-white bg-gray-700 rounded hover:bg-gray-800"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back
        </button>
      </div>
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
            <li className="flex gap-4 mb-2">
              <div className="bg-gray-300 rounded-lg px-2 py-1 text-center w-[200px]">
                CODE
              </div>
              <div className="bg-gray-300 rounded-lg px-2 py-1 text-center w-[200px]">
                CATEGORY NAME
              </div>
            </li>
            {categories
              .filter((cat) => cat.userId === currentUser.id)
              .map((cat, index) => (
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
                      <div className="w-35 flex align-middle justify-center">
                        <button
                          onClick={() => {
                            console.log("Sending to updateCategory:", {
                              ...editData,
                              id: cat.id,
                            });
                            dispatch(
                              updateCategory({ ...editData, id: cat.id })
                            );
                            setEditIndex(null);
                          }}
                          className="shadow-lg shadow-gray-400/50 px-4 py-1 bg-gradient-to-r from-green-300 to-gray-400 rounded-lg font-semibold"
                        >
                          Save
                        </button>
                      </div>
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
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Category;
