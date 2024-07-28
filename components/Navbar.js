"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Navbar = ({ user }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    router.push("/login");
  };

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
                  Cart
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
