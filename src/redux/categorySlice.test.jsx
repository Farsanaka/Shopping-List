// categorySlice.test.js
import categoryReducer, {
  fetchAllSuccess,
  fetchAllFailure,
  addCategorySuccess,
  addCategoryFailure,
  setCode,
  setCategory,
  updateCategorySuccess,
  updateCategoryFailure,
  deleteCategorySuccess,
  deleteCategoryFailure,
} from '../redux/categorySlice'; // update path if needed

describe('categorySlice reducer', () => {
  const initialState = {
    categories: [],
    error: '',
    code: '',
    category: '',
  };

  it('should handle fetchAllSuccess', () => {
    const payload = [{ id: 1, name: 'Groceries' }];
    const nextState = categoryReducer(initialState, fetchAllSuccess(payload));
    expect(nextState.categories).toEqual(payload);
  });

  it('should handle fetchAllFailure', () => {
    const nextState = categoryReducer(initialState, fetchAllFailure('Network error'));
    expect(nextState.error).toBe('Error occurred - Network error');
  });

  it('should handle addCategorySuccess', () => {
    const newCategory = { id: 2, name: 'Utilities' };
    const nextState = categoryReducer(initialState, addCategorySuccess(newCategory));
    expect(nextState.categories).toContainEqual(newCategory);
  });

  it('should handle addCategoryFailure', () => {
    const nextState = categoryReducer(initialState, addCategoryFailure('Validation error'));
    expect(nextState.error).toBe('Error occurred - Validation error');
    expect(nextState.code).toBe('');
    expect(nextState.category).toBe('');
  });

  it('should handle setCode', () => {
    const nextState = categoryReducer(initialState, setCode('C001'));
    expect(nextState.code).toBe('C001');
  });

  it('should handle setCategory', () => {
    const nextState = categoryReducer(initialState, setCategory('Books'));
    expect(nextState.category).toBe('Books');
  });

  it('should handle updateCategorySuccess', () => {
    const state = {
      ...initialState,
      categories: [
        { id: 1, name: 'Old Category' },
        { id: 2, name: 'Keep' },
      ],
    };
    const updatedCategory = { id: 1, name: 'Updated Category' };
    const nextState = categoryReducer(state, updateCategorySuccess(updatedCategory));
    expect(nextState.categories.find((c) => c.id === 1)).toEqual(updatedCategory);
  });

  it('should handle updateCategoryFailure', () => {
    const nextState = categoryReducer(initialState, updateCategoryFailure('Server error'));
    expect(nextState.error).toBe('Update failed - Server error');
  });

  it('should handle deleteCategorySuccess', () => {
    const state = {
      ...initialState,
      categories: [
        { id: 1, name: 'RemoveMe' },
        { id: 2, name: 'Stay' },
      ],
    };
    const nextState = categoryReducer(state, deleteCategorySuccess(1));
    expect(nextState.categories).toHaveLength(1);
    expect(nextState.categories[0].id).toBe(2);
  });

  it('should handle deleteCategoryFailure', () => {
    const nextState = categoryReducer(initialState, deleteCategoryFailure('DB error'));
    expect(nextState.error).toBe('Error occurred - DB error');
  });
});
