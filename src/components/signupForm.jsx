import React, { useContext, useEffect, useState } from "react";
import {
    BoxContainer,
} from "./common";
import { FormGroup, ButtonContainer } from "./styles";
import './style.css'
import { Row, Col, TreeSelect, DatePicker } from "antd";
import { Button } from "./Button";
import EtDatePicker, { EtLocalizationProvider } from "mui-ethiopian-datepicker";
import { treeData } from "./TreeData";
import Dropzone from "./Dropzone";
import { useForm } from "./common/useForm2";
import validate from "./common/validationRules";
import ProgressBar from "@ramonak/react-progress-bar";
import { withTranslation } from "react-i18next";
import { AmhtreeData } from "./AmhTreeData";
import i18n from "../translation";
import { useStateContext } from "../Contexts/ContextProvider";
import Check_Status from "./Check_Status";

// function SignupForm() {
const SignupForm = ({t,scrollTo}) => {
  const { values, errors, handleChange, handleSubmit, setProgress, progress, msg,ticket, setFormState} = useForm(validate);
  const [date, setDate] = useState(null);

  const { handleClick, isClicked } = useStateContext();
  
  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  
    setFormState((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        ["date"]: selectedDate.toISOString().split("T")[0]
      },
      errors: {
        ...prevState.errors,
        ["date"]: "",
      },
    }));
  };
  
    function ValidationType({ type }) {
      const ErrorMessage = errors[type];
      return ErrorMessage ? <span style={{ marginTop: 0, marginBottom: 10, color: 'red' }}>{ErrorMessage}</span> : <span></span>;
    }
    
  
    const onChangeCSC = (newValue) => {

      const requiredValues = ["Addis Ababa Coordination","addis ababa Coordination", "Oromia Coordination", "Amhara Coordination","SNNPR Coordination","Sumale Coordination", "Tigray Coordination",
        "አዲስ አበባ","አማራ","ኦሮሚያ", "ደቡብ ብሄርስቦችና ህዝቦች","ሶማሌ","ትግራይ","ቤንሻንጉል ጉሙዝ"];
      let cscError = ""
      // if (newValue && requiredValues.some(val => newValue.includes(val))) 
      if (newValue && requiredValues.some((val) => val === newValue)){
        {i18n.language == 'en' ? cscError = "Please Select Either a Region or a Customer Service." : cscError = "ሪጅን ወይም የአገልግሎት መዓከል ይምረጡ";}
        
        setFormState((prevState) => ({
          ...prevState,
          values: {
            ...prevState.values,
            ["CSC"]: ''
          },
          errors: {
            ...prevState.errors,
            ["CSC"]: cscError,
          },
        }));
        return
      }
  
      setFormState((prevState) => ({
        ...prevState,
        values: {
          ...prevState.values,
          ["CSC"]: newValue
        },
        errors: {
          ...prevState.errors,
          ["CSC"]: "",
        },
      }));
  
    };
  
  
    const onChangeDate  = (date, dateString) => {
      setFormState((prevState) => ({
        ...prevState,
        values: {
          ...prevState.values,
          ["date"]: dateString
        },
        errors: {
          ...prevState.errors,
          ["date"]: "",
        },
      }));
      
    };
  
    const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      if (errors?.yourPhone) {
        scrollTo("yourPhone");
      } else if (errors?.yourEmail) {
        scrollTo("yourEmail");
      } else if (errors?.location) {
        scrollTo("location");
      } else if (errors?.report) {
        scrollTo("report");
      } else if (errors?.suspectPhone) {
        scrollTo("suspectPhone");
      }
      setIsSubmitted(false); // Reset isSubmitted after scrolling
    }
  }, [errors, isSubmitted]);


    return (
        <BoxContainer>
            <FormGroup autoComplete="off" onSubmit={handleSubmit}>
            <div  className="infohead" style={{fontFamily: 'ebrima'}}>{t("Your Information")}</div>
            <Row justify="space-between" align="middle" gutter={[10 , 0]}>
            <Col lg={12} md={12} sm={12} xs={24}>
               <label htmlFor="yourName" className="inboxTitle">{t("Your Name (optional)")}</label>
               <div className="wrapper">
                  <div className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>



                </div>
                  <input 
                   className={`input1 ${errors.yourName ? 'error' : ''}`}
                   type="text"
                   name="yourName"
                   id="yourName"
                   placeholder={t("Your Name")}
                   value={values.yourName || ""}
                   onChange={handleChange}
                   maxLength="30"
                  ></input>
                </div>  

              </Col>
              <Col lg={12} md={12} sm={12} xs={24}>
              <div className="-mt-[10px]">
              <label htmlFor="yourPhone" className="inboxTitle">{t("Your phone")}
                <span style={{color: "red", fontSize: 20, paddingLeft: 3}}>*</span>
                </label>

                <div className="wrapper">
                  <div className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
</svg>


                </div>
                  <input 
                  className={`input1 ${errors.yourPhone ? 'error' : ''}`}
                   type="tel"
                   name="yourPhone"
                   id= "yourPhone"
                   placeholder={t("Your Phone Number")}
                   value={values.yourPhone || ""}
                   onChange={handleChange}
                   maxLength={values.yourPhone?.startsWith("7") || values.yourPhone?.startsWith("9")
                    ? 9
                    : values.yourPhone?.startsWith("251")
                    ? 12
                    : values.yourPhone?.startsWith("+")
                    ? 13
                    : 10}
                  ></input>
                </div>  
              
                </div>
              </Col>
              <Col span={12}>
              <label htmlFor="yourEmail" className="inboxTitle">{t("Your email (optional)")}</label>
              <div className="wrapper">
                  <div className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
</svg>



                </div>
                  <input 
                  className={`input1 ${errors.yourEmail ? 'error' : ''}`}
                  type="text"
                  name="yourEmail"
                  id="yourEmail"
                  placeholder={t("Your Email")}
                  value={values.yourEmail || ""}
                  onChange={handleChange}
                  maxLength="50"
                  ></input>
                </div>
              </Col>
              <Col span={12}>
              <label htmlFor="yourAddress" className="inboxTitle">{t("Your Address (optional)")}</label>
              <div className="wrapper">
                  <div className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
</svg>




                </div>
                  <input 
                  className={`input1 ${errors.yourAddress ? 'error' : ''}`}
                  type="text"
                  name="yourAddress"
                  id="yourAddress"
                  placeholder={t("Your Address")}
                  value={values.yourAddress || ""}
                  onChange={handleChange}
                  maxLength="50"
                  ></input>
                </div>
              </Col>
                </Row>
                <hr style={{marginTop: 10}}></hr>
              <div  className="infohead infoheadDate" style={{fontFamily: 'ebrima'}}>{t("Incident Information")}</div>
              <Row justify="space-between" align="middle"  gutter={[16,0]}>
              <Col lg={12} md={12} sm={12} xs={24} style={{ marginBottom: i18n.language == 'en' ? 0: 10}}>
              
              {i18n.language == 'en' ? (
                 <>
                 <div className="inboxTitle mb-1 mt-[-10px] md:mt-2">{t("Incident happened date (optional)")}</div>
                 <DatePicker onChange={onChangeDate} disabledDate={d => !d || d.isAfter(new Date()) }   style={{ width: "100%", marginBottom: 10,}}/>
                 </>
                ) : (
                 <EtLocalizationProvider>
                 <EtDatePicker
                 label={t("Incident happened date (optional)")}
                  onChange={handleDateChange}
                  value={date}
                  style={{ height: 30, marginBottom: 5, width: "100%", fontFamily: 'ebrima'}}
                  minDate={new Date("2010-08-20")}
                  maxDate={new Date()}
                 />
                  </EtLocalizationProvider>
                  )}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24}>
             
              <div className={`lg:-mt-5 ${i18n.language === 'en' ? '-mt-4' : ''}`}>
              <label htmlFor="location" className="inboxTitle mb-1">{t("Incident happened Location")}<span style={{color: "red", fontSize: 20, paddingLeft: 3}}>*</span></label>
              <div className="wrapper">
                  <div className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
</svg>




                </div>
                  <input 
                  className={`input1 ${errors.location ? 'error' : ''}`}
                  type="text"
                  name="location"
                  id="location"
                  placeholder={t("Location")}
                  value={values.location || ""}
                  onChange={handleChange}
                  maxLength="100"
                  
                  ></input>
                </div>

                </div>
              </Col>
              <Col lg={12} md={12} sm={12} xs={24}>
              
                {i18n.language == 'es' ? <div style={{ height: 10}} ></div> : <div></div>}
                <div className="inboxTitle" style={{ lineHeight: 1, marginBottom: 8}}>{t("To which EEU (Region, District, CSC) to inform your suggestion (optional)")}
                <span style={{color: "red", fontSize: 20 , paddingLeft: 3}}>*</span>
                </div>
                 <TreeSelect
                    showSearch
                    className="tree-select-class"
                    value={values.CSC || ""}
                    dropdownStyle={{ maxHeight: 1200, overflow: 'auto' }}
                    placeholder={t("Please Select")}
                    onChange={onChangeCSC}
                    // treeData= {treeData}
                    treeData={i18n.language == 'en' || i18n.language == 'or' || i18n.language == 'si' || i18n.language == 'so' ? treeData :  AmhtreeData}
                    // onPopupScroll={onPopupScroll}
                    style={{
                        border: errors.CSC ? '1px solid red' : '1px solid gray',
                        fontFamily: 'ebrima',
                        borderRadius: 4,
                      }}
                  />
                  {errors.CSC == "Red Border"? <></> : <ValidationType type="CSC" />} 
                
              </Col>
              <Col lg={12} md={12} sm={12} xs={24}>
              {i18n.language == 'en' ? <div style={{ height: 10}} ></div> : <div style={{ height: 8}} ></div>}
              <div className="inboxTitle" >{t("Category")}</div>
                                    <select 
                                        id="category"
                                        name='category'
                                        value={values.category || ""}
                                        onChange={handleChange}
                                        className="category"
                                    >
                                        <option value="">-- {t("Corruption Type")} --</option>
                                        <option value="undue delaying of matters">{t("undue delaying of matters")}</option>
                                        <option value="Biribery, giving bribe, undue advantage">{t("Biribery, giving bribe, undue advantage")}</option>
                                        <option value="acceptance of undue advantage">{t("acceptance of undue advantage")}</option>
                                        <option value="maladminstaration of EEU works">{t("maladminstaration of EEU works")}</option>
                                        <option value="Illegal collection of money">{t("Illegal collection of money")}</option>
                                        <option value="possession of unexplained money & property">{t("possession of unexplained money & property")}</option>
                                        <option value="Breach of trust">{t("Breach of trust")}</option>
                                        <option value="using forgery document">{t("using forgery document")}</option>
                                        <option value="suppression of official or Organizational documents">{t("suppression of official or Organizational documents")}</option>
                                        <option value="Breach of official secrecy">{t("Breach of official secrecy")}</option>
                                        <option value="Facilitating Act of Bribry">{t("Facilitating Act of Bribry")}</option>
                                        <option value="Abuse of power or responsibility">{t("Abuse of power or responsibility")}</option>
                                        <option value="Distortion of priority">{t("Distortion of priority")}</option>
                                        <option value="Illegal electric line installation">{t("Illegal electric line installation")}</option>
                                        <option value="Discrimination">{t("Discrimination")}</option>
                                        <option value="Involvement in situations that create a conflict of interest">{t("Involvement in situations that create a conflict of interest")}</option>
                                        <option value="Others">{t("Others")}</option>
                                    </select>
                
              </Col>
              </Row>
              <Col>
              <div className="inboxTitle">{t("Details of your Report")}
                <span style={{color: "red", fontSize: 25, paddingLeft:3}}>*</span>
                </div>
                <textarea
                rows="5"
                placeholder={t("Details of your Report")}
                id="report"
                name="report"
                value={values.report || ""}
                className={`${errors.report ? 'error' : ''}`}
                style={{
                  border: errors.report ? '1px solid red' : '1px solid gray',
                  width: '100%',
                  borderRadius: 4,
                  padding: 10
                }}
                onChange={handleChange}
                maxLength="2000"
                ></textarea>
                {/* <ValidationType type="report" /> */}
              </Col>
              <div style={{display: "block", marginTop: 15, marginBottom: 1 }}>{t('Submit supporting evidence for your report')}</div>
              <Dropzone 
                setFormState={setFormState}
              />
              <hr></hr>
              <div  className="infohead mt-1 mb-3" style={{fontFamily: 'ebrima'}}>{t("Suspect's Information (optional)")}</div>
              <Row justify="space-between" align="middle" gutter={[10,10]}>
              <Col lg={12} md={12} sm={12} xs={24}>

              <div className="wrapper">
                  <div className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>



                </div>
                  <input 
                   className={`input1 ${errors.name ? 'error' : ''}`}
                   type="text"
                  name="suspectName"
                  placeholder={t("Suspect's Name")}
                  value={values.suspectName || ""}
                  onChange={handleChange}
                  maxLength="30"
                  ></input>
                </div>  

              </Col>
              <Col lg={12} md={12} sm={12} xs={24}>
              <div className="wrapper">
                  <div className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
