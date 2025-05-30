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
        &copy; {new Date().getFullYear()} Calisthenics Wings |{' '}
        <span className="select-text opacity-70 cursor-pointer">
          (+40)757-476-361
        </span>{' '}
        pentru comenzi si mai multe informatii!
      </p>
    </footer>
  );
};

export default Footer;
