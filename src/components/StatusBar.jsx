import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';
import './StatusBar.css';

const StatusBar = ({ time }) => {
    return (
        <div className="status-bar">
            <div className="status-left">
                <span className="time">{time}</span>
            </div>
            <div className="status-right">
                <Signal size={14} strokeWidth={2.5} />
                <Wifi size={14} strokeWidth={2.5} />
                <div className="battery-container">
                    <span className="battery-level">85%</span>
                    <Battery size={14} strokeWidth={2.5} />
                </div>
            </div>
        </div>
    );
};

export default StatusBar;
