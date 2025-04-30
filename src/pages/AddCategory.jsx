import { useEffect } from "react";
import BackgroundLayout from "../components/BackgroudLayout";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchAll } from "../features/category/categorySlice"; // Correct path

function AddCategory() {
  const dispatch = useDispatch();
  const { categories, error, status } = useSelector((state) => state.category);

  useEffect(() => {
    
      dispatch(fetchAll());
    
  }, []);

  console.log("cate", categories);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <BackgroundLayout bgImage="/img/homebg.jpg">
      <Header />
      <div className="flex justify-center">
        <div className="bg-stone-300 rounded-lg m-4 w-fit">
          <p className="p-2 text-center font-bold text-lg">CATEGORY LIST</p>
          
          <ul className="m-4">
            {categories.length > 0 ? (
              categories.map((cat, index) => (
                <li key={index} className="flex gap-4 mb-2">
                  <input
                    type="text"
                    readOnly
                    value={cat.code}
                    className="bg-white rounded-lg px-2 py-1 text-center"
                  />
                  <input
                    type="text"
                    readOnly
                    value={cat.category}
                    className="bg-white rounded-lg px-2 py-1 text-center"
                  />
                </li>
              ))
            ) : (
              <p>No categories available.</p> // If no categories, show a fallback message
            )}
          </ul>
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default AddCategory;
