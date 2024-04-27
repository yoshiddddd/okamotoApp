import { useNavigate, Link } from 'react-router-dom';
import React, { useState } from 'react';
import "./AddMap.css"
interface FormData {
  name: string;
  address: string;
  information: string;
  category: string;
  payment: string;
}

interface UserData {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

interface StoreData extends FormData {
  id: number;
  created_at: string;
  updated_at: string;
  user: UserData;
  user_id: number;
}

export const AddMap = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    address: '',
    information: '',
    category: '',
    payment: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 1000000);
    const dataToSubmit: StoreData = {
      ...formData,
      id: timestamp-randomNumber, // IDは仮にランダム生成（本来はサーバー側で生成されることが多い）
        // id:6,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user: {
        id: 1, // ユーザーIDは固定（本来は動的に設定）
        name: 'テスト',
        email: 'test@example.com',
        created_at: '2020-06-01T09:00:00Z',
        updated_at: new Date().toISOString(),
      },
      user_id: 1,
    };

    try {
      const response = await fetch('http://localhost:8080/stores/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });
      const result = await response.json();
      alert('送信成功しました');
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      alert('送信失敗');
    }
  };
  const [address, setAddress] = useState<string>('');

  const getLocation = (): void => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      setAddress("Geolocation is not supported by this browser.");
    }
  };

  const showPosition = (position: GeolocationPosition): void => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
  
    const geocoder = new google.maps.Geocoder();
    const latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({ 'location': latlng }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results && results[0]) {
          const formattedAddress = formatAddress(results[0].formatted_address);
          setFormData(prev => ({ ...prev, address: formattedAddress }));
        } else {
          setAddress("No results found");
        }
      } else {
        setAddress("Geocoder failed due to: " + status);
      }
    });
  };
  

  const showError = (error: GeolocationPositionError): void => {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          setAddress("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          setAddress("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          setAddress("The request to get user location timed out.");
          break;
        default:
          setAddress("An unknown error occurred.");
          break;
      }
    };
    function formatAddress(address: string): string {
        // 国名を削除（ここでは '日本、' を削除）
        let formatted = address.replace('日本、', '');
      
        // 郵便番号を削除（正規表現を使用して '〒' に続く数字を削除）
        formatted = formatted.replace(/〒\d{3}-\d{4}\s*/, '');
      
        return formatted;
      }

  return (
    <>
    <Link to="/" className='home'>HOME</Link>
    <form onSubmit={handleSubmit} className='add_form'>
    <p className='title'>お店を追加する</p>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        className='add_name'
        required
        placeholder="店名"
        />
    <button onClick={getLocation}>現在地を取得する</button>
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleInputChange}
        className='add_address'
        required
        placeholder="住所"
        />
      <input
        type="text"
        name="information"
        value={formData.information}
        onChange={handleInputChange}
        className='add_info'
        required
        placeholder="情報"
        />
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleInputChange}
        className='add_category'
        required
        placeholder="カテゴリ"
        />
      <input
        type="text"
        name="payment"
        value={formData.payment}
        onChange={handleInputChange}
        className='add_pay'
        required
        placeholder="支払い方法"
        />
      <button type="submit" className='add_submit'>送信</button>
    </form>
        </>
  );
};

export default AddMap;