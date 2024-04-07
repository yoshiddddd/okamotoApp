import { useJsApiLoader } from "@react-google-maps/api";

// 環境変数からGoogle Maps APIキーを取得する
const MAP_TOKEN = process.env.googleAPI as string;

type Props = {
  defaultPosition: { lat: number; lng: number };
};

export const useMap = ({ defaultPosition }: Props) => {
  // MAP_TOKEN (環境変数からのAPIキー) を useJsApiLoader に渡す
  const { isLoaded } = useJsApiLoader({
    id: "google-map",
    googleMapsApiKey: MAP_TOKEN // ここでAPIキーを指定
  });

  const onLoad = (map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(defaultPosition);
    map.fitBounds(bounds);
  };

  return { isLoaded, onLoad };
};
