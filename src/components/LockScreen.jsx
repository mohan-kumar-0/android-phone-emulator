import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import './LockScreen.css';

const LockScreen = ({ onUnlock, time }) => {
    return (
        <motion.div
            className="lock-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ y: -800, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            onClick={onUnlock}
        >
            <div className="lock-content">
                <div className="lock-clock">
                    <h1 className="big-time">{time}</h1>
                    <p className="date">Sunday, March 1</p>
                </div>

                <div className="lock-notifications">
                    {/* Mock notification icons */}
                    <div className="noti-dot" />
                    <div className="noti-dot" />
                </div>

                <div className="unlock-prompt">
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <Lock size={20} />
                    </motion.div>
                    <p>Swipe up to unlock</p>
                </div>
            </div>
        </motion.div>
    );
};

export default LockScreen;
