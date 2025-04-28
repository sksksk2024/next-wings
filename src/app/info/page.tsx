// info/page.tsx
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import stylesInfo from '@/components/styles/Info.module.css';
import Image from 'next/image';
import Alex from '@/../public/Alex.png';
import Mihai from '@/../public/Mihai.png';
import Serafim from '@/../public/Serafim.png';
import Insta from '@/components/utils/Insta';
import Link from 'next/link';

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
      <ul className={stylesInfo.cardsContainer}>
        {members.map((member, index) => (
          <li
            className={`${stylesInfo.flexed} flex-col justify-center items-center sm:flex-row`}
            key={member.name}
          >
            <Image
              src={member.image}
              alt="Cube"
              className={`${stylesInfo.memberImage} rounded-t-16BR sm:rounded-tr-[0px] sm:rounded-l-16BR`}
            />
            <div
              key={index}
              className={`${stylesInfo.card} text-lg w-288W h-240H flex flex-col justify-center items-center rounded-b-16BR sm:h-288H sm:rounded-bl-[0px] sm:rounded-r-16BR`}
            >
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <p>I like {member.passion}</p>
              <div className={stylesInfo.socials}>
                <Link className="group:hover:fill-blue-700" href={member.insta}>
                  <Insta />
                </Link>
                {member.tiktok && <a href={member.tiktok}>TikTok</a>}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
};

export default Info;
