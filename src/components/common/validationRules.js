
import { notification } from "antd";
import i18n from "../../translation";

export default function validate(values, isPhoneVerified = false) {
  let errors = {};

  // if (!values.name) {
  //   errors.name = "Name is required";
  // }
  if (!values.yourPhone) {
    {i18n.language == 'en' ? errors.yourPhone = "Your Phone is Required" : errors.yourPhone = "ስልክ ቁጥር ያስፈልጋል"};
    {i18n.language == 'en' ?  notification["error"]({
            message: "",
            description:
              "Your Phone is Required",
          }) :  notification["error"]({
            message: "",
            description:
              "ስልክ ቁጥር ያስፈልጋል",
          })}
  }
  //  if (values.yourPhone != "" && !values.yourPhone.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)){
  //   {i18n.language == 'en' ? errors.yourPhone = "Please Input a Valid Phone Number" :  errors.yourPhone = "ትክክለኛ ስልክ ቁጥር ያስገቡ"};
  //     {i18n.language == 'en' ?  notification["error"]({
  //       message: "",
  //       description:
  //         "Please Input a Valid Phone Number",
  //     }) :  notification["error"]({
  //       message: "",
  //       description:
  //         "ትክክለኛ ስልክ ቁጥር ያስገቡ",
  //     })}
  //   }
  // (
  //   values.yourPhone !== "" &&
  //   !/^((0\d{9})|(7\d{8})|(9\d{8})|(251\d{11})|(\+251\d{12}))$/.test(values.yourPhone) || 
  //   !/^(09|07|9|7|251|\+251)/.test(values.yourPhone)
  // )

    else if (
      values.yourPhone !== "" &&
      !/^((0\d{9})|(7\d{8})|(9\d{8})|(251\d{9})|(\+251\d{9}))$/.test(values.yourPhone) || 
      !/^(09|07|9|7|251|\+251)/.test(values.yourPhone)
    ){
      {i18n.language == 'en' ? errors.yourPhone = "Please Input a Valid Phone Number" :  errors.yourPhone = "ትክክለኛ ስልክ ቁጥር ያስገቡ"};
        {i18n.language == 'en' ?  notification["error"]({
          message: "",
          description:
            "Please Input a Valid Phone Number",
        }) :  notification["error"]({
          message: "",
          description:
            "ትክክለኛ ስልክ ቁጥር ያስገቡ",
        })}
      }
  
  // Check if phone is verified (only if phone number is valid)
  else if (values.yourPhone && !isPhoneVerified) {
    {i18n.language == 'en' ? errors.yourPhone = "Please verify your phone number" : errors.yourPhone = "እባክዎ የስልክ ቁጥርዎን ያረጋግጡ"};
    {i18n.language == 'en' ?  notification["error"]({
      message: "",
      description:
        "Please verify your phone number with OTP",
    }) :  notification["error"]({
      message: "",
      description:
        "እባክዎ የስልክ ቁጥርዎን በOTP ያረጋግጡ",
    })}
  }

  //   if (!/^(0\d{9}|7\d{8}|9\d{8})$/.test(inputs.phone)){
  //     handleError('Please Input a Valid Phone Number', 'phone');
  //     isValid = false;
  //   }
  // else if (!/^(09|07|9|7)/.test(inputs.phone)) {
  //     handleError('Please Input a Valid Phone Number', 'phone');
  //     isValid = false;
  //   }
     
    if (values.suspectPhone &&
      (!/^((0\d{9})|(7\d{8})|(9\d{8})|(251\d{9})|(\+251\d{9}))$/.test(values.suspectPhone) || 
      !/^(09|07|9|7|251|\+251)/.test(values.suspectPhone))
    ){
      {i18n.language == 'en' ? errors.suspectPhone = "Please Input a Valid Suspect Phone Number" : errors.suspectPhone = "ጥቆማ የቀረበበት አካል ትክክለኛ ስልክ ቁጥር ያስገቡ"}
      {i18n.language == 'en' ?  notification["error"]({
        message: "",
        description:
          "Please Input a valid Suspect Phone Number",
      }) :  notification["error"]({
        message: "",
        description:
          "ጥቆማ የቀረበበት አካል ትክክለኛ ስልክ ቁጥር ያስገቡ",
      })}
      

    }

    
  // if (!values.email) {
  //   errors.email = "Email address is required";
  // } else if (!/\S+@\S+\.\S+/.test(values.email)) {
  //   errors.email = "Email address is invalid";
  // }
  if(values.yourEmail.length != 0 && !/\S+@\S+\.\S+/.test(values.yourEmail)){
    {i18n.language == 'en' ? errors.yourEmail = "Email Address is Invalid" : errors.yourEmail = "ትክክለኛ ኢሜል ያስገቡ"}
    {i18n.language == 'en' ?  notification["error"]({
      message: "",
      description:
        "Email Address is Invalid",
    }) :  notification["error"]({
      message: "",
      description:
        "ትክክለኛ ኢሜል ያስገቡ",
    })}
  }
  if (!values.location) {
    {i18n.language == 'en' ? errors.location = "Location Where Corruption Happened is Required" : errors.location = "ችግሩ የተከሰተበት ቦታ ያስፈልጋል";}
    {i18n.language == 'en' ?  notification["error"]({
      message: "",
      description:
        "Location Where Corruption Happened is Required",
    }) :  notification["error"]({
      message: "",
      description:
        "ችግሩ የተከሰተበት ቦታ ያስፈልጋል",
    })}
    
  }
  if (!values.report) {
    {i18n.language == 'en' ? errors.report = "Description of Corruption is Required" : errors.report = "የጥቆማ ዝርዝር ማብራሪያ ያስፈልጋል";}
    {i18n.language == 'en' ?  notification["error"]({
      message: "",
      description:
        "Description of Corruption is Required",
    }) :  notification["error"]({
      message: "",
      description:
        "የጥቆማ ዝርዝር ማብራሪያ ያስፈልጋል",
    })}
  }else if (values.report.length < 1){
    {i18n.language == 'en' ? errors.report = "Write Your Report in Detail" : errors.report = "የጥቆማ ዝርዝር ማብራሪያ በትክክል ይፃፉ";}
    {i18n.language == 'en' ?  notification["error"]({
      message: "",
      description:
        "Write Your Report in Detail",
    }) :  notification["error"]({
      message: "",
      description:
        "የጥቆማ ዝርዝር ማብራሪያ ያስፈልጋል",
    })}

  }

  if (!values.CSC) {
    // {i18n.language == 'en' ? errors.CSC = "To which EEU office to inform your suggestion is required" : errors.CSC = "ጥቆማ የሚቀርብበት የስራ ክፍል ይምረጡ";}
    errors.CSC = "Red Border"
    {i18n.language == 'en' ?  notification["error"]({
      message: "",
      description:
        "EEU Office Where the Incident Occurred",
    }) :  notification["error"]({
      message: "",
      description:
        "ጥቆማ የቀረበበት የስራ ክፍል ይምረጡ",
    })}
    
  }
  

  // const requiredValues = ["Addis Ababa", "Oromia Region", "Amhara","SNNPR","Somalia", "Tigray", "Afar Region","DIRE DAWA","GAMBELLA Region","HARER Region","South West Region","Benishangul-Gumuz Region",
  //   "አዲስ አበባ","አማራ ክልል","ኦሮሚያ ክልል", "ደቡብ ብሄርስቦችና ህዝቦች ክልል","ሶማሊያ ክልል","ትግራይ ክልል","እፋር ክልል",];

  // const requiredValues = ["Addis Ababa","addis ababa", "Oromia Region", "Amhara Region","SNNPR","Somali Region", "Tigray Region","Benishangul-Gumuz Region",
  //                         "አዲስ አበባ","አማራ ሪጅን","ኦሮሚያ ሪጅን", "ደቡብ ብሄርስቦችና ህዝቦች ሪጅን","ሶማሌ ሪጅን","ትግራይ ሪጅን","ቤንሻንጉል ጉሙዝ ሪጅን"];

  const requiredValues = ["Addis Ababa Coordination","addis ababa Coordination", "Oromia Coordination", "Amhara Coordination","SNNPR Coordination","Sumale Coordination", "Tigray Coordination",
    "አዲስ አበባ","አማራ","ኦሮሚያ", "ደቡብ ብሄርስቦችና ህዝቦች","ሶማሌ","ትግራይ","ቤንሻንጉል ጉሙዝ"];
  if (values.CSC && requiredValues.some((val) => val === values.CSC)) {
    {i18n.language == 'en' ? errors.CSC = "Please Select Either a Region or a Customer Service." : errors.CSC = "ሪጅን ወይም የአገልግሎት መዓከል ይምረጡ";}
    {i18n.language == 'en' ?  notification["error"]({
      message: "",
      description:
        "Please Select Either a Region or a Customer Service.",
    }) :  notification["error"]({
      message: "",
      description:
        "ሪጅን ወይም የአገልግሎት መዓከል ይምረጡ",
    })}
    
  }

  if (values.yourName) {

    // Allow only letters and spaces (no numbers or special characters)
    if (!/^[a-zA-Z\u1200-\u135A\s']+$/.test(values.yourName)) {
      errors.yourName = "Only letters and spaces are allowed.";
      {i18n.language == 'en' ?  notification["error"]({
        message: "",
        description:
          "yourName, Only letters and spaces are allowed.",
      }) :  notification["error"]({
        message: "",
        description:
          "ስም, ፊደል እና ባዶ ቦታ(space) ብቻ ነው የሚቻለው",
      })}
    } else if (values.yourName.length > 30) {
      errors.yourName = "Name cannot exceed 30 characters.";
      {i18n.language == 'en' ?  notification["error"]({
        message: "",
        description:
          "yourName, Name cannot exceed 30 characters.",
      }) :  notification["error"]({
        message: "",
        description:
          "ስም, ስም ከ30 ፊደል መብለጥ የለበትም",
      })}
    }

  }

  if (values.suspectName) {

    // Allow only letters and spaces (no numbers or special characters)
    if (!/^[a-zA-Z\u1200-\u135A\s']+$/.test(values.suspectName)) {
      errors.suspectName = "Only letters and spaces are allowed.";
      {i18n.language == 'en' ?  notification["error"]({
        message: "",
        description:
          "suspectName, Only letters and spaces are allowed.",
      }) :  notification["error"]({
        message: "",
        description:
          "ጥቆማ የቀረበበት አካል, ፊደል እና ባዶ ቦታ(space) ብቻ ነው የሚቻለው",
      })}
    } else if (values.suspectName.length > 30) {
      errors.yourName = "Name cannot exceed 30 characters.";
      {i18n.language == 'en' ?  notification["error"]({
        message: "",
        description:
          "suspectName, Name cannot exceed 30 characters.",
      }) :  notification["error"]({
        message: "",
        description:
          "ጥቆማ የቀረበበት አካል, ስም ከ30 ፊደል መብለጥ የለበትም",
      })}
    }

  }


  if (values.suspectPostion) {

    // Allow only letters and spaces (no numbers or special characters)
    if (!/^[a-zA-Z\u1200-\u135A\s']+$/.test(values.suspectPostion)) {
      errors.suspectPostion = "Only letters and spaces are allowed.";
      {i18n.language == 'en' ?  notification["error"]({
        message: "",
        description:
          "suspectPostion, Only letters and spaces are allowed.",
      }) :  notification["error"]({
        message: "",
        description:
          "የስራ ምደብ, ፊደል እና ባዶ ቦታ(space) ብቻ ነው የሚቻለው",
      })}
    } else if (values.suspectPostion.length > 30) {
      errors.yourName = "Name cannot exceed 30 characters.";
      {i18n.language == 'en' ?  notification["error"]({
        message: "",
        description:
          "suspectPostion, cannot exceed 30 characters.",
      }) :  notification["error"]({
        message: "",
        description:
          "የስራ ምደብ, ከ30 ፊደል መብለጥ የለበትም",
      })}
    }

  }

  // if (values.yourAddress) {

  //   // Allow only letters and spaces (no numbers or special characters)
  //   if (!/^[a-zA-Z\u1200-\u135A\s']+$/.test(values.yourAddress)) {
  //     errors.yourAddress= "Only letters and spaces are allowed.";
  //     {i18n.language == 'en' ?  notification["error"]({
  //       message: "",
  //       description:
  //         "yourAddress, Only letters and spaces are allowed.",
  //     }) :  notification["error"]({
  //       message: "",
  //       description:
  //         "አድራሻ, ፊደል እና ባዶ ቦታ(space) ብቻ ነው የሚቻለው",
  //     })}
  //   } else if (values.yourAddress.length > 30) {
  //     errors.yourAddress = "Address cannot exceed 30 characters.";
  //     {i18n.language == 'en' ?  notification["error"]({
  //       message: "",
  //       description:
  //         "yourAddress, Address cannot exceed 30 characters.",
  //     }) :  notification["error"]({
  //       message: "",
  //       description:
  //         "አድራሻ  ከ30 ፊደል መብለጥ የለበትም",
  //     })}
  //   }

  // }



  return errors;
}




// if (!values.name) {
  //   errors.name = "Name is required";
  // }
  // if (!values.phone) {
  //   errors.phone = "phone is required";
  // }
  // if (!values.email) {
  //   errors.email = "Email address is required";
  // } else if (!/\S+@\S+\.\S+/.test(values.email)) {
  //   errors.email = "Email address is invalid";
  // }

  // if(values.email.length != 0 && !/\S+@\S+\.\S+/.test(values.email)){
  //   errors.email = "Email address is invalid";
  // }

  // if (!values.message) {
  //   errors.message = "Message is required";
  // }
  // return errors;