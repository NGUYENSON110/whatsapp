import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
// import reportWebVitals from './reportWebVitals';
import Sidebar from './components/sidebar/sidebar';
import DetailsConversation from './components/detailsConversation/detailsConversation';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Sidebar />} />
        <Route path="/conversation" element={<DetailsConversation />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

{/* <Routes>
//         <Route exact path="/" component={Sidebar} />
//         <Route path="/conversation" component={DetailsConversation} />
//     </Routes> */}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
