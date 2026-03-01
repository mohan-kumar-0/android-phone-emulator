import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Bluetooth, Moon, Flashlight, Battery, Settings, Plane, BellOff } from 'lucide-react';
import './NotificationShade.css';

const toggles = [
    { id: 'wifi', icon: <Wifi size={24} />, name: 'Wi-Fi', active: true },
    { id: 'bluetooth', icon: <Bluetooth size={24} />, name: 'Bluetooth', active: true },
    { id: 'flashlight', icon: <Flashlight size={24} />, name: 'Flashlight' },
    { id: 'dnd', icon: <BellOff size={24} />, name: 'Do not disturb' },
    { id: 'plane', icon: <Plane size={24} />, name: 'Aeroplane' },
    { id: 'dark', icon: <Moon size={24} />, name: 'Dark theme', active: true },
];

const NotificationShade = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="shade-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        className="shade-panel"
                        initial={{ y: -800 }}
                        animate={{ y: 0 }}
                        exit={{ y: -800 }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                    >
                        <div className="shade-header">
                            <span className="shade-time">20:21</span>
                            <div className="shade-actions">
                                <Settings size={20} />
                            </div>
                        </div>

                        <div className="toggles-grid">
                            {toggles.map((t) => (
                                <div key={t.id} className="toggle-item">
                                    <div className={`toggle-icon ${t.active ? 'active' : ''}`}>
                                        {t.icon}
                                    </div>
                                    <span>{t.name}</span>
                                </div>
                            ))}
                        </div>

                        <div className="brightness-slider">
                            <div className="slider-track">
                                <div className="slider-fill" style={{ width: '70%' }}></div>
                                <div className="slider-thumb" style={{ left: '70%' }}></div>
                            </div>
                        </div>

                        <div className="notifications-area">
                            <div className="notification">
                                <div className="noti-header">
                                    <div className="noti-app-icon"><Settings size={12} /></div>
                                    <span className="noti-app-name">System</span>
                                    <span className="noti-time">now</span>
                                </div>
                                <div className="noti-body">
                                    <p className="noti-title">System update available</p>
                                    <p className="noti-text">Android 15 is ready to install.</p>
                                </div>
                            </div>
                        </div>

                        <div className="shade-footer" onClick={onClose}>
                            <div className="handle-bar" />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default NotificationShade;
