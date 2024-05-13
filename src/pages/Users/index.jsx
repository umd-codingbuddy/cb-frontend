import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import styles from "./Users.module.css";
import Header from '../../components/Header';
import { sampleData } from '../../utils/mockData';
import { useSearchParams } from 'react-router-dom';
import backendCall from '../../utils/network';
import { useAuth } from '../../hooks/useAuth';

const AdminPage = () => {
    const [students, setStudents] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const { user } = useAuth();

    const fetchUsers = async () => {
        const token = user.token;  // Use the user's token

        // Setting up the Authorization header with the token
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        try {
            const response = await backendCall.get('/api/v1/user/getUsers', config);
            // Process your response here
            console.log('Students:', response.data.students);
            console.log('Instructors:', response.data.instructors);
            setStudents(response.data.students);
            setInstructors(response.data.instructors);
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;  // Rethrowing the error for further handling if needed
        }
    }

    useEffect(() => {
        //TODO: implement delete logic
        fetchUsers();

    }, []);

    const deleteUser = async (userId) => {
        const token = user.token;  // Use the user's token as configured

        // Setting up the Authorization header with the token
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        try {
            const response = await backendCall.delete(`/api/v1/user/deleteUser/${userId}`, config);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;  // Rethrowing the error for further handling if needed
        }
    }


    const handleDeleteStudent = (studentId) => {
        deleteUser(studentId);
    };

    const handleDeleteInstructor = (instructorId) => {
        deleteUser(instructorId);
    };

    const verifyInstructor = async (instructorId) => {
        const token = user.token;  // Using user.token as per your preference

        // Setting up the Authorization header with the token
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        try {
            const response = await backendCall.put(`/api/v1/user/verifyInstructor/${instructorId}`, {}, config);
            fetchUsers();
        } catch (error) {
            console.error('Error verifying instructor:', error);
            throw error;  // Rethrowing the error for further handling if needed
        }
    }

    const handleToggleVerification = (instructorId) => {
        verifyInstructor(instructorId)
    };

    return (
        <>
            <Header />
            <Container className={styles.container}>
                <Typography variant="h4" gutterBottom>
                    Students
                </Typography>
                <TableContainer component={Paper} className={styles.tableContainer}>
                    <Table className={styles.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={styles.headerCell}>Name</TableCell>
                                <TableCell className={styles.headerCell}>Email</TableCell>
                                <TableCell className={styles.headerCell}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>{student.email}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleDeleteStudent(student.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Typography variant="h4" gutterBottom>
                    Instructors
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Verified</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {instructors.map((instructor) => (
                                <TableRow key={instructor.id}>
                                    <TableCell>{instructor.name}</TableCell>
                                    <TableCell>{instructor.email}</TableCell>
                                    <TableCell>
                                        {instructor.verified ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                                    </TableCell>
                                    <TableCell>
                                        {
                                            !instructor.verified &&
                                            <Button onClick={() => handleToggleVerification(instructor.id)}>
                                                Verify
                                            </Button>
                                        }

                                        <IconButton onClick={() => handleDeleteInstructor(instructor.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>

    );
};

export default AdminPage;
