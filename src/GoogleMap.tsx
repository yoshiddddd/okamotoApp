

// import React from 'react';
import { useState ,useEffect} from 'react';
import { GoogleMap, LoadScript,MarkerF } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '600px'
    
};

const center = {
  lat: 35.6995,
  lng: 139.6363
};
// const position = {
//     lat:  35.6995,
//     lng: 139.644
//   };

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
  const getLatLng = async (address: string): Promise<google.maps.LatLngLiteral> => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyBYvFpfWrAo1nt1h-Ojt7Tl06hnteXAgPk`);
    const data = await response.json();
    return data.results[0].geometry.location;
  }
  
const MyGoogleMap = () => {
    const [position, setPosition] = useState<google.maps.LatLngLiteral | null>(null);
    useEffect(() => {
        async function fetchCoordinates() {
          const coords = await getLatLng("東京都杉並区善福寺1-9-34");
          setPosition(coords);
        }
    
        fetchCoordinates();
      }, []);
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
       {position && <MarkerF position={position} onClick={() => alert('Marker Clicked!')} />}
 
        {/* ここにマップ上に配置する他の要素を追加できる */}
      </GoogleMap>
    </LoadScript>
    </>
  );
}

export default MyGoogleMap;
