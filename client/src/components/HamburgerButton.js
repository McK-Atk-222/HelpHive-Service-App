import { useState } from 'react';

const HamburgerButton = () => {
  const [isClicked, setIsClicked] = useState(false);

  const containerStyle = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    zIndex: 1000
  };

  const buttonStyle = {
    width: '50px',
    height: '50px',
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.3)',
    transition: 'background-color 0.2s, transform 0.2s',
    transform: isClicked ? 'scale(0.95)' : 'scale(1)'
  };

  const iconStyle = {
    width: '26px',
    height: '20px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  };

  const barStyle = {
    width: '26px',
    height: '4px',
    backgroundColor: '#333',
    borderRadius: '3px',
    transition: 'background-color 0.2s'
  };

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 300);
  };

  return (
    <div style={containerStyle} className="menu-container">
      <button 
        id="menuButton" 
        className="hamburger-button" 
        aria-label="Menu"
        style={buttonStyle}
        onClick={handleClick}
      >
        <div style={iconStyle} className="hamburger-icon">
          <div style={barStyle} className="bar"></div>
          <div style={barStyle} className="bar"></div>
          <div style={barStyle} className="bar"></div>
        </div>
      </button>
    </div>
  );
};

export default HamburgerButton;