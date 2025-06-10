import React from 'react';

interface Props {
  order: 'asc' | 'desc';
  setOrder: (order: 'asc' | 'desc') => void;
}

const SortTask: React.FC<Props> = ({ order, setOrder }) => {
  return (
    <select
      value={order}
      onChange={e => setOrder(e.target.value as 'asc' | 'desc')}
      className="border p-2 rounded"
    >
      <option value="asc">Sort A-Z</option>
      <option value="desc">Sort Z-A</option>
    </select>
  );
};

export default SortTask;
