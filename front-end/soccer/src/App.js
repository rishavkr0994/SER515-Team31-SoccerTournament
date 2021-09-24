import TestMyCode from './components/Test';
import React, {useEffect } from 'react';

function App() {

  useEffect(() => {
    document.title = 'ASU Soccer';
  });

  return ( 
    <div className="App">
      <TestMyCode/>
    </div>
  );
}

export default App;
