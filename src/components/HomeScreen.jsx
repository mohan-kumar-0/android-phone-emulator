import React from 'react';
import { motion } from 'framer-motion';
import { Chrome, Settings, Calculator, Camera, Play, Mail, MessageSquare, Phone } from 'lucide-react';
import './HomeScreen.css';

const apps = [
    { id: 'chrome', name: 'Chrome', icon: <Chrome size={28} />, color: '#4285F4' },
    { id: 'settings', name: 'Settings', icon: <Settings size={28} />, color: '#5F6368' },
    { id: 'calculator', name: 'Calculator', icon: <Calculator size={28} />, color: '#1B73E8' },
    { id: 'camera', name: 'Camera', icon: <Camera size={28} />, color: '#000000' },
    { id: 'play', name: 'Play Store', icon: <Play size={28} />, color: '#00E676' },
    { id: 'mail', name: 'Gmail', icon: <Mail size={28} />, color: '#EA4335' },
    { id: 'messages', name: 'Messages', icon: <MessageSquare size={28} />, color: '#1A73E8' },
    { id: 'phone', name: 'Phone', icon: <Phone size={28} />, color: '#34A853' },
];

const HomeScreen = ({ onOpenApp }) => {
    return (
        <div className="home-screen">
            <div className="search-bar-container">
                <div className="search-bar">
                    <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google" height="18" />
                </div>
            </div>

            <div className="app-grid">
                {apps.slice(0, 16).map((app, index) => (
                    <motion.div
                        key={app.id}
                        className="app-icon-wrapper"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onOpenApp(app.id)}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <div className="app-icon" style={{ backgroundColor: app.color }}>
                            {app.icon}
                        </div>
                        <span className="app-name">{app.name}</span>
                    </motion.div>
                ))}
            </div>

            <div className="dock">
                {apps.slice(4, 8).map((app) => (
                    <div key={app.id} className="app-icon-wrapper" onClick={() => onOpenApp(app.id)}>
                        <div className="app-icon" style={{ backgroundColor: app.color }}>
                            {app.icon}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeScreen;
