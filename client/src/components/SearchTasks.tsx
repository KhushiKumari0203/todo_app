import React from 'react';

interface SearchProps {
  query: string;
  setQuery: (q: string) => void;
}

const SearchTasks: React.FC<SearchProps> = ({ query, setQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search tasks..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="border p-2 w-full mb-4"
    />
  );
};

export default SearchTasks;