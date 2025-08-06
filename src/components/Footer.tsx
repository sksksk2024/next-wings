// components/Footer.js
const Footer = () => {
  return (
    <footer
    className=""
      style={{
        backgroundColor: 'black',
        color: 'white',
        padding: '1rem',
        textAlign: 'center',
      }}
    >
      <p>
        &copy; {new Date().getFullYear()} Calisthenics Wings |{' '}
        <a href="tel:+40757476361" className="select-text opacity-70 cursor-pointer">
          (+40)757-476-361
        </a>{' '}
        pentru comenzi si mai multe informatii!
      </p>
    </footer>
  );
};

export default Footer;
