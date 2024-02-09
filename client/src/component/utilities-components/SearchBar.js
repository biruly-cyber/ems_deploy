import React, { useState } from "react";

const SearchBar = ({ mainArray, duplicateArray, onSearch, placeholder}) => {
  
  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="container mx-auto">
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleSearch}
        className="p-2 border rounded-md"
      />
    </div>
  );
};

export default SearchBar;
