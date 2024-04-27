import React from 'react';
interface LatLngAddress {
    id: number;
    lat: number;
    lng: number;
    infomation: string;
    // name: string;
   
  }
interface SelectedDetailProps {
  position: LatLngAddress;
}

const SelectedDetail: React.FC<SelectedDetailProps> = ({ position }) => {
  return (
    <div>
      <h2>{position.infomation}</h2>
      <p>ID: {position.id}</p>
      {/* 他の詳細情報を表示するコードを追加 */}
    </div>
  );
};

export default SelectedDetail;