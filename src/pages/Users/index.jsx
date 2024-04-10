import React from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import styles from "./Users.module.css";
import Header from '../../components/Header';

const AdminPage = () => {
    // Sample data for students and instructors
    const students = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ];

    const instructors = [
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com', verified: true },
        { id: 2, name: 'Bob Williams', email: 'bob@example.com', verified: false }
    ];

    const handleDeleteStudent = (studentId) => {
        // Implement logic to delete student
    };

    const handleDeleteInstructor = (instructorId) => {
        // Implement logic to delete instructor
    };

    const handleToggleVerification = (instructorId) => {
        // Implement logic to toggle instructor verification status
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
                                        <Button onClick={() => handleToggleVerification(instructor.id)}>
                                            {instructor.verified ? 'Unverify' : 'Verify'}
                                        </Button>
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
