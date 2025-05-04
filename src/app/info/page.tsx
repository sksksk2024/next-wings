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
import PageWrapper from '@/components/utils/PageWrapper';
import Tiktok from '@/components/utils/Tiktok';

const members = [
  {
    image: Serafim,
    name: 'Serafim Socaciu',
    role: 'CEO',
    passion: 'Info',
    insta: 'https://www.instagram.com/serafim.socaciu/',
  },
  {
    image: Mihai,
    name: 'Mihai Alexa',
    role: 'Content Creator',
    passion: 'Chess',
    insta: 'https://www.instagram.com/mihai.ev/',
    tiktok: 'https://www.tiktok.com/@mihai.ev',
  },
  {
    image: Alex,
    name: 'Alexandru Cota',
    role: 'Web Developer',
    passion: 'Thinking',
    insta: 'https://www.instagram.com/alextvop2016/',
  },
];

const Info = () => {
  return (
    <PageWrapper>
      <div>
        <Header />
        <h1 hidden>Info Page</h1>
        <ul className={stylesInfo.cardsContainer}>
          {members.map((member, index) => (
            <li
              className={`${stylesInfo.flexed} flex-col justify-center items-center sm:flex-row`}
              key={member.name}
            >
              <Image
                src={member.image}
                alt={`${member.name} member`}
                className={`${stylesInfo.memberImage} rounded-t-16BR sm:rounded-tr-[0px] sm:rounded-l-16BR`}
              />
              <div
                className={`${stylesInfo.card} text-lg w-288W h-240H flex flex-col justify-center items-center rounded-b-16BR sm:h-288H sm:rounded-bl-[0px] sm:rounded-r-16BR`}
              >
                <h2>{member.name}</h2>
                <p>{member.role}</p>
                <p>I like {member.passion}</p>
                <div
                  className={`${stylesInfo.socials} m-16M
                  ${member.tiktok ? 'flex justify-center items-center gap-6' : ''}
                  `}
                >
                  <Link
                    className="group:hover:fill-blue-700"
                    href={member.insta}
                    target="_blank"
                  >
                    <Insta />
                  </Link>
                  {member.tiktok && (
                    <Link href={member.tiktok} target="_blank">
                      <Tiktok />
                    </Link>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <Footer />
      </div>
    </PageWrapper>
  );
};

export default Info;
