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
                        {activeApp === 'mail' && <MailApp />}
                        {activeApp === 'messages' && <MessagesApp />}
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

// Functional Apps
const SettingsApp = () => (
  <div className="app-page settings">
    <div className="app-header">
      <h2>Settings</h2>
    </div>
    <div className="settings-list">
      <div className="setting-item">
        <div className="setting-icon blue">🌐</div>
        <div className="setting-text">
          <p>Network & Internet</p>
          <span>Wi-Fi, Mobile, Data usage</span>
        </div>
      </div>
      <div className="setting-item">
        <div className="setting-icon green">📱</div>
        <div className="setting-text">
          <p>Connected devices</p>
          <span>Bluetooth, Pairing</span>
        </div>
      </div>
      <div className="setting-item">
        <div className="setting-icon purple">🎨</div>
        <div className="setting-text">
          <p>Display</p>
          <span>Wallpaper, Sleep, Font size</span>
        </div>
      </div>
      <div className="setting-item">
        <div className="setting-icon orange">🔋</div>
        <div className="setting-text">
          <p>Battery</p>
          <span>85% - Should last until 11:00 PM</span>
        </div>
      </div>
    </div>
  </div>
);

const ChromeApp = () => (
  <div className="app-page chrome">
    <div className="address-bar">google.com</div>
    <div className="browser-content">
      <div className="google-logo">
        <span style={{ color: '#4285F4' }}>G</span>
        <span style={{ color: '#EA4335' }}>o</span>
        <span style={{ color: '#FBBC05' }}>o</span>
        <span style={{ color: '#4285F4' }}>g</span>
        <span style={{ color: '#34A853' }}>l</span>
        <span style={{ color: '#EA4335' }}>e</span>
      </div>
      <input type="text" className="search-input" placeholder="Search or type URL" />
      <div className="shortcuts">
        <div className="shortcut">YouTube</div>
        <div className="shortcut">Gmail</div>
        <div className="shortcut">News</div>
      </div>
    </div>
  </div>
);

const CalculatorApp = () => {
  const [display, setDisplay] = useState('0');

  const handleBtn = (val) => {
    if (val === 'C') {
      setDisplay('0');
    } else if (val === '=') {
      try {
        // Simple eval replacement for demo
        setDisplay(String(Function(`"use strict"; return (${display})`)()));
      } catch {
        setDisplay('Error');
      }
    } else {
      setDisplay(prev => prev === '0' ? String(val) : prev + val);
    }
  };

  return (
    <div className="app-page calculator">
      <div className="calc-display">{display}</div>
      <div className="calc-grid">
        {['C', '/', '*', '-', 7, 8, 9, '+', 4, 5, 6, 1, 2, 3, '=', 0].map(btn => (
          <button key={btn} className={`btn-${btn}`} onClick={() => handleBtn(btn)}>{btn}</button>
        ))}
      </div>
    </div>
  );
};

const MailApp = () => (
  <div className="app-page mail">
    <div className="app-header">
      <div className="search-pill">Search in mail</div>
    </div>
    <div className="mail-list">
      <div className="mail-item unread">
        <div className="avatar red">G</div>
        <div className="mail-meta">
          <div className="mail-top">
            <span className="sender">Google Support</span>
            <span className="time">10:45 AM</span>
          </div>
          <p className="subject">Security Alert</p>
          <p className="snippet">A new device just signed into your account...</p>
        </div>
      </div>
      <div className="mail-item">
        <div className="avatar blue">L</div>
        <div className="mail-meta">
          <div className="mail-top">
            <span className="sender">LinkedIn</span>
            <span className="time">Yesterday</span>
          </div>
          <p className="subject">You have 5 new notifications</p>
          <p className="snippet">See who viewed your profile this week...</p>
        </div>
      </div>
      <div className="mail-item">
        <div className="avatar green">S</div>
        <div className="mail-meta">
          <div className="mail-top">
            <span className="sender">Spotify</span>
            <span className="time">Feb 28</span>
          </div>
          <p className="subject">Your Weekly Discovery is ready</p>
          <p className="snippet">New music curated just for you based on...</p>
        </div>
      </div>
    </div>
    <div className="fab">+</div>
  </div>
);

const MessagesApp = () => (
  <div className="app-page messages">
    <div className="app-header">
      <h2>Messages</h2>
    </div>
    <div className="msg-list">
      <div className="msg-item">
        <div className="avatar grey">M</div>
        <div className="msg-meta">
          <div className="msg-top">
            <span className="sender">Mom</span>
            <span className="time">2m</span>
          </div>
          <p className="snippet">Don't forget to pick up milk on your way home!</p>
        </div>
      </div>
      <div className="msg-item">
        <div className="avatar orange">A</div>
        <div className="msg-meta">
          <div className="msg-top">
            <span className="sender">Alex</span>
            <span className="time">1h</span>
          </div>
          <p className="snippet">Are we still on for the game tonight? 🏀</p>
        </div>
      </div>
    </div>
    <div className="fab">Start chat</div>
  </div>
);

const CameraApp = () => (
  <div className="app-page camera">
    <div className="camera-view">
      <div className="camera-controls">
        <div className="shutter"></div>
      </div>
    </div>
  </div>
);

export default App;
