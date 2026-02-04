import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/model/authStore';
import { Button } from '../../shared/ui/Button';

export const Navigation = () => {
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <strong>Flower Store</strong>
        <div className="nav-links">
          <NavLink to="/">Products</NavLink>
          <NavLink to="/cart">Cart</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/messages">Support</NavLink>
        </div>
        <div className="inline">
          {!isAuthenticated ? (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          ) : (
            <Button onClick={() => void logout()}>Logout</Button>
          )}
        </div>
      </div>
    </nav>
  );
};
