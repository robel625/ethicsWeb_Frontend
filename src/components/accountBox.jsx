import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SignupForm from './signupForm';
import { withTranslation } from 'react-i18next';
import i18n from '../translation';
import { AiFillAndroid } from "react-icons/ai";

// Styled Components
const BoxContainer = styled.div`
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  width: 540px;
  min-height: 550px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer */

  @media (max-width: 700px) {
    width: 380px;
  }
`;

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 5em;

  @media (max-width: 1000px), (max-width: 700px) {
    padding-bottom: 0em;
  }
`;

const BackDrop = styled(motion.div)`
  position: absolute;
  width: 200%;
  height: 550px;
  border-radius: 50%;
  top: -370px;
  left: -300px;
  background: #f9a34c;

  @media (max-width: 700px) {
    width: 160%;
    height: 540px;
    top: -380px;
    left: -149px;
  }
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 0 0;
`;

const HeaderText = styled.div`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
  height: 120px;
  padding-top: 20px;
  text-align: center;
  white-space: nowrap;

  @media (max-width: 700px) {
    height: 130px;
    margin-top: 10px;
    font-size: 25px;
  }
`;

const HeaderTextAmharic = styled(HeaderText)`
  @media (max-width: 700px) {
    white-space: nowrap;
  }
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;

const LanguageSwitch = styled.div`
  display: none;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  color: #f9a34c;

  &:hover,
  &:active,
  &:focus {
    transform: scale(1.1);
  }

  @media (max-width: 1000px) {
    display: flex;
    position: absolute;
    margin-top: 25px;
  }

  @media (max-width: 700px) {
    margin-top: 33px;
  }
`;

const AndroidDownload = styled.div`
  display: none;
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  &:hover,
  &:active,
  &:focus {
    transform: scale(1.1);
  }

  @media (max-width: 1000px) {
    display: flex;
    justify-content: flex-end;
    margin-top: 55px;
  }

  @media (max-width: 700px) {
    justify-content: flex-start;
    width: 250px;
    margin-top: 25px;
  }
`;

// Functional Component
const AccountBox = ({ t }) => {
  const boxRef = useRef(null);

  const handleChange = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem('i18nextLng', language);
  };

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (!element) return;

    const handleScroll = () => {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset;

      if (window.innerWidth <= 1000) {
        // Scroll the entire window for smaller screens
        window.scrollTo({ top: offsetTop - 70, behavior: "smooth" });
      } else if (boxRef.current) {
        // Scroll within the container for larger screens
        let currentElement = element.offsetParent;
        let totalOffset = element.offsetTop;

        while (currentElement && currentElement !== boxRef.current) {
          totalOffset += currentElement.offsetTop;
          currentElement = currentElement.offsetParent;
        }

        boxRef.current.scrollTo({ top: totalOffset - 70, behavior: "smooth" });
      }
    };

    requestAnimationFrame(handleScroll); // Optimize scrolling for performance
  };

  return (
    <BoxContainer ref={boxRef}>
      <TopContainer>
        <BackDrop />
        <HeaderContainer>
          {i18n.language === 'es' ? (
            <HeaderTextAmharic>
              የኢትዮጵያ ኤሌክትሪክ አገልግሎት <br /> የሙስና ጥቆማ ማቅረቢያ ስርዓት
              {/* <br/> For Test */}
            </HeaderTextAmharic>
          ) : (
            <HeaderText>
              Ethiopian Electric Utility <br /> Corruption Reporting System
              {/* <br/> For Test */}
            </HeaderText>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', zIndex: 900 }}>
            {/* {i18n.language === 'es' ? (
              <LanguageSwitch onClick={() => handleChange("en")}>English</LanguageSwitch>
            ) : (
              <LanguageSwitch onClick={() => handleChange("es")}>አማርኛ</LanguageSwitch>
            )} */}

            <LanguageSwitch>
              <select 
                value={i18n.language} 
                onChange={(e) => handleChange(e.target.value)}
                style={{
                  background: 'transparent',
                  border: '1px solid #fed287',
                  borderRadius: '4px',
                  padding: '2px 5px',
                  color: '#f9a34c',
                  cursor: 'pointer'
                }}
              >
                <option value="en">English</option>
                <option value="es">አማርኛ</option>
                <option value="or">Afan Oromo</option>
                <option value="ti">ትግርኛ</option>
                <option value="si">Sidama</option>
                <option value="so">Somali</option>
              </select>
            </LanguageSwitch>
          </div>
        </HeaderContainer>
        <AndroidDownload>
          <a
            href="https://media1.eeuethics.et/uploads/apk/Corruption-Reporting-App.apk"
            className="text-[#f9a34c] hover:text-[#f9a34c] flex items-center justify-center px-4 py-2 border border-[#fed287] rounded-lg shadow-lg hover:scale-105 transition-all"
          >
            <AiFillAndroid size={20} color="#69bf70" className="mr-2" />
            Download Android App
          </a>
        </AndroidDownload>
      </TopContainer>
      <InnerContainer>
        <SignupForm scrollTo={(id) => scrollTo(id)} />
      </InnerContainer>
    </BoxContainer>
  );
};

export default withTranslation()(AccountBox);