//REACT
import React from 'react';
import { createRoot } from "react-dom/client";

//CUSTOM COMPONENTS
import LoginForm from './forms/LoginForm';

class Login extends React.Component {
    render() {
        return <LoginForm />;
    }
}

const rootElement = document.getElementById("login-form");

if (rootElement !== null) {
    const root = createRoot(rootElement);

    root.render(
        <Login />
    );
}