</svg>




                </div>
                  <input 
                   className={`input1 ${errors.suspectPostion ? 'error' : ''}`}
                   type="text"
                   name="suspectPostion"
                   placeholder={t("Suspect's Position")}
                   value={values.suspectPostion || ""}
                  onChange={handleChange}
                  maxLength="30"
                  ></input>
                </div>  
               
              </Col>
              <Col lg={12} md={12} sm={12} xs={24}>
              <div className="wrapper">
                  <div className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
</svg>


                </div>
                  <input 
                  className={`input1 ${errors.suspectPhone ? 'error' : ''}`}
                   type="tel"
                   name="suspectPhone"
                   id="suspectPhone"
                  placeholder={t("Suspect's Phone Number")}
                  value={values.suspectPhone || ""}
                   onChange={handleChange}
                   maxLength={values.suspectPhone?.startsWith("7") || values.suspectPhone?.startsWith("9")
                    ? 9
                    : values.suspectPhone?.startsWith("251")
                    ? 12
                    : values.suspectPhone?.startsWith("+")
                    ? 13
                    : 10}
                  ></input>
                </div>  
              
              </Col>
              </Row>
              <div className="explain">
                 <div style={{ fontSize: 16, fontWeight: 700, paddingLeft: 10, color: "#f9a34c", fontFamily: 'ebrima' }}>{t("Note")}</div>
                 <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'ebrima', paddingLeft: 5, gap: 4, marginBottom: 6 }}>
    <span style={{ fontSize: 17, fontWeight: 500, color: "#f9a34c"}}>*</span>
    <span style={{ textAlign: 'justify' }}>{t("Report corruption honestly & with evidence.")}</span>
  </div>

  <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'ebrima', paddingLeft: 5, gap: 4, marginBottom: 6 }}>
    <span  style={{ fontSize: 17, fontWeight: 500, color: "#f9a34c"}}>*</span>
    <span style={{ textAlign: 'justify' }}>{t("Your report will remain secured & anonymous.")}</span>
  </div>

  <div className="mobileExplain">
  <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'ebrima', paddingLeft: 5, gap: 4, marginBottom: 6 }}>
    <span  style={{ fontSize: 17, fontWeight: 500, color: "#f9a34c"}}>*</span>
    <span style={{ textAlign: 'justify' }}>{t("To check the status of your report, please click this link")} <span style={{ color:  "#f9a34c", cursor: 'pointer'}} onClick={() => handleClick('check_status')}>check status</span> </span>
  </div>
  </div>

              
              </div>
              {progress.started &&<div style={{marginTop: 20}}>
              <ProgressBar completed={progress.pc}></ProgressBar>
               {(msg && progress.started) && <div>{msg}</div>}
            </div>}
              <ButtonContainer>
                <Button name="submit"
                onClick={() => {
                  // Set the form as submitted and trigger scroll
                  setIsSubmitted(true);
                }}
                // onClick={scrollToForm}
                >{t("Submit")}</Button>
              </ButtonContainer>
            </FormGroup>


      {isClicked.check_status && <Check_Status/>}
        </BoxContainer>
    );
}

export default withTranslation()(SignupForm);

