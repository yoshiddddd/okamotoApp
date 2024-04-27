

// import React from 'react';
import { useState ,useEffect} from 'react';
import { GoogleMap, InfoWindowF, LoadScript,MarkerF } from '@react-google-maps/api';
import { Skeleton } from '@chakra-ui/react';
import "./Map.css";
const containerStyle = {
    width: '900px',        // コンテナの幅を設定
    height: '700px',       // コンテナの高さを設定
    border: '2px solid #0080ff', // 枠線を青で設定
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // 影を付ける
    borderRadius: '10px',  // 角の丸みを設定
    overflow: 'hidden' 
};

const center = {
  lat: 35.6905,
  lng: 139.6995
};
// const position = {
//     lat:  35.6995,
//     lng: 139.644
//   };
interface LatLngAddress {
    id: number;
    address: string;
    url: string;
    lat: number;
    lng: number;
    type: string;
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
      address: "東京都新宿区西新宿４丁目１４−７ 新宿パークサイド",
      url:'imge.png',
      type:"yellow",
      name: "ビストロ&バル ピコレ",
      price: 10000
    },
    {
      id: 2,
      address: "東京都新宿区西新宿2-8-2",
      url:'/imge.png',
      type: "red",
      name: "居酒屋",
      price: 100
    },
    {
      id: 3,
      address: "東東京都新宿区西新宿2-9-3",
      url:'/imge.png',
      type: "blue",
      name: "中華",
      price: 1000
    },
    {
        id: 4,
        address: "東京都新宿区西新宿2-10-1",
        url:'/imge.png',
        type: "green",
        name: "吉田",
        price: 1000
    },
    {
        id: 5,
        address: "東京都新宿区西新宿2-11-1",
        url:'/imge.png',
        type: "red",
        name: "okamoto",
        price: 1000
    },
    {
        id: 6,
        address: "東京都新宿区西新宿2-1-1",
        url:'/imge.png',
        type: "green",
        name: "hello",
        price: 1000
    },
    {
        id: 7,
        address: "東京都新宿区西新宿2-1-2",
        url:'/imge.png',
        type: "red",
        name: "hoge",
        price: 1000
    },

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
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectPosition , SetSelectPosition] = useState<LatLngAddress | null>(null);
    useEffect(() => {
        const fetchPositions = async () => {
          const promises = detailedAddresses.map(async (item): Promise<LatLngAddress> => {
            const latLng = await getLatLng(item.address);
            return {
              id: item.id,
              address: item.address,
              url: item.url,
              lat: latLng.lat,
              lng: latLng.lng,
              type: item.type,
              name: item.name,
              price: item.price
            };
          });
          const newPositions = await Promise.all(promises);
          setPositions(newPositions);
        };
        SetSelectPosition(null);
        fetchPositions();
      }, []);

      const SelectedPosition = async (position: LatLngAddress)=> {
          
          await SetSelectPosition(position);
          console.log(selectPosition);
      }
      const genreToColor: Record<string, string> = {
        red: '#FF0000', // 赤
        green: '#008000', // 緑
        yellow: '#FFFF00', // 黄色
        blue: '#0000FF' // 青
      };
// SVGアイコンを生成してURLエンコードする関数
const createSvgIcon = (color: string): string => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
      <path fill="${color}" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9s-1.12 2.5-2.5 2.5z"/>
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  };
  const filterMarkers = selectedType ? positions.filter(p => p.type === selectedType) : positions;
    //   console.log(positions);
    const handleInfoWindowClick = () => {
        // window.location.href = 'https://www.example.com'; // ここに遷移先のURLを設定
        alert("タッチした");
      };
  return (
    <>
    <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY!}>
      <div>
    {Object.keys(genreToColor).map(color => (
        <button key={color} 
                style={{ 
                    background: selectedType === color ? genreToColor[color] : '#BFC5CA', // 選択されたボタンだけ背景色を設定
                    color: selectedType === color ? '#FFFFFF' : genreToColor[color], // 他のボタンはジャンルの色を文字色にする
                    border: `1px solid ${genreToColor[color]}`, // 枠線もジャンルの色に合わせる
                    padding: '10px 20px',
                    borderRadius: '5px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    transition: 'background-color 0.3s, color 0.3s'
                }}
                className='selectButton'
                onClick={() => {setSelectedType(color); SetSelectPosition(null);}}>
            {color.toUpperCase()}
        </button>
    ))}
    <button onClick={() => {setSelectedType(null); SetSelectPosition(null)}}
            style={{ 
                background: selectedType === null ? 'gray' : '#FFFFFF', // "SHOW ALL"が選択されている場合に背景色を設定
                color: selectedType === null ? '#FFFFFF' : 'gray', // 未選択時は灰色の文字色
                border: '1px solid gray', // 枠線は灰色
                padding: '10px 20px',
                borderRadius: '5px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.3s, color 0.3s'
            }}
            >SHOW ALL
    </button>
</div>

    <div className='mapandDetail'>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}
        options={mapOptions}
      >
      {filterMarkers.map((position, index) => (
        <MarkerF key={position.id}
         position={position} 
         onClick={()=> SelectedPosition(position)}
         icon={{url:createSvgIcon(genreToColor[position.type])}} />
        ))
        }
        {selectPosition && selectPosition.lat && selectPosition.lng&&(
            <InfoWindowF
                position={{lat: selectPosition.lat,lng: selectPosition.lng}}
                onCloseClick={()=> SetSelectPosition(null)}
                
            >
                
                <div onClick={handleInfoWindowClick}>
                    {selectPosition.name}
                    <br/>
                    {selectPosition.price}円
                </div>
            </InfoWindowF>
        )}
        {/* ここにマップ上に配置する他の要素を追加できる */}
      </GoogleMap>
            {/* <img src={selectPosition?.url} /> */}
            {/* <img src='dog.jpeg' className='storeimg'/> */}
            <div className='detail'>{selectPosition?.address}</div>
    </div>
    </LoadScript>
    </>
  );
}

export default MyGoogleMap;
