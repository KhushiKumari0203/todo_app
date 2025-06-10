// client/src/components/FilterTasks.tsx
import React from 'react';

interface Props {
  status: 'all' | 'complete' | 'incomplete';
  setStatus: (status: 'all' | 'complete' | 'incomplete') => void;
}

const FilterTasks: React.FC<Props> = ({ status, setStatus }) => {
  return (
    <select
      value={status}
      onChange={e => setStatus(e.target.value as any)}
      className="border rounded p-2"
    >
      <option value="all">All</option>
      <option value="complete">Complete</option>
      <option value="incomplete">Incomplete</option>
    </select>
  );
};

export default FilterTasks;
