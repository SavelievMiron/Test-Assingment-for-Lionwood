//REACT
import React from 'react';
import ReactDOM from 'react-dom';

//CUSTOM COMPONENTS
import RegistrationForm from './forms/RegistrationForm';
import {createRoot} from "react-dom/client";

class Registration extends React.Component {
    render() {
        return <RegistrationForm />;
    }
}

const rootElement = document.getElementById("register-form");

if (rootElement !== null) {
    const root = createRoot(rootElement);

    root.render(
        <Registration />
    );
}
