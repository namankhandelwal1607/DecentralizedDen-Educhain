import React, { useState } from "react";
import Typing from "react-typing-effect";
import bitimg from "../assets/bitimg.png";
import "./style.css";
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {
    FigmaLogoIcon,
    FramerLogoIcon,
    SketchLogoIcon,
    TwitterLogoIcon,
    GitHubLogoIcon,
    VercelLogoIcon,
    NotionLogoIcon,
    DiscordLogoIcon,
    InstagramLogoIcon,
    LinkedInLogoIcon,
} from "@radix-ui/react-icons";

const slides = [
    { icon: <FigmaLogoIcon /> },
    { icon: <TwitterLogoIcon /> },
    { icon: <GitHubLogoIcon /> },
    { icon: <InstagramLogoIcon /> },
    { icon: <LinkedInLogoIcon /> },
    { icon: <DiscordLogoIcon /> },
    { icon: <SketchLogoIcon /> },
    { icon: <NotionLogoIcon /> },
    { icon: <VercelLogoIcon /> },
];

const SliderDesign2 = () => {
  const duplicatedSlides = [...slides, ...slides];

  return (
      <div className="relative h-full overflow-hidden py-12 bg-[#212121] mx-auto w-full">

<div className="absolute inset-0 z-20 before:absolute before:left-0 before:top-0 before:w-1/4 before:h-full before:bg-[#212121] before:filter before:blur-3 after:absolute after:right-0 after:top-0 after:w-1/4 after:h-full after:bg-[#212121] after:filter after:blur-3"></div>

          <motion.div
              className="flex"
              animate={{
                  x: ['0%', '-100%'],
                  transition: {
                      ease: 'linear',
                      duration: 15,
                      repeat: Infinity,
                  }
              }}
          >
              {duplicatedSlides.map((slide, index) => (
                  <div key={index} className="flex-shrink-0" style={{ width: `${100 / slides.length}%` }}>
                      <div className="flex items-center justify-center h-full">
                          {slide.icon}
                      </div>
                  </div>
              ))}
          </motion.div>
      </div>
  );
};



