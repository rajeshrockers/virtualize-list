import React from 'react';
import VirtualizedFrozenTable from './Components/VirtualizedFrozenTable';

const App: React.FC = () => {
  return (
    <div>
      <h2 style={{ textAlign: 'center', padding: '10px' }}>Virtual Scroll Table with Frozen Columns</h2>
      <VirtualizedFrozenTable />
    </div>
  );
};

export default App;
