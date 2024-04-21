

// import React from 'react';
import { useState ,useEffect} from 'react';
import { GoogleMap, InfoWindow, LoadScript,MarkerF } from '@react-google-maps/api';
import { Skeleton } from '@chakra-ui/react';

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
interface LatLngAddress {
    id: number;
    lat: number;
    lng: number;
    name: string;
    price: number;
  }
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
  const detailedAddresses = [
    {
      id: 1,
      address: "東京都新宿区西新宿2-8-1",
      name: "イタリアン",
      price: 10000
    },
    {
      id: 2,
      address: "東京都千代田区千代田1-1",
      name: "居酒屋",
      price: 100
    },
    {
      id: 3,
      address: "東京都港区芝公園4-2-8",
      name: "中華",
      price: 1000
    }
  ];
  interface Position {
    id: number;
    lat: number;
    lng: number;
    // name: string;
    // price: number;
  }
  

const MyGoogleMap = () => {
    const [positions, setPositions] = useState<LatLngAddress[]>([]);
    const [selectPosition , SetSelectPosition] = useState<LatLngAddress | null>(null);
    useEffect(() => {
        const fetchPositions = async () => {
          const promises = detailedAddresses.map(async (item): Promise<LatLngAddress> => {
            const latLng = await getLatLng(item.address);
            return {
              id: item.id,
              lat: latLng.lat,
              lng: latLng.lng,
              name: item.name,
              price: item.price
            };
          });
          const newPositions = await Promise.all(promises);
          setPositions(newPositions);
        };
    
        fetchPositions();
      }, []);

      const SelectedPosition = async (position: LatLngAddress)=> {
          
          await SetSelectPosition(position);
          console.log(selectPosition);
      }
    //   console.log(positions);
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
        <MarkerF key={position.id} position={position} onClick={()=> SelectedPosition(position)} />
        ))
        }
        {selectPosition&&(
            <InfoWindow
                position={{lat: selectPosition.lat,lng: selectPosition.lng}}
                onCloseClick={()=> SetSelectPosition(null)}

            >
                <div>
                    {selectPosition.name}
                    <br/>
                    {selectPosition.price}円
                </div>
            </InfoWindow>
        )}
        {/* ここにマップ上に配置する他の要素を追加できる */}
      </GoogleMap>
    </LoadScript>
    </>
  );
}

export default MyGoogleMap;
