import React from 'react';
import './PhoneFrame.css';

const PhoneFrame = ({ children }) => {
    return (
        <div className="phone-wrapper">
            <div className="phone-body">
                <div className="phone-screen">
                    <div className="camera-punch"></div>
                    {children}
                </div>
                <div className="side-button power"></div>
                <div className="side-button volume-up"></div>
                <div className="side-button volume-down"></div>
            </div>
        </div>
    );
};

export default PhoneFrame;
