import React from "react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <form className="flex items-center gap-2 p-1 relative">
      <input
        type="text"
        placeholder="Find Movie, TV Show"
        required
        className="px-1 py-2 "
      />
      <button className="absolute end-2.5 " aria-label="Search button">
        <FaSearch size={20} color="black" />
      </button>
    </form>
  );
};

export default Search;
