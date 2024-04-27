import React from 'react';
import {Routes , Route} from "react-router-dom";
import MyGoogleMap from './GoogleMap';
import {AddMap} from './AddMap';
import { DeleteMap } from './DeleteMap';
function App() {
  return (
    <>
    <h1>OKAMOTO APP</h1>
      <Routes>
        <Route path="/" element={<MyGoogleMap />} /> 
        <Route path="/addmap" element={<AddMap />} /> 
        <Route path="/deletemap" element={<DeleteMap />} /> 
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </>
  );
}

export default App;
