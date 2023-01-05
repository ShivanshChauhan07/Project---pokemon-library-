import React from "react";

const Input = ({ search, handleSubmit, setSearch, reset }) => {
  return (
    <form action="" className="search" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search here..."
        value={search}
        className="pokemon-search"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button type="submit" className="in-btn">
        Search
      </button>
      <button type="button" className="in-btn" onClick={reset}>
        Reset
      </button>
    </form>
  );
};

export default Input;
