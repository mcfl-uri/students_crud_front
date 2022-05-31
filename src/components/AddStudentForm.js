import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button, Container, Paper} from "@mui/material";
import {useEffect, useState} from "react";

export default function AddStudentForm() {
    const paperStyle = {padding: '50px 20px', width: 600, margin: "20px auto"}
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [student, setStudent] = useState([])

    const submitForm = (e) => {
        e.preventDefault()
        const student = {name, email}
        console.log(student)
        fetch(
            "http://localhost:8080/student/add", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(student)
            }
        ).then(() => {
            console.log("Student added")
            window.location.reload(false);
        })
    }


    useEffect(() => {
        fetch("http://localhost:8080/student/all")
            .then(res => res.json())
            .then((res) => {
                setStudent(res);
            })
    }, [])
    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1>Add Student</h1>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': {m: 1},
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth value={name}
                               onChange={(e) => setName(e.target.value)}/>
                    <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth value={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                    <Button variant="contained" onClick={submitForm}>Submit</Button>
                </Box>
            </Paper>
            <h1>Students</h1>
            <Paper elevation={3} style={paperStyle}>
                {student.map(student => (
                    <Paper elevation={6} style={{margin: "10px", padding: "15px", textAlign: "left"}} key={student.id}>
                        Id: {student.id}<br/>
                        Name: {student.name}<br/>
                        Email: {student.email}
                    </Paper>
                ))}
            </Paper>
        </Container>
    );
}
