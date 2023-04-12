import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {Box, Button, TextField, Typography} from '@mui/material';
import axios from "axios";

const validationSchema = yup.object({
    firstName: yup
        .string('Enter your last name')
        .required('First name is required'),
    lastName: yup
        .string('Enter your last name')
        .required('Last name is required'),
    username: yup
        .string('Enter your username')
        .required('Username is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .required('Password is required'),
    confirmPassword: yup
        .string('Enter password confirmation')
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Password confirmation is required')
});

const RegistrationForm = () => {
    const [formMessage, setFormMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: validationSchema,
        onSubmit: ({firstName, lastName, username, email, password, confirmPassword}) => {
            axios.post('/api/register', {
                first_name: firstName,
                last_name: lastName,
                username,
                email,
                password,
                password_confirmation: confirmPassword
            })
                .then((response) => {
                    if (response.status === 201) {
                        setFormMessage(response.data.message)
                    }
                }, (error) => {
                    if (error.response.data.hasOwnProperty('message')) {
                        setFormMessage(error.response.data.message)
                    }
                });
        },
    });

    return (
        <Box
            sx={{
                margin: "64px auto 0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: "560px"
            }}
        >
            <Typography component="h1" variant="h5" sx={{mb: 4}}>
                Registration
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    fullWidth
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                />
                <TextField
                    fullWidth
                    sx={{mt: 2}}
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                />
                <TextField
                    fullWidth
                    sx={{mt: 2}}
                    id="username"
                    name="username"
                    label="Username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                />
                <TextField
                    fullWidth
                    sx={{mt: 2}}
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    fullWidth
                    sx={{mt: 2}}
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <TextField
                    fullWidth
                    sx={{mt: 2}}
                    id="password_confirmation"
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />
                {
                    formMessage ? (
                        <Box>
                            <p style={{margin: '16px 0 0', color: 'green'}}>{formMessage}</p>
                        </Box>
                    ) : ''
                }
                <Button color="primary" variant="contained" fullWidth sx={{mt: 4}} type="submit">
                    Sign Up
                </Button>
            </Box>
        </Box>
    );
};

export default RegistrationForm;