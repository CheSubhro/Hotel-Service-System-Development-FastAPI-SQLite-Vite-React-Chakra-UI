import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, ChakraProvider } from '@chakra-ui/react';
import ServiceForm from './components/ServiceForm';
import RequestList from './components/RequestList';
import api from './services/api';

function App() {
	const [requests, setRequests] = useState([]);

	const fetchRequests = async () => {
		try {
		const response = await api.get('/requests/');
		setRequests(response.data);
		} catch (error) {
		console.error("API Error:", error);
		}
	};

	useEffect(() => {
		fetchRequests();
		const interval = setInterval(fetchRequests, 5000);
		return () => clearInterval(interval);
	}, []);

	const sortedRequests = requests.sort((a, b) => {
		const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
		return priorityOrder[a.priority] - priorityOrder[b.priority];
	});

	return (
		<Router>
		<Box bg="gray.50" minH="100vh">
			<Routes>
			{/* Guest Portal: Standard URL for QR Code */}
			<Route 
				path="/" 
				element={
				<Box py={10} display="flex" justifyContent="center">
					<ServiceForm refreshData={fetchRequests} />
				</Box>
				} 
			/>

			{/* Staff Dashboard: Only accessible via /staff */}
			<Route 
				path="/staff" 
				element={
				<Box py={10} px={5}>
					<RequestList requests={sortedRequests} refreshData={fetchRequests} />
				</Box>
				} 
			/>
			</Routes>
		</Box>
		</Router>
	);
}

export default App;