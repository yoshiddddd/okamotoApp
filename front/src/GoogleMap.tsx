

// import React from 'react';
import { useState ,useEffect,useCallback} from 'react';
import { GoogleMap, InfoWindowF, LoadScript,MarkerF } from '@react-google-maps/api';
import { Skeleton } from '@chakra-ui/react';
import { useNavigate,Link } from 'react-router-dom';  
import  SelectedDetail  from './SelectedDetail';
import "./GoogleMap.css";
const containerStyle = {
    width: '900px',        // コンテナの幅を設定
    height: '900px',       // コンテナの高さを設定
    border: '4px solid #C0C0C0', // 枠線を青で設定
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // 影を付ける
    borderRadius: '10px',  // 角の丸みを設定
    overflow: 'hidden'
    
};

const center = {
    lat: 35.6907,
    lng: 139.695
};
interface LatLngAddress {
    id: number;
    lat: number;
    lng: number;
    infomation: string;
    name: string;
   
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
    name: string;
    // price: number;
  }
  interface Form{
	id: number;
    name: string;
    address: string;
	category: string;
    created_at:string;
	PhoneNumber: string;
    information:string;
  }

export const MyGoogleMap = () => {
    const [positions, setPositions] = useState<LatLngAddress[]>([]);
    const [selectPosition , SetSelectPosition] = useState<LatLngAddress | null>(null);
	const [form,setForm] = useState<Form[]>([]);
    const navigate = useNavigate();
    const [currentPosition, setCurrentPosition] = useState<google.maps.LatLngLiteral | null>(null);
    const [watchId, setWatchId] = useState<number | null>(null);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    useEffect(() => {
      let isSubscribed = true;
  
      const checkScriptLoaded = () => {
        const isGoogleMapsScriptLoaded = window.google && window.google.maps;
        if (isGoogleMapsScriptLoaded && isSubscribed) {
          setIsScriptLoaded(true);
        } else {
          setTimeout(checkScriptLoaded, 200);
        }
      };
      checkScriptLoaded();
      return () => {
        isSubscribed = false;
      };
    }, []);

    const reloadPage = () => {
        window.location.reload();
      };

	useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/stores');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setForm(data); // ここでformを更新
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };
        fetchData();
    }, []);
    
    useEffect(() => {
        if (form.length > 0) { // formが空ではないことを確認
            const fetchPositions = async () => {
                const promises = form.map(async (item) => {
                    const latLng = await getLatLng(item.address);
                    console.log(latLng);
                    return {
                        id: item.id,
                        lat: latLng.lat,
                        lng: latLng.lng,
                        infomation: item.information,
                        name: item.name
                    };
                });
                const newPositions = await Promise.all(promises);
                setPositions(newPositions);
            };
            fetchPositions();
        }
    }, [form]); // formが更新された時にこのuseEffectをトリガー
    
    useEffect(() => {
        const successCallback = (position: GeolocationPosition) => {
          const currentLatLng: google.maps.LatLngLiteral = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentPosition(currentLatLng);
        };
    
        const errorCallback = (error: GeolocationPositionError) => {
          console.error('Error getting current location:', error);
        };
    
        const watchId = navigator.geolocation.watchPosition(successCallback, errorCallback);
        setWatchId(watchId);
    
        return () => {
          if (watchId !== null) {
            navigator.geolocation.clearWatch(watchId);
          }
        };
      }, []);

      const SelectedPosition = async (position: LatLngAddress)=> {
          await SetSelectPosition(position);
          console.log(selectPosition);
      }
    //   console.log(positions);
  
  return (
    //各種りんく
    <>
    
    <Link to="/addmap" className='addpagebutton'> 投稿</Link>

    <div className='mapandDetail'>
     {isScriptLoaded&&( <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}
        options={mapOptions}
      >
      {
      positions.map((position, index) => (
        <MarkerF key={position.id} position={position} onClick={()=> SelectedPosition(position)} />
        ))
        }
        {selectPosition&&(
            <InfoWindowF
                position={{lat: selectPosition.lat,lng: selectPosition.lng}}
                onCloseClick={()=> SetSelectPosition(null)}

            >
                <div>
                    {selectPosition.name}
                    <br/>
                    ID: {selectPosition.id}
                </div>
        </InfoWindowF>
         )} 

{currentPosition && (
              <MarkerF
                position={currentPosition}
                icon={{
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 12,
                    fillColor: '#4285F4', // 青色の16進数カラーコード
                    fillOpacity: 1,
                    strokeColor: '#FFFFFF', // 白色の境界線
                    strokeWeight: 2,
                  }}
                title="現在地"
              />
            )}
      </GoogleMap>)}
      <div className='detail'>
      {selectPosition && <SelectedDetail key={selectPosition.id} position={selectPosition} onDelete={reloadPage} />}
      </div>
      <div>
        {
           
        }
      </div>
    </div>
    </>
  );
}

export default MyGoogleMap;
