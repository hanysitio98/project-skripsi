import AppRouter from 'App.router';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { axiosInstance } from 'setup';
import { scrambleJwt } from 'utils';
import './App.scss';

const App: React.FC<any> = () => {
  return (
    <>
      <AppRouter />
    </>
  );
}

// function App() {

//   const variables = {
//     "see_straight": "Lihat ke depan", "open_mouth": "Buka mulut", "look_left": "Lihat ke kiri", "look_right": "Lihat ke kanan", "look_top": "Lihat ke atas"
//   };
//   window.verihubs.setVariables(variables);
//   window.verihubs.setInstructions(["left", "right", "top"]);
//   window.verihubs.setTimeout(50000);
//   window.verihubs.setWait(1);
//   window.verihubs.setClientId("2fbca675-a10a-41bf-8714-62279f0310f7");
//   window.verihubs.setSecret("910b738f-5e35-414c-aaa5-f76ab1accfaf");


//   function callLiveness() {
//     window.verihubs.verifyLiveness();
//   }

//   function generateImageFromBase64(base64: any) {
//     const image = document.createElement('img');
//     image.id = 'verihubs-captured-image';
//     image.src = `data:image/png;base64, ${base64}`;
//     image.style.width = '300px';
//     image.style.height = 'auto';
//     return image;
//   }

//   function showImage(base64: any) {
//     const verihubsBase64 = document.querySelector('#verihubs-base64');
//     // const verihubsCaptureImage = document.querySelector('#verihubs-captured-image');
//     if (verihubsBase64 !== null) {
//       const image = generateImageFromBase64(base64);
//       const isExist = document.querySelector('#verihubs-captured-image') !==
//         null;
//       if (isExist) {
//         // verihubsCaptureImage?.replaceWith(image);
//         document.querySelector('#verihubs-captured-image')?.replaceWith(image);
//       } else {
//         verihubsBase64.append(image);
//       }
//     }
//   }

//   window.addEventListener('message', (data) => {
//     switch (data.data.status) {
//       case 200:
//         console.log("status: " + data.data.status);
//         console.log("signature: " + data.data.signature);
//         console.log("timestamp: " + data.data.timestamp);
//         console.log("error schema: " + data.data.error_schema);
//         console.log("output schema: " + data.data.output_schema);
//         showImage(data.data.base64String_1);
//         console.log("base64String: " + data.data.base64String_1);
//         window.verihubs.closeWindow();
//         alert('Verifikasi liveness berhasil!');
//         break;
//       case 408:
//         console.log(data.data.status);
//         console.log("error schema: " + data.data.error_schema);
//         window.verihubs.closeWindow();
//         alert('Verifikasi gagal dikarenakan timeout!');
//         break;
//       default:
//         console.log(data.data);
//         window.verihubs.closeWindow();
//         break;
//     }
//   })

//   const handleClick =
//     (e: any) => {
//       e.preventDefault();
//       callLiveness();
//     };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <button onClick={handleClick}>Test</button>
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//       </header>
//     </div>
//   );
// }

export default App;
