
import React, { useState } from 'react';
import { Box, Button, Input, Select, VStack, useToast, Heading, Text } from '@chakra-ui/react';
import api from '../services/api';
import { useLocation } from 'react-router-dom';

const ServiceForm = ({ refreshData }) => {
    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialRoom = queryParams.get('room') || '';
    const [room, setRoom] = useState(initialRoom);
    const [service, setService] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useToast();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // POST request to FastAPI backend
            await api.post('/requests/', {
                room_number: room,
                service_type: service
            });

            toast({
                title: 'Request Sent!',
                description: `Room ${room} has requested ${service}.`,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            setRoom('');
            setService('');
            refreshData(); // Refresh the list after success
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Could not send request to server.',
                status: 'error',
                duration: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box p={6} border="1px" borderColor="gray.200" borderRadius="lg" bg="white" boxShadow="sm">
            <VStack spacing={4} as="form" onSubmit={handleSubmit}>
                <Heading size="md" color="teal.600">Guest Service Portal</Heading>
                <Text fontSize="sm" color="gray.500">Submit your room service request below.</Text>
                
                <Input 
                    placeholder="Enter Room Number" 
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    required
                />
                
                <Select 
                    placeholder="Select Service Type" 
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    required
                >
                    <option value="Cleaning">Cleaning</option>
                    <option value="Water">Water Bottle</option>
                    <option value="Food">Room Service (Food)</option>
                    <option value="Laundry">Laundry</option>
                    <option value="Emergency">Emergency</option>
                </Select>

                <Button 
                    colorScheme="teal" 
                    width="full" 
                    type="submit" 
                    isLoading={loading}
                >
                    Submit Request
                </Button>
            </VStack>
        </Box>
    );
};

export default ServiceForm;