// components/Footer.js
const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: 'black',
        color: 'white',
        padding: '1rem',
        textAlign: 'center',
      }}
    >
      <p>&copy; {new Date().getFullYear()} All rights reserved</p>
    </footer>
  );
};

export default Footer;
