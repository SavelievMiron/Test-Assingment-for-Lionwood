import React, {useState} from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import {Box, Button, TextField, Typography} from '@mui/material';
import axios from "axios";

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .max(32, 'Password should be of maximum 32 characters length')
        .required('Password is required'),
});

const LoginForm = () => {
    const [formMessage, setFormMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: ({email, password}, {setErrors}) => {
            setFormMessage('');

            axios.post('/api/login', {
                email,
                password
            })
                .then((response) => {
                    if (response.status === 204) {
                        window.location.href = '/dashboard';
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
                Login
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    fullWidth
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
                {
                    formMessage ? (
                        <Box>
                            <p style={{margin: '16px 0 0', color: 'red'}}>{formMessage}</p>
                        </Box>
                    ) : ''
                }
                <Button color="primary" variant="contained" fullWidth sx={{mt: 4}} type="submit">
                    Sign In
                </Button>
            </Box>
        </Box>
    );
};

export default LoginForm;