
import React from 'react';
import { 
  Table, Thead, Tbody, Tr, Th, Td, Badge, Button, Box, Heading, Text, Flex 
} from '@chakra-ui/react';
import { formatDistanceToNow } from 'date-fns'; // Time ago logic
import api from '../services/api';

const RequestList = ({ requests, refreshData }) => {
  
    const handleUpdateStatus = async (id, currentStatus) => {
        try {
            const newStatus = currentStatus === "Pending" ? "Completed" : "Pending";
            await api.patch(`/requests/${id}?status=${newStatus}`);
            refreshData();
        } catch (error) {
            console.error("Update failed", error);
        }
    };

    return (
        <Box p={8} bg="white" borderRadius="xl" boxShadow="2xl" border="1px" borderColor="gray.100">
        <Flex justify="space-between" align="center" mb={6}>
            <Heading size="lg" color="teal.700">Staff Control Panel</Heading>
            <Badge fontSize="1em" p={2} borderRadius="full" colorScheme="blue">
            Live Requests: {requests.length}
            </Badge>
        </Flex>

        <Table variant="simple">
            <Thead bg="gray.50">
            <Tr>
                <Th>Room No.</Th>
                <Th>Service Requested</Th>
                <Th>Time Received</Th>
                <Th>Status</Th>
                <Th textAlign="center">Actions</Th>
            </Tr>
            </Thead>
            <Tbody>
            {requests.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((req) => (
                <Tr key={req.id}>
                <Td fontWeight="bold" fontSize="lg">#{req.room_number}</Td>
                <Td fontSize="md">{req.service_type}</Td>
                <Td color="gray.500">
                    {formatDistanceToNow(new Date(req.created_at), { addSuffix: true })}
                </Td>
                <Td>
                    <Badge 
                    px={3} py={1} borderRadius="full"
                    colorScheme={req.status === "Pending" ? "orange" : "green"}
                    >
                    {req.status}
                    </Badge>
                </Td>
                <Td textAlign="center">
                    <Button 
                    colorScheme={req.status === "Pending" ? "teal" : "gray"}
                    size="sm"
                    onClick={() => handleUpdateStatus(req.id, req.status)}
                    >
                    {req.status === "Pending" ? "Mark Done" : "Re-open"}
                    </Button>
                </Td>
                </Tr>
            ))}
            </Tbody>
        </Table>
        </Box>
    );
};

export default RequestList;