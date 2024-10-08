"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { cartActions } from "@/redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { persistor } from "@/redux/store";

const Navbar = ({ user }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    persistor.purge(); // This clears all the persisted Redux state from storage
    dispatch(cartActions.logout());
    setIsAuthenticated(false);
  
    router.push("/login");
  };

  const cart = useSelector(state => state.cart.items);

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href={`/${user}/products`}
          className="text-white text-lg font-bold"
        >
          LocalHut
        </Link>
        <div className="space-x-4 flex items-center">
          <Link href={`/${user}/products`} className="text-white">
            Products
          </Link>
          {isAuthenticated && (
            <>
              {(user === "buyer") && (
                <Link href="/buyer/cart" className="text-white">
                  Cart {cart.length}
                </Link>
              )}

              <button onClick={handleLogout} className="text-white">
                Logout
              </button>
            </>
          )}
          {!isAuthenticated && (
            <>
              <Link href="/login" className="text-white">
                Login
              </Link>
              <Link href="/signup" className="text-white">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
