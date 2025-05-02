import HamburgerButton from './HamburgerButton';

const Header = () => {
  const headerStyle = {
    padding: '25px 0',
    textAlign: 'center',
    position: 'relative',
    width: '100%',
    zIndex: 2
  };

  const h1Style = {
    color: '#ffffff',
    textShadow: '2px 2px 6px rgba(0, 0, 0, 0.6), 0 0 20px rgba(240, 204, 0, 0.7)',
    fontSize: '2.8rem',
    fontWeight: 'bold',
    letterSpacing: '1px'
  };

  return (
    <header style={headerStyle}>
      <h1 style={h1Style}>Help Hive</h1>
      <HamburgerButton />
    </header>
  );
};

export default Header;