import { useContext, useEffect, useState } from "react";
import { notification } from "antd";
import axios from "axios";
// import { start } from "repl";
import FormContext from "../../Contexts/FormContext";
import i18n from "../../translation";
import { useFileManagerStore } from "../fileManager/hooks/useFileManagerStore";
import { setTicket } from "../../redux/userSlice";
import { useSelector, useDispatch } from 'react-redux'




const initialValues = {
  yourName: "",
  yourPhone: "",
  yourEmail: "",
  yourAddress: "",
  report: "",
  date: "",
  CSC: "",
  location: "",
  category: '',

  suspectName: "",
  suspectPostion: "",
  suspectPhone: "",

  File: [],

};

export const useForm = (validate) => {
  const [formState, setFormState] = useState({
    values: { ...initialValues },
    errors: { ...initialValues },
  });

  const dispatch = useDispatch()

  const [totalFileSize, setTotalFileSize] = useState(0);

  const { setUpload } = useContext(FormContext)

  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState('');

  // console.log('msg', msg)
  let file1 = ''

  const files = useFileManagerStore((state) => state.files);
  const allStatus = useFileManagerStore((state) => state.allStatus);
  const [UseEffectUploading, setUseEffectUploading] = useState(false); // Track if uploading
  // const [uploadResult, setUploadResult] = useState(null); // Track the upload result


  // console.log(
  //   "files Status", files
  // )

  // console.log(
  //   "files allStatus", allStatus
  // )

  useEffect(() => {
    // console.log("useEffect waiting", allStatus);
    if (UseEffectUploading) {
      if (allStatus === "success") {
        // setUploadResult(allStatus)
        submitToDjango("advance")
      }
    }
  }, [allStatus])

  // const waitForUploadCompletion = async () => {
  //   while (uploading) {
  //     console.log("waiting", allStatus);
  //     if (allStatus === "success" || allStatus === "error") {
  //       setUploadResult(allStatus); // Set the result based on allStatus
  //       setUploading(false); // Stop waiting
  //       break; // Exit the loop
  //     }
  //     await sleep(3000); // Wait for 3 seconds before checking again
  //   }
  // };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUpload(false);
    const values = formState.values;
    const errors = validate(values);
    setFormState((prevState) => ({ ...prevState, errors }));


    // const url = process.env.REACT_APP_API_KEY 

    try {
      if (Object.values(errors).every((error) => error === "")) {
        if (files?.length) {
          if (allStatus == "Received") {
            setUseEffectUploading(true);
            notification["info"]({
              message: "",
              description: "Send: uploading attachments...",
            });
          } // Start the upload process
          else {
            submitToDjango("normal")
          }

        }
        else {
          submitToDjango("normal")
        }


        // const formdata = new FormData();
        // // console.log("file1 GGGGGGGGGGGGGG", values )
        // if (values.File?.length){
        //   values.File.forEach(file => formdata.append('attachments', file))
        // }
        // formdata.append('full_name', values.yourName)
        // formdata.append("email", values.yourEmail)
        // formdata.append("phone_number", values.yourPhone)
        // formdata.append("address", values.yourAddress)

        // // formdata.append("location", locationInfo.CSC ? locationInfo.CSC : locationInfo.District ? locationInfo.District
        // //   : locationInfo.Region ? locationInfo.Region : "" )
        // formdata.append("location", values.location )
        // // formdata.append("incident_happend_Date", locationInfo.incident_date ? locationInfo.incident_date: "")
        // values.date && formdata.append("incident_happend_Date", values.date)
        // // formdata.append("eeu_office", values.CSC)
        // {i18n.language == 'en' ? formdata.append("eeu_office", values.CSC) : formdata.append("eeu_office", '-')};

        // formdata.append("report_detail", values.report)
        // formdata.append("category", values.category)

        // formdata.append("suspicious_name", values.suspectName)
        // formdata.append("suspicious_position", values.suspectPostion)
        // formdata.append("suspicious_phone", values.suspectPhone)

        // setMsg("Uploading...")
        // setProgress(prevState => {
        //   return {...prevState, started: true}
        // })
        // axios.post(url,formdata,{
        //   onUploadProgress: (progressEvent) => { setProgress(prevState => {
        //     return {...prevState, pc: Math.floor(progressEvent.progress *100)}
        //   })},
        //   headers: {
        //     "Content-Type": "multipart/form-data"
        //            }
        // })
        // .then(res => {
        //   setMsg("Upload succcessful")
        //     event.target.reset();
        //   setFormState(() => ({
        //     values: { ...initialValues },
        //     errors: { ...initialValues },
        //   }));
        //   setUpload(true);
        //   // setProgress(prevState => {
        //   //   return {...prevState, pc: 100}
        //   // })
        //   setProgress({ started: false, pc: 0 })

        //   notification["success"]({
        //     message: "Success",
        //     description: "Your message has been sent!",
        //   });
        //  })
        //   // console.log(res.data)})
        // .catch(err => {
        //   setProgress({ started: false, pc: 0 })
        //   if (err.code === 'ERR_NETWORK') {
        //     setMsg("Network error");
        //     notification["error"]({
        //       message: "Error",
        //       description:
        //         "There was a network error. Please check your internet connection and try again later.",
        //     });
        //   }else {
        //     //  setMsg("upload failed")
        //     //  notification["error"]({
        //     //        message: "Error",
        //     //        description:
        //     //          "There was an error sending your report, please try again later.",
        //     //      });
        //     //  console.error("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", err)
        //     setMsg("Upload succcessful")
        //     event.target.reset();
        //     setFormState(() => ({
        //       values: { ...initialValues },
        //       errors: { ...initialValues },
        //     }));
        //     setUpload(true);
        //     notification["success"]({
        //       message: "Success",
        //       description: "Your message has been sent succcessfully!",
        //     });
        //   }


        // })
      }
    } catch (error) {
      notification["error"]({
        message: "Error",
        description: "Failed to submit form. Please try again later.",
      });
    }

  };

  const removeAllFile = useFileManagerStore((state) => state.removeAllFile);

  const submitToDjango = async (bbb) => {
    // console.log("submitToDjango----------------------------------------------------", bbb, allStatus)

    if (allStatus == "error") {
      notification["error"]({
        message: "Error",
        description: "attachment error",
      });
      return
    }

    let fileLink = ''
    if (files?.length) {
      fileLink = files.map((file) => {
        const { filePath, id } = file;
        return { filePath, fileName: id };
      });
    }
    // console.log("fileLink--------------", fileLink)

    setUpload(false);
    const values = formState.values;
    const errors = validate(values);
    setFormState((prevState) => ({ ...prevState, errors }));


    const url = `${process.env.REACT_APP_API_KEY}/api/mail/createmail/`;

    const data = {
      "full_name": values.yourName,
      "phone_number": values.yourPhone,
      "email": values.yourEmail,
      "address": values.yourAddress,
      "location": values.location,
      "eeu_office": values.CSC,
      "incident_happend_Date": values.date,
      "category": values.category,
      "report_detail": values.report,
      "suspicious_name": values.suspectName,
      "suspicious_position": values.suspectPostion,
      "suspicious_phone": values.suspectPhone,
      "attachments": fileLink,
      "from_which": "web"
    }

    setMsg("Uploading...");
    setProgress((prevState) => ({ ...prevState, started: true }));

    axios
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",
          "X-Security-Token": process.env.REACT_APP_DjangoXSecurity
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent && progressEvent.loaded && progressEvent.total) {
            const percentCompleted = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
            setProgress((prevState) => ({ ...prevState, pc: percentCompleted }));
          }
        }
      })
      .then((res) => {
        setMsg("Upload successful");
        dispatch(setTicket(res.data.case_ID))
        // event.target.reset();
        setFormState(() => ({
          values: { ...initialValues },
          errors: { ...initialValues },
        }));
        removeAllFile()
        setUpload(true);
        setProgress({ started: false, pc: 0 });
        notification.success({
          message: "Success",
          description: `Your message has been sent! Ticket Number: ${res.data.case_ID}`,
        });
      })
      .catch((err) => {
        console.log("err-------------------------------",err)
        setProgress({ started: false, pc: 0 });
        setMsg("Upload failed");

        if (err.message === "Network Error") {
          notification.error({
            message: "Error",
            description:
              "There was a network error. Please try again later.",
          });
        } else {
          notification.error({
            message: "Error",
            description: "There was an error sending your report, please try again later.",
          });
        }

        // console.error("Upload Error:", err);
        console.error("Upload Error:", "err");
      });
  }


  const handleChange = (
    event
  ) => {
    event.persist();
    const { name, value } = event.target;
    const formattedValue = (name === "yourPhone" || name === "suspectPhone") ? value.replace(/[^+\d]/g, "") : value;
    setFormState((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        [name]: formattedValue,
      }, 
      errors: {
        ...prevState.errors,
        [name]: "",
      },
    }));
  };

  return {
    handleChange,
    handleSubmit,
    setFormState,
    setProgress,
    values: formState.values,
    errors: formState.errors,
    progress,
    msg,
  };
};
