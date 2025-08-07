import React from 'react';
import HomePage from './components/homePage';
import DocumentPage from './components/documentPage';

import "./App.css"

const App = () => {
  return (
    <>
        <HomePage />
        <div className='separator'></div>
        <DocumentPage />
    </>

  );
}

export default App;
