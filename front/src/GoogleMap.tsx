

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
  const addresses = [
    "東京都新宿区西新宿2-8-1",
    "東京都千代田区千代田1-1",
    "東京都港区芝公園4-2-8"
  ];
const MyGoogleMap = () => {
    const [positions, setPositions] = useState<google.maps.LatLngLiteral[]>([]);

    useEffect(() => {
      async function fetchCoordinates() {
        const newPositions = await Promise.all(addresses.map(async address => {
          return await getLatLng(address);
        }));
        setPositions(newPositions);
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
      {positions.map((position, index) => (
          <MarkerF key={index} position={position} />
        ))}
 
        {/* ここにマップ上に配置する他の要素を追加できる */}
      </GoogleMap>
    </LoadScript>
    </>
  );
}

export default MyGoogleMap;