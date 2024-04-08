// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// import { Box, ChakraProvider, Heading, Stack, Text } from "@chakra-ui/react";
// import GoogleMap from './GoogleMap';
// function App() {
//   return (
//     <ChakraProvider>
//     <>
//       <Stack
//         as={Box}
//         textAlign={"center"}
//         spacing={{ base: 4 }}
//         py={{ base: 6 }}
//       >
//         <Heading
//           fontWeight={600}
//           fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
//           lineHeight={"1.2"}
//         >
//           Google Map
//           <Text as={"span"} color={"green.400"} marginLeft={4}>
//             React
//           </Text>
//         </Heading>
//       </Stack>
//       <GoogleMap
//         defaultPosition={{
//           lat: 35.69079374035866,
//           lng: 139.76594718293336,
//         }}
//       />
//     </>
//   </ChakraProvider>
//       );
// }

// export default App;


import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '500px'
};

const center = {
  lat: 35.6995,
  lng: 139.6363
};

const MyGoogleMap = () => {
  return (
    <>
    <h1>OKAMOTOAPP</h1>
    <LoadScript
      googleMapsApiKey="AIzaSyBYvFpfWrAo1nt1h-Ojt7Tl06hnteXAgPk"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
      >
        {/* ここにマップ上に配置する他の要素を追加できる */}
      </GoogleMap>
    </LoadScript>
    </>
  );
}

export default MyGoogleMap;
