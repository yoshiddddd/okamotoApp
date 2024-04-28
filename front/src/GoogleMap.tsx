

import { useState ,useEffect} from 'react';
import { GoogleMap, InfoWindowF,MarkerF } from '@react-google-maps/api';
import { Link } from 'react-router-dom';  
import  SelectedDetail  from './SelectedDetail';
import data from './data.json'
import "./GoogleMap.css";

const containerStyle = {
    width: '900px',        
    height: '700px',       
    border: '4px solid #C0C0C0', 
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
    borderRadius: '10px',  
    overflow: 'hidden',
    margin: '15px',
    
    
};

const center = {
    lat: 35.6907,
    lng: 139.695
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
    ]
};
const getLatLng = async (address: string): Promise<google.maps.LatLngLiteral> => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyBYvFpfWrAo1nt1h-Ojt7Tl06hnteXAgPk`);
    const data = await response.json();
    return data.results[0].geometry.location;
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
interface LatLngAddress {
    id: number;
    lat: number;
    lng: number;
    infomation: string;
    name: string;
    category: string;
    payment: string;
}

export const MyGoogleMap = () => {
    const [positions, setPositions] = useState<LatLngAddress[]>([]);
    const [selectPosition , SetSelectPosition] = useState<LatLngAddress | null>(null);
	const [form,setForm] = useState<Form[]>([]);
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
                const promises = data.map(async (item) => {
                    const latLng = await getLatLng(item.address);
                    console.log(latLng);
                    return {
                        id: item.id,
                        lat: latLng.lat,
                        lng: latLng.lng,
                        infomation: item.information,
                        name: item.name,
                        category: item.category,
                        payment: item.payment
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
    const iconUrl = (category: string): string => {
        switch (category) {
          case 'restran':
            return 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
          case 'market':
            return 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
          case 'untiku':
            return 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
          default:
            return 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';  // デフォルトの色
        }
      };
      const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
      const filteredPositions = positions.filter(position => {
        return selectedCategory ? position.category === selectedCategory : true;
      });
  return (
    //各種りんく
    <>
    <div className='button'>
    <button onClick={() => setSelectedCategory('restran')} className='blue-pin'>レストラン</button>
      <button onClick={() => setSelectedCategory('market')} className='green-pin'>スーパー</button>
      <button onClick={() => setSelectedCategory('untiku')} className='yellow-pin'>雑談</button>
      <button onClick={() => setSelectedCategory(null)} className='all-pin'>すべて表示</button>

    <Link to="/addmap" className='addpagebutton'> 投稿</Link>
    </div>
    <div className='mapandDetail'>
     {isScriptLoaded&&( <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}
        options={mapOptions}
      >
      {
      filteredPositions.map((position, index) => (
        <MarkerF key={position.id} position={position} onClick={()=> SelectedPosition(position)}
        icon={{
            url: iconUrl(position.category),  // アイコンURLを設定
          }}
        />
        ))
        }
        {selectPosition&&(
            <InfoWindowF
                position={{lat: selectPosition.lat,lng: selectPosition.lng}}
                onCloseClick={()=> SetSelectPosition(null)}

            >
                <div>
                    {selectPosition.name}
                </div>
        </InfoWindowF>
         )} 

{/* {currentPosition && (
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
            )} */}
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
