import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
// import reportWebVitals from './reportWebVitals';

import { initContracts, initConnected } from './Utils/init';

if (
    typeof window.ethereum !== 'undefined' &&
    window.ethereum.selectedAddress &&
    window.ethereum.isConnected()
) {
    initContracts()
        .then(() => {
            ReactDOM.render(
                <App />,
                document.querySelector('#root')
            )
        })
        .catch(console.error);
} else if (typeof window.ethereum === 'undefined') {
    ReactDOM.render(
        <App />,
        document.querySelector('#root')
    )
} else {
    initConnected()
        .then(() => {
            ReactDOM.render(
                <App />,
                document.querySelector('#root')
            )
        });
}

// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
