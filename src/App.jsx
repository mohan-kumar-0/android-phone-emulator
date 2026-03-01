import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PhoneFrame from './components/PhoneFrame';
import LockScreen from './components/LockScreen';
import HomeScreen from './components/HomeScreen';
import StatusBar from './components/StatusBar';
import NavigationBar from './components/NavigationBar';
import NotificationShade from './components/NotificationShade';
import './App.css';

function App() {
  const [isLocked, setIsLocked] = useState(true);
  const [activeApp, setActiveApp] = useState(null);
  const [isShadeOpen, setIsShadeOpen] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleUnlock = () => {
    setIsLocked(false);
  };

  const handleOpenApp = (appId) => {
    setActiveApp(appId);
  };

  const handleGoHome = () => {
    setActiveApp(null);
    setIsShadeOpen(false);
  };

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <div className="app-container">
      <PhoneFrame>
        {/* Status Bar is always visible at the top */}
        <StatusBar time={formattedTime} />
        
        <div className="screen-content">
          <AnimatePresence mode="wait">
            {isLocked ? (
              <LockScreen key="lock" onUnlock={handleUnlock} time={formattedTime} />
            ) : (
              <motion.div
                key="system"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="system-container"
              >
                <HomeScreen onOpenApp={handleOpenApp} />
                
                {/* Active App Layer */}
                <AnimatePresence>
                  {activeApp && (
                    <motion.div
                      initial={{ scale: 0.1, y: 500, opacity: 0 }}
                      animate={{ scale: 1, y: 0, opacity: 1 }}
                      exit={{ scale: 0.1, y: 500, opacity: 0 }}
                      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                      className="app-window"
                    >
                      <div className="app-content">
                        {/* Render app based on appId */}
                        {activeApp === 'settings' && <SettingsApp />}
                        {activeApp === 'chrome' && <ChromeApp />}
                        {activeApp === 'calculator' && <CalculatorApp />}
                        {activeApp === 'camera' && <CameraApp />}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Notification Shade Layer */}
                <NotificationShade isOpen={isShadeOpen} onClose={() => setIsShadeOpen(false)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Bar at the bottom */}
        {!isLocked && <NavigationBar onHome={handleGoHome} onBack={handleGoHome} />}

        {/* Swipe zones for gesture simulation */}
        <div className="shade-handle" onMouseDown={() => setIsShadeOpen(true)} />
      </PhoneFrame>
    </div>
  );
}

// Simple Placeholder Apps (will move to separate files later)
const SettingsApp = () => (
  <div className="app-page settings">
    <h2>Settings</h2>
    <div className="settings-list">
      <div className="setting-item">Display</div>
      <div className="setting-item">Network</div>
      <div className="setting-item">About Phone</div>
    </div>
  </div>
);

const ChromeApp = () => (
  <div className="app-page chrome">
    <div className="address-bar">google.com</div>
    <div className="browser-content">
      <h1>Google</h1>
      <input type="text" placeholder="Search..." />
    </div>
  </div>
);

const CalculatorApp = () => (
  <div className="app-page calculator">
    <h2>Calculator</h2>
    <div className="calc-display">0</div>
    <div className="calc-grid">
      {[1,2,3,'+',4,5,6,'-',7,8,9,'*',0,'C','=','/'].map(btn => (
        <button key={btn}>{btn}</button>
      ))}
    </div>
  </div>
);

const CameraApp = () => (
  <div className="app-page camera">
    <div className="camera-view">
      <div className="shutter"></div>
    </div>
  </div>
);

export default App;
