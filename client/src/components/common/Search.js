import React, { useEffect, useState } from "react";
import { getUserByUsername } from "../../services/operations/settingsAPI";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getBlogbyTitle } from "../../services/operations/blogAPI";
import SearchBlogs from "./SearchBlogs";
import toast from "react-hot-toast";
import Footer from "./Footer";
const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("username"); // Default search criteria
  const [showOptions, setShowOptions] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const handleSearch = async (option) => {
    try {
      let response;
      if (searchCriteria === "username") {
        if (!token) {
          // If not logged in, redirect to login page and display toast
          navigate("/login");
          toast.error("Please log in !!!");
          return;
        }
        response = await getUserByUsername(searchTerm, token);
        const data = response;
        if (data) {
          navigate(`/auth/getUserByUsername/${searchTerm}`);
        } else {
          // Show toaster notification for unsuccessful search
          console.log("User not found.");
        }
      } else if (searchCriteria === "blogTitle") {
        const title = searchTerm;
        response = await getBlogbyTitle(title, token);
        const data = response;
        console.log("data", data);
        if (data.success) {
          setSearchResults(data.data);
          console.log("title", title);
          navigate(`/blog/getBlogsByTitle/${title}`);
        } else {
          // Show toaster notification for unsuccessful search
          console.log("Blog not found.");
        }
        // Handle other search criteria (blogTitle, tags) if needed
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setSearchTerm("");
  };
  console.log("searchresultttt", searchResults);

  const handleOptionSelect = (option) => {
    setSearchCriteria(option);
    setShowOptions(false);
    // Set the search criteria and hide options when an option is selected
  };
  const options = ["username", "blogTitle"];

  return (
    <div>
      <div className="relative flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search by ${searchCriteria}`}
            className="border border-gray-300 rounded-md px-2 py-1 cursor-pointer"
            onClick={() => setShowOptions(!showOptions)}
          />
          {showOptions && (
            <div className="absolute z-10 top-full left-0 w-full bg-white border border-gray-300 rounded-b-md">
              {options.map((option, index) => (
                <div
                  key={index}
                  className="px-2 py-1 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={() => handleSearch(searchCriteria)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchComponent;
