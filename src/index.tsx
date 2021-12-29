import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ReportHandler } from 'web-vitals';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

(async (onPerfEntry?: ReportHandler) => {
	if (!onPerfEntry || !(onPerfEntry instanceof Function)) {
		return;
	}
	const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');
	getCLS(onPerfEntry);
	getFID(onPerfEntry);
	getFCP(onPerfEntry);
	getLCP(onPerfEntry);
	getTTFB(onPerfEntry);
})(/**
 * If you want to start measuring performance in your app, pass a function
 * to log results (for example: reportWebVitals(console.log))
 * or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
 **/);
