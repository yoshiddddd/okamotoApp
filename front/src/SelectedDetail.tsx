import React ,{ useState }from 'react';
import gazou from './soba.jpeg'
import "./SelectedDetail.css"
import "./DeleteMap"
interface LatLngAddress {
    id: number;
    lat: number;
    lng: number;
    infomation: string;
    name: string;
    payment: string;
   
  }
interface SelectedDetailProps {
  position: LatLngAddress;
  onDelete:() => void;
}

const SelectedDetail: React.FC<SelectedDetailProps> = ({ position, onDelete }) => {
    const handleDelete = async () => {
        const confirmed = window.confirm('本当にデータを削除しますか?');
        if(confirmed){
        try {
          // APIを介してデータを削除する処理をここに記述する
          const response = await fetch(`http://localhost:8080/stores/delete/${position.id}`, {
            method: 'DELETE',
          });
    
          if (response.ok) {
            // 削除に成功した場合の処理
            onDelete();
            alert('データを削除しました');
            
          } else {
            // 削除に失敗した場合の処理
            alert('データの削除に失敗しました');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('エラーが発生しました');
        }
      }};
  return (
    <>

    <div className='fade-in'>
      <h2 className='name'> {position.name}</h2>
      <p className='info'>INFO : {position.infomation}</p>
      <p className='pay'>支払い方法 : {position.payment}</p>
      <img src={gazou } className='image'></img>
      <button onClick={handleDelete} className='deletebtn'>Delete</button>
      {/* 他の詳細情報を表示するコードを追加 */}
    </div>
    </>
  );
};

export default SelectedDetail;