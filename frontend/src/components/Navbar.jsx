import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaUserCircle, FaGlobe, FaTimes } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const { User, logout } = useContext(AuthContext)
  const profileRef = useRef();
  const searchRef = useRef();
  const Navigate=useNavigate()

  // Live search function with your API
  const performSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    
    try {
      // Fetch all products and filter on frontend (or modify backend to accept search query)
      const response = await fetch('http://localhost:3000/product/get-products');
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      const products = data.products || data; // Handle different response structures
      
      // Filter products based on search query
      const filtered = products.filter(product =>
        product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8); // Limit to 8 results for dropdown
      
      setSearchResults(filtered);
      setIsSearching(false);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  // Handle search input changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(query);
    }, 300); // Debounce search by 300ms

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSubmit = (e,) => {
    e.preventDefault();
    if (query.trim()) {
      // Navigate to full search results page with query parameter
      console.log("Navigate to search results:", query);
      Navigate(`/products/${product._id}`);
      setIsSearchOpen(false);
    }
  };

  const handleProductClick = (product) => {
    console.log("Navigate to product:", product);
    // Navigate to individual product page using your route structure
    // window.location.href = `/products/${product._id || product.id}`;
    Navigate(`/products/${product._id || product.id}`);
    setIsSearchOpen(false);
    setQuery("");
    setSearchResults([]);
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
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-lg border-b-2 border-blue-200">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">

        <Link to="/" className="flex w-fit min-w-[140px] items-center">
          <img src="/logo.jpeg" alt="ASICNOVA" className="h-10 mr-2 cursor-pointer" />
        </Link>

        <div className="hidden font-semibold md:flex space-x-6 text-xl whitespace-nowrap ">
          <Link to="/" className="text-gray-700 hover:text-white hover:scale-105 transition-all hover:bg-blue-600 rounded-4xl px-2 py-2 ">Home</Link>
          <Link to="/products" className="text-gray-700 hover:text-white hover:scale-105 transition-all hover:bg-blue-600 rounded-4xl px-2 py-2 ">Shop</Link>
          <Link to="/about" className="text-gray-700 hover:text-white hover:scale-105 transition-all hover:bg-blue-600 rounded-4xl px-2 py-2 ">About Us</Link>
          <Link to="/contact" className="text-gray-700 hover:text-white hover:scale-105 transition-all hover:bg-blue-600 rounded-4xl px-2 py-2 ">Contact Us</Link>
          <Link to="/cart" className="text-gray-700 hover:text-white hover:scale-105 transition-all hover:bg-blue-600 rounded-4xl px-2 py-2 ">Cart</Link>
        </div>


        <div className="hidden md:flex items-center space-x-4">

          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="flex items-center p-2 text-blue-600 rounded hover:bg-blue-50 transition-colors"
          >
            <FaSearch className="h-6 w-6" />
          </button>


          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center p-2 text-blue-600 rounded gap-2 hover:bg-blue-50 transition-colors"
            >
              <FaUserCircle  className="h-6 w-6 text-blue-600" />
              <div className="text-gray-700">{User?.fullName}</div>
            </button>


            {profileOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-xl z-10">
                {!User ? (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors"
                      onClick={() => setProfileOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors"
                      onClick={() => setProfileOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                ) : <button type="button" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 w-full cursor-pointer transition-colors" onClick={() => {setProfileOpen(false); onLogout()}}>
                    Logout
                </button>}
              </div>
            )}
          </div>

          <button className="flex items-center p-2 text-blue-600 rounded hover:bg-blue-50 transition-colors">
            <FaGlobe  className="mr-1  text-blue-600" /> 
            <span className="text-gray-700">EN</span>
          </button>
        </div>

        <button className="md:hidden p-2 border border-gray-300 rounded text-gray-700 hover:bg-blue-50 transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>


      {isSearchOpen && (
        <div className="w-full  bg-gray-50 border-t-2 border-blue-200 py-5" ref={searchRef}>
          <form onSubmit={handleSubmit} className="flex items-center justify-center w-full">
            <div className="relative w-1/4 mr-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search mining equipment..."
                className="w-full py-4 px-4 rounded-2xl  border border-gray-300 focus:outline-none  text-gray-900 bg-white font-medium placeholder-gray-500"
                autoFocus
              />
              
              {/* Live Search Results Dropdown */}
              {(query.trim() && (searchResults.length > 0 || isSearching)) && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 border-t-0 rounded-b-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                  {isSearching ? (
                    <div className="p-4 text-center text-gray-500">
                      <div className="animate-spin inline-block w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full mr-2"></div>
                      Searching...
                    </div>
                  ) : searchResults.length > 0 ? (
                    <>
                      {searchResults.map((product) => (
                        <div
                          key={product._id || product.id}
                          onClick={() => handleProductClick(product)}
                          className="p-4 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex-1">
                              <div className="font-semibold text-gray-800">{product.name}</div>
                              <div className="text-sm text-gray-600">
                                {product.category || product.brand}
                                {product.category && product.brand && ` • ${product.brand}`}
                              </div>
                              {product.description && (
                                <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                                  {product.description.length > 60 
                                    ? `${product.description.substring(0, 60)}...` 
                                    : product.description
                                  }
                                </div>
                              )}
                            </div>
                            {product.images && product.images.length > 0 && (
                            <div className="mt-2">
                              <img 
                                src={product.images && product.images.length > 0
              ? `http://localhost:3000/${product.images[0].replace(/\\/g, '/')}`
              : '/dummy.jpg'} 
                                alt={product.name}
                                className="w-14 h-14 object-cover rounded border"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                            </div>
                          )}
                          </div>
                          
                        </div>
                      ))}
                      
                    </>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No products found for "{query}"
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <button
              type="submit"
              className="bg-blue-600 rounded-2xl hover:bg-blue-700 text-white px-4 py-4 flex items-center justify-center transition-colors"
            >
              <FaSearch size={20} />
            </button>
            <button
              onClick={() => {
                setIsSearchOpen(false);
                setQuery("");
                setSearchResults([]);
              }}
              type="button"
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-4 rounded-2xl flex items-center justify-center transition-colors ml-1"
            >
              <FaTimes size={20} />
            </button>
          </form>
        </div>
      )}


      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">Home</Link>
          <Link to="/shop" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">Shop</Link>
          <Link to="/about" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">About Us</Link>
          <Link to="/contact" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">Contact Us</Link>
          <Link to="/cart" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">Cart</Link>
          <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">Sign In</Link>
          <Link to="/signup" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">Sign Up</Link>
        </div>
      )}
    </nav>
  );
}