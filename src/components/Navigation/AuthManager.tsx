import React from 'react';
import MainApi from '../../api/MainApi';

const AuthManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    MainApi.initInstance();

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
};

export { AuthManager };