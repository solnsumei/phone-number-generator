import React from 'react';
import RandomNumberGenerator from './RandomNumberGenerator';


const App = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h2 className="text-off-white">Random Phone Number Generator</h2>
      </header>
      <RandomNumberGenerator />
    </div>
  );
}

export default App;