const HomePage = () => {
  return (
    <div className="bg-[#212121] text-[#14FFEC] min-h-screen p-8 w-full">
      <header className="text-left mb-8 flex items-center">
        <div>
          <Typing
            text={[
              "Welcome to Decentralized Den,",
            ]}
            speed={100}
            eraseSpeed={50}
            eraseDelay={2000}
            typingDelay={500}
            className="text-[50px] lg:text-5xl font-bold text-[#14FFEC] max-w-[70%]"
          />
          <p className="text-xl mt-4 text-[#e0f7fa]">
            Explore the future of finance with our cutting-edge cryptocurrency solutions.
          </p>
        </div>
        <img
          src={bitimg}
          alt="Stock Market Image"
          className="w-1/2 lg:w-1/3 ml-auto moving-border"
        />
      </header>

      <SliderDesign2 />
      
      
      <section className="text-center mb-8">
        <h1 className="text-xl mb-8 text-[#14FFEC] font-bold">Features</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-[#323232] p-6 rounded-lg transform transition duration-300 hover:scale-105 hover:bg-[#444444] text-[#e0f7fa]">
            <h3 className="text-[20px] text-[#14FFEC] font-bold mb-2">Secure Transactions</h3>
            <p className="text-[17px]">
              Experience the highest level of security with our blockchain technology.
            </p>
          </div>
          <div className="bg-[#323232] p-6 rounded-lg transform transition duration-300 hover:scale-105 hover:bg-[#444444] text-[#e0f7fa]">
            <h3 className="text-[20px] text-[#14FFEC] font-bold mb-2">Instant Transfers</h3>
            <p className="text-[17px]">
              Enjoy fast and seamless transactions across the globe.
            </p>
          </div>
          <div className="bg-[#323232] p-6 rounded-lg transform transition duration-300 hover:scale-105 hover:bg-[#444444] text-[#e0f7fa]">
            <h3 className="text-[20px] text-[#14FFEC] font-bold mb-2">24/7 Support</h3>
            <p className="text-[17px]">
              Our dedicated support team is here to help you anytime, anywhere.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};


const AboutUs = () => {
  const [faqOpen, setFaqOpen] = useState({});

  const toggleFaq = (index) => {
    setFaqOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const faqs = [
    {
      question: "What is cryptocurrency?",
      answer: "Cryptocurrency is a type of digital or virtual currency that uses cryptography for security and operates independently of a central authority.",
    },
    {
      question: "How can I buy cryptocurrency?",
      answer: "You can buy cryptocurrency through exchanges, brokerage services, and peer-to-peer platforms. Each method has its own steps and requirements.",
    },
    {
      question: "Is cryptocurrency safe?",
      answer: "Cryptocurrencies are generally secure due to their decentralized nature and cryptographic techniques, but they are also susceptible to market volatility and potential cyber threats.",
    },
  ];

  return (
    <div className="bg-[#212121] text-[#14FFEC] min-h-screen p-8">
      <header className="text-center mb-8">
        <h1 className="text-xl font-bold text-[#14FFEC]">About Us</h1>
      </header>
      <div className="bg-[#212121] text-[#14FFEC] min-h-screen p-8 flex flex-col items-center">
        <section className="mb-8 max-w-[70%]">
          <h2 className="text-[25px] mb-4 text-[#14FFEC] font-bold">Our Mission</h2>
          <p className="text-[18px] leading-7 text-[#e0f7fa]">
            Our mission is to revolutionize the cryptocurrency market by providing innovative solutions and a seamless user experience.
            We aim to empower individuals and businesses by offering secure, transparent, and efficient crypto services.
          </p>
        </section>
        <section className="mb-8 max-w-[70%]">
          <h2 className="text-[25px] mb-4 text-[#14FFEC] font-bold">Our Vision</h2>
          <p className="text-[18px] leading-7 text-[#e0f7fa]">
            Our vision is to create a world where cryptocurrency is accessible to everyone. We believe in the power of decentralization
            and strive to build a future where financial freedom is a reality for all.
          </p>
        </section>
        <section className="mb-8 max-w-[70%]">
          <h2 className="text-[25px] mb-4 text-[#14FFEC] font-bold">Our Values</h2>
          <ul className="list-none p-0">
            <li className="mb-4">
              <strong className="text-[22px] text-[#ffffff]">Integrity:</strong> <span className="text-[18px] text-[#e0f7fa]">We uphold the highest standards of integrity in all our actions. Our commitment to integrity is unwavering, and we strive to be transparent, honest, and ethical in everything we do.</span>
            </li>
            <li className="mb-4">
              <strong className="text-[22px] text-[#ffffff]">Innovation:</strong> <span className="text-[18px] text-[#e0f7fa]">We are committed to continuous innovation and improvement. We embrace change, seek new ideas, and are always looking for ways to improve our products and services.</span>
            </li>
            <li className="mb-4">
              <strong className="text-[22px] text-[#ffffff]">Customer-Centric:</strong> <span className="text-[18px] text-[#e0f7fa]">Our customers are at the heart of everything we do.</span>
            </li>
          </ul>
        </section>
      </div>

      <section className="mx-auto w-full max-w-3xl">
        <h1 className="text-xl mb-1 text-[#14FFEC] font-bold">FAQs</h1>
        <ul className="list-none p-0">
          {faqs.map((faq, index) => (
            <li key={index} className="mb-4">
              <button
                className="w-full text-left focus:outline-none"
                onClick={() => toggleFaq(index)}
              >
                <div className="flex justify-between items-center">
                  <span className="text-[25px] text-[#ffffff]">{faq.question}</span>
                  <span className="text-[18px] text-[#ffffff]">{faqOpen[index] ? "▲" : "▼"}</span>
                </div>
              </button>
              {faqOpen[index] && (
                <p className="mt-2 text-[18px] leading-7 text-[#e0f7fa]">{faq.answer}</p>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#212121] text-[#14FFEC] py-4 text-center">
      <div className="flex justify-center space-x-4">
        <a href="https://twitter.com/lnmtradezen" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} className="text-[#14FFEC] text-xl" />
        </a>
        <a href="https://facebook.com/lnmtradezen" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} className="text-[#14FFEC] text-xl" />
        </a>
        <a href="https://instagram.com/lnmtradezen" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} className="text-[#14FFEC] text-xl" />
        </a>
        <a href="https://linkedin.com/lnmtradezen" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} className="text-[#14FFEC] text-xl" />
        </a>
      </div>
      <p className="text-[14px] mt-2">
        © {new Date().getFullYear()} LNM Decentralized Den. All Rights Reserved.
      </p>
    </footer>
  );
};


const App = () => {
  return (
    <div>
      <HomePage />
      <AboutUs />
      <Footer />
    </div>
  );
};

export default App;
