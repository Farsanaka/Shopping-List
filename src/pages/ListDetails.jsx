import {
  openDetails,
  closeDetails,
  saveCheckedItems,
} from "../features/shoppingList/detailsSlice";

function ListDetails(){
  return (
    <div>
       {/* Details Modal */}
                {showDetailsModal && selectedItem && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96 relative">
                      <button
                        onClick={() => dispatch(closeDetails())}
                        className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl font-bold"
                      >
                        ×
                      </button>
                      <h2 className="text-lg font-semibold mb-4">
                        {selectedItem.name} Details
                      </h2>
      
                      {selectedItem.items && selectedItem.items.length > 0 ? (
                        <div className="space-y-2">
                          {selectedItem.items.map((item, index) => {
                            const isChecked =
                              checkedItems[selectedItem.id]?.[index] || false;
      
                            return (
                              <div key={index} className="flex items-center gap-4">
                                <input
                                  type="checkbox"
                                  id={`item-${index}`}
                                  className="h-5 w-5"
                                  checked={localChecked?.[index] || false}
                                  onChange={() =>
                                    dispatch(
                                      setLocalChecked((prev) => ({
                                        ...prev,
                                        [index]: !prev[index],
                                      }))
                                    )
                                  }
                                />
      
                                <div className="flex gap-4">
                                  <p className="text-sm">
                                    <strong>Item:</strong> {item.itemName}
                                  </p>
                                  <p className="text-sm">
                                    <strong>Quantity:</strong> {item.quantity}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p>No items available for this list.</p>
                      )}
      
                      {/*  */}
                      <button
                        //
                        onClick={() => {
                          const allChecked =
                            Object.values(localChecked).every(Boolean);
                          const newStatus = allChecked ? "Completed" : "Pending";
      
                          dispatch(
                            saveCheckedItems({
                              listId: selectedItem.id,
                              checkedState: localChecked,
                            })
                          );
      
                          dispatch(
                            updateListStatus({
                              listId: selectedItem.id,
                              status: newStatus,
                            })
                          );
      
                          dispatch(closeDetails());
                        }}
                        //
      
                        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                      >
                        Save
                      </button>
      
                      {/*  */}
                    </div>
                  </div>
                )}
      
    </div>
  )
}

export default ListDetails
