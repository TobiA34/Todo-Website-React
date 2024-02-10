
import React from 'react'

function SearchBar({placeholder, setQuery}) {
  return (
    <div>
      <input
        placeholder= {placeholder}
        onChange={(event) => setQuery(event.target.value)}
      />
    </div>
  );
}

export default SearchBar;
