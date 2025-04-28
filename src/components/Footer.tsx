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
      <p>
        &copy; {new Date().getFullYear()} Calisthenics Wings | (+40)757-476-361
        for orders and more info!
      </p>
    </footer>
  );
};

export default Footer;
