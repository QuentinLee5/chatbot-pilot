import logo from './chatbotlogo.jpeg'
import './App.css';
import React, { useState, useEffect } from 'react';

import { Widget, addResponseMessage, toggleWidget } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';
import apiCall from './apiCall';

function makeid(length) {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() *
			charactersLength));
	}
	return result;
}

const timer = ms => new Promise(res => setTimeout(res, ms))
const IP = "147.182.233.199";
const PORT = process.env.PORT || 5005;
function App() {
	const [userId, setUserId] = useState(`user_${makeid(5)}`);
	useEffect(() => {
		addResponseMessage('Hallo, ik ben Suzy, de digitale assistent van Waterbedrijf Groningen. Ik zal uw vraag zo goed mogelijk beantwoorden. Waarmee kan ik u helpen?');
		toggleWidget();
	}, []);
	const handleNewUserMessage = (newMessage) => {
		const makeCall = async () => {
			const data = {
				"sender": userId,  // sender ID of the user sending the message
				"message": newMessage
			}
			const res = await apiCall(`http://${IP}:${PORT}/webhooks/rest/webhook`, 'POST', data);

			const messageLoop = async () => {
				for (const message of res) {
					addResponseMessage(message.text);
					await timer(500)
				}
			}
			messageLoop();
		}
		makeCall();
		// Now send the message throught the backend API
	};

	return (
		<div className="App">
			<Widget
				handleNewUserMessage={handleNewUserMessage}
				profileAvatar={logo}
				fullScreenMode={true}
				title="Klantenservice WGB"
				subtitle="Stel hier uw vraag om zo snel mogelijk geholpen te worden"
			/>
		</div>
	);
}

export default App;
