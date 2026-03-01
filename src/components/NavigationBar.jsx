import React from 'react';
import { ChevronLeft, Circle, Square } from 'lucide-react';
import './NavigationBar.css';

const NavigationBar = ({ onHome, onBack }) => {
    return (
        <div className="nav-bar">
            <button className="nav-btn" onClick={onBack}>
                <ChevronLeft size={24} />
            </button>
            <button className="nav-btn" onClick={onHome}>
                <Circle size={20} fill="currentColor" />
            </button>
            <button className="nav-btn">
                <Square size={18} />
            </button>
        </div>
    );
};

export default NavigationBar;
