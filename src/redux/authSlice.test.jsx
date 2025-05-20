// authSlice.test.js
import authReducer, {
  loginPending,
  loginSuccess,
  loginFailure,
  logout,
} from '../redux/authSlice';

describe('authSlice reducer', () => {
  const initialState = {
    isAuthenticated: false,
    user: null,
    status: 'idle',
    error: null,
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('should handle loginPending', () => {
    const nextState = authReducer(initialState, loginPending());
    expect(nextState.status).toBe('loading');
    expect(nextState.error).toBe(null);
  });

  it('should handle loginSuccess and store user in localStorage', () => {
    const user = { id: 1, username: 'test' };
    const nextState = authReducer(initialState, loginSuccess(user));

    expect(nextState.isAuthenticated).toBe(true);
    expect(nextState.user).toEqual(user);
    expect(JSON.parse(localStorage.getItem('user'))).toEqual(user);
  });

  it('should handle loginFailure', () => {
    const nextState = authReducer(initialState, loginFailure('Invalid credentials'));

    expect(nextState.status).toBe('failed');
    expect(nextState.error).toBe('Invalid credentials');
  });

  it('should handle logout and remove user from localStorage', () => {
    localStorage.setItem('user', JSON.stringify({ id: 1, username: 'test' }));

    const loggedInState = {
      isAuthenticated: true,
      user: { id: 1, username: 'test' },
      status: 'succeeded',
      error: null,
    };

    const nextState = authReducer(loggedInState, logout());

    expect(nextState.isAuthenticated).toBe(false);
    expect(nextState.user).toBe(null);
    expect(localStorage.getItem('user')).toBe(null);
  });
});
