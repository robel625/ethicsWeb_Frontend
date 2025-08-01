
import "../styles.css";
import eeu_logo from '../assets/eeu_white_logo.png';
import { LanguageSwitch } from "./styles";
import { withTranslation } from "react-i18next";
import i18n from "../translation";
import { useStateContext } from "../Contexts/ContextProvider";
import Check_Status from "./Check_Status";
import { AiFillAndroid } from "react-icons/ai";

const LeftSide = ({ t }) => {



  const { handleClick, isClicked } = useStateContext();


  const handleChange = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem('i18nextLng', language);
  };

  return (
    <div className="signUp-left signUp-column">
      <div className='logo-text'>
        <img
          className="w-12 sm:w-[50px]  lg:w-[100px]  lg:h-[100px] h-auto"
          src={eeu_logo}
          alt="picture"
        />
        <div style={{ marginLeft: 10, fontSize: 18 }}>
          <div
            className='text-lg lg:text-2xl text-black'
          >
            የኢትዮጵያ  ኤሌክትሪክ አገልግሎት
          </div>
          <div
            className='-mt-2 ml-2  text-xl lg:text-2xl text-black'>
            Ethiopian Electric Utility
          </div>
        </div>
      </div>
      <div className="leftText">
        {i18n.language == 'en' ?
          <>
            <h1>
              <span>Use this form to <br /> report Corruption
              </span>
              <span>securely and confidentially.</span>
            </h1>
            <p>
              All information provided will remain private and will only be accessible to authorized personnel for investigation purposes. No information will be disclosed to any unauthorized parties.
            </p>

            <p className="mt-5">To check the status of your report, please click this link <span style={{ color: "#fed287", cursor: 'pointer' }} onClick={() => handleClick('check_status')}> check status</span></p>
          </> : i18n.language == 'es' ?
          <div>
            <div className='text-lg lg:text-2xl text-black mb-5'>
              <span>ይህንን ቅጽ ተጠቅመው <br /> ሙስናን አስተማማኝነቱና ምስጢራዊነቱ  <br /> በተጠበቀ መልኩ ሪፖርት ያድርጉ፡፡</span>
            </div>
            <p className=''>
              የሰጡት መረጃ በሙሉ ሚስጥራዊነቱ የተጠበቀ ሲሆን ለምርመራ ስራ ለተፈቀደላቸዉ አካላት ብቻ ተደራሽ ይሆናል፡፡ ምንም አይነት መረጃ ከተጠቀሱት አካላት ዉጪ ተላልፎ አይሰጥም።
            </p>

            <p className="mt-5">ጥቆማዎ ምን ላይ እንደደረሰ ለማየት ቀጥሎ ያለውን ሊንክ ይጫኑ <span style={{ color: "#fed287", cursor: 'pointer' }} onClick={() => handleClick('check_status')}> check status</span></p>

          </div>
        :  

        <div>
        <div className='text-lg lg:text-2xl text-black mb-5'>
          <span>{t("Body 1")}</span>
        </div>
        <p className=''>
        {t("Body 2")}
        </p>

        <p className="mt-5">{t("Body 3")}<span style={{ color: "#fed287", cursor: 'pointer' }} onClick={() => handleClick('check_status')}> check status</span></p>

      </div>
        
        }
         
         <div className="flex items-center justify-between mt-4">
          <a
                href="https://media1.eeuethics.et/uploads/apk/Corruption-Reporting-App.apk"
                className=" text-[#fed287] hover:text-[#fed287] flex items-center justify-center px-4 py-2 border border-[#fed287] rounded-lg shadow-md hover:scale-105 transition-all"
              >
                
                <AiFillAndroid size={20} color="white" className="mr-2"/>
                   Download Android App
              </a>

        <div style={{ display: 'flex', justifyContent: 'flex-end', zIndex: 900 }}>
          {/* {i18n.language == 'es' ? <LanguageSwitch onClick={() => handleChange("en")}>
            <div>English</div>
          </LanguageSwitch> :
            <LanguageSwitch onClick={() => handleChange("es")}>
              <div>አማርኛ</div>
            </LanguageSwitch>} */}

            <LanguageSwitch>
              <select 
                value={i18n.language} 
                onChange={(e) => handleChange(e.target.value)}
                style={{
                  background: 'transparent',
                  border: '1px solid #fed287',
                  borderRadius: '4px',
                  padding: '2px 5px',
                  color: '#fed287',
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
        </div>
      </div>

             

      {isClicked.check_status && <Check_Status />}

    </div>
  )
}

export default withTranslation()(LeftSide);