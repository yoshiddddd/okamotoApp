

import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
    width: '90%',
    height: '600px'
};

const center = {
  lat: 35.6995,
  lng: 139.6363
};
const mapOptions = {
    styles: [
      {
        featureType: "all",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ visibility: "simplified" }]
      },
      // 他のスタイル設定...
    ]
  };
const MyGoogleMap = () => {
  return (
    <>
    <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY!}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        options={mapOptions}
      >
        {/* ここにマップ上に配置する他の要素を追加できる */}
      </GoogleMap>
    </LoadScript>
    </>
  );
}

export default MyGoogleMap;
