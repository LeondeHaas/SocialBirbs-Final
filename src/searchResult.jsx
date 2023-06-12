import React, { useState } from "react";

const SearchResults = () => {
  const [selectedOption, setSelectedOption] = useState("most-liked");
  // Add your search result data and logic here

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    // Perform any actions or update the search results based on the selected option
  };

  return (
    <div>
      <label>
        <input
          type="radio"
          value="most-liked"
          checked={selectedOption === "most-liked"}
          onChange={handleOptionChange}
        />
        Most Liked
      </label>
      <label>
        <input
          type="radio"
          value="data"
          checked={selectedOption === "data"}
          onChange={handleOptionChange}
        />
        Data
      </label>
      <label>
        <input
          type="radio"
          value="new"
          checked={selectedOption === "new"}
          onChange={handleOptionChange}
        />
        New
      </label>

      {/* Display your search results based on the selected option */}
    </div>
  );
};

export default SearchResults;
