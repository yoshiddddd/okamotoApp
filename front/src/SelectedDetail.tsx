import React ,{ useState }from 'react';
import gazou from './guranarda.jpeg'
import "./SelectedDetail.css"
interface LatLngAddress {
    id: number;
    lat: number;
    lng: number;
    infomation: string;
    name: string;
   
  }
interface SelectedDetailProps {
  position: LatLngAddress;
}

const SelectedDetail: React.FC<SelectedDetailProps> = ({ position }) => {



  return (
    <>

    <div className='fade-in'>
      <h2 className='name'>NAME : {position.name}</h2>
      <p className='info'>INFO : {position.infomation}</p>
      <img src={gazou } className='image'></img>
      {/* 他の詳細情報を表示するコードを追加 */}
    </div>
    </>
  );
};

export default SelectedDetail;