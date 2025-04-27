// info/page.tsx
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import stylesInfo from '@/components/styles/Info.module.css';
import Image from 'next/image';
import Alex from '@/../public/Alex.png';
import Mihai from '@/../public/Mihai.png';
import Serafim from '@/../public/Serafim.png';
import stylesProducts from '@/components/styles/Products.module.css';

const members = [
  {
    image: Alex,
    name: 'Alexandru Cota',
    role: 'Web Developer',
    passion: 'Thinking',
    insta: '#',
  },
  {
    image: Mihai,
    name: 'Mihai Alexa',
    role: 'Content Creator',
    passion: 'Chess',
    insta: '#',
    tiktok: '#',
  },
  {
    image: Serafim,
    name: 'Serafim Socaciu',
    role: 'CEO',
    passion: 'Info',
    insta: '#',
  },
];

const Info = () => {
  return (
    <div>
      <Header />
      <div className={stylesInfo.cardsContainer}>
        {members.map((member, index) => (
          <section className={stylesInfo.flexed}>
            <Image
              src={member.image}
              alt="Cube"
              className={stylesInfo.memberImage}
            />
            <div key={index} className={stylesInfo.card}>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <p>{member.passion}</p>
              <div className={stylesInfo.socials}>
                <a href={member.insta}>Instagram</a>
                {member.tiktok && <a href={member.tiktok}>TikTok</a>}
              </div>
            </div>
          </section>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Info;
