import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaUserCircle, FaGlobe, FaTimes } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { User, logout } = useContext(AuthContext)
  const profileRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search query:", query);
  };

  const onLogout = ()=>{
    logout()

    if(!logout()){
      toast.error("Logout Failed!")
    }
    Navigate('/')
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">

        <Link to="/" className="flex items-center">
          <img src="/logo.jpeg" alt="ASICNOVA" className="h-10 mr-2 cursor-pointer" />
        </Link>

        <div className="hidden md:flex space-x-6 font-medium">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/products" className="hover:text-blue-600">Shop</Link>
          <Link to="/about" className="hover:text-blue-600">About Us</Link>
          <Link to="/contact" className="hover:text-blue-600">Contact Us</Link>
          <Link to="/cart" className="hover:text-blue-600">Cart</Link>
        </div>


        <div className="hidden md:flex items-center space-x-4">

          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="flex items-center p-2 text-blue-500 rounded hover:bg-gray-100"
          >
            <FaSearch className="h-6 w-6" />
          </button>


          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center p-2 text-blue-500 rounded gap-2 hover:bg-gray-100"
            >
              <FaUserCircle className="h-6 w-6 text-blue-500" />
              <div>{User?.fullName}</div>
            </button>


            {profileOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                {!User ? (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setProfileOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setProfileOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                ) : <button type="button" className="block px-4 py-2 hover:bg-gray-100 w-full cursor-pointer" onClick={() => {setProfileOpen(false); onLogout()}}>
                    Logout
                </button>}
              </div>
            )}
          </div>

          <button className="flex items-center p-2 text-blue-500 rounded hover:bg-gray-100">
            <FaGlobe className="mr-1 text-blue-500" /> EN
          </button>
        </div>

        <button className="md:hidden p-2 border rounded" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>


      {isSearchOpen && (
        <div className="w-full bg-white border-t-2 border-zinc-100 py-5">
          <form onSubmit={handleSubmit} className="flex items-center justify-center w-full">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="w-1/4 py-4 px-4 rounded-l-lg border border-zinc-200 focus:outline-none text-black font-medium"
            />
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              type="button"
              className="bg-blue-500 text-white px-4 h-15 rounded-r-lg flex items-center justify-center"
            >
              <FaTimes size={16} />
            </button>
          </form>
        </div>
      )}


      {menuOpen && (
        <div className="md:hidden bg-white border-t">
          <Link to="/" className="block px-4 py-2 hover:bg-gray-50">Home</Link>
          <Link to="/shop" className="block px-4 py-2 hover:bg-gray-50">Shop</Link>
          <Link to="/about" className="block px-4 py-2 hover:bg-gray-50">About Us</Link>
          <Link to="/contact" className="block px-4 py-2 hover:bg-gray-50">Contact Us</Link>
          <Link to="/cart" className="block px-4 py-2 hover:bg-gray-50">Cart</Link>
          <Link to="/login" className="block px-4 py-2 hover:bg-gray-50">Sign In</Link>
          <Link to="/signup" className="block px-4 py-2 hover:bg-gray-50">Sign Up</Link>
        </div>
      )}
    </nav>
  );
}
