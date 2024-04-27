import React from 'react';
import {Routes , Route} from "react-router-dom";
import MyGoogleMap from './GoogleMap';
import {AddMap} from './AddMap';
import { DeleteMap } from './DeleteMap';
import { GoogleMap, InfoWindowF, LoadScript,MarkerF } from '@react-google-maps/api';
import "./App.css"
function App() {
  return (
    <body>
    <h1>OKAMOTO APP</h1>
    <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY!}>
      <Routes>
        <Route path="/" element={<MyGoogleMap />} /> 
        <Route path="/addmap" element={<AddMap />} /> 
        <Route path="/deletemap" element={<DeleteMap />} /> 
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
      </LoadScript>
    </body>
  );
}

export default App;
