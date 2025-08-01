import { useCallback, useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUpload, faFile } from "@fortawesome/free-solid-svg-icons";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/solid";
// import { useForm } from "./utils/useForm2";
// import validate from "./utils/validationRules";
import { notification } from "antd";
import { withTranslation } from "react-i18next";
import { Stack } from "@mui/material";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { UploadProgressCard } from "./fileManager/components/UploadProgressCard";
import { useFileManagerStore } from "./fileManager/hooks/useFileManagerStore";
import { useFileUploadMutation } from "./fileManager/hooks/useFileUploadMutation";
import i18n from "../translation";
// import FormContext from "../Contexts/FormContext";

const Dropzone = ({ className, setFormState, t }) => {
  // const [files, setFiles] = useState([]);
  // const [rejected, setRejected] = useState([]);
  const [totalFileSize, setTotalFileSize] = useState(0);
  const [maximumFiles, setMaximumFiles] = useState(0);

  const files = useFileManagerStore((state) => state.files);

  const [autoAnimateRef] = useAutoAnimate();

  const fileUploadMutation = useFileUploadMutation();

  

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    let newTotalFileSize = totalFileSize;
    let newMaximumFiles = maximumFiles;
    
    

    // Filter accepted files based on allowed extensions
    const filteredFiles = acceptedFiles.filter((file) => {
      // const allowedExtensions = ['png', 'jpg', 'jpeg', 'pdf', 'gif', 'bmp', 'webp', 'svg', 'mp4', 'mov', 'avi', 'webm', 'mp3', 'wav', 'aac', 'ogg', 'flac', 'txt', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'zip', 'rar', '7z'];
      const allowedExtensions = ['png', 'jpg', 'jpeg', 'pdf', 'mp4', 'mov', 'avi', 'webm', 'mp3', 'm4a', 'wav', 'aac', 'ogg', 'flac', 'txt', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx',]; // Case-insensitive extensions
      const extension = file.name.split('.').pop().toLowerCase();
      return allowedExtensions.includes(extension);
    });

    filteredFiles.forEach((file) => {
      newTotalFileSize += file.size;
      newMaximumFiles += 1
    });

    // Handle rejected files due to invalid extensions
    const rejectedByType = acceptedFiles.filter(
      (file) => !filteredFiles.includes(file)
    );

    if (rejectedByType.length) {
      // Provide informative error message(s)
      const rejectedFileNames = rejectedByType.map((file) => file.name).join(', ');

      {i18n.language == 'en' ?  notification["error"]({
        message: "",
        description: `File Types Not Accepted: ${rejectedFileNames}`,
      }) :  notification["error"]({
        message: "",
        description: `${rejectedFileNames} ፋይል አይነት አልተፈቀደም`,
      })}
    }

    const MAX_TOTAL_SIZE = 50 * 1024 * 1024; // 50 MB

    if (newTotalFileSize > MAX_TOTAL_SIZE) {
      // Handle exceeding total size limit
      console.error("Total files exceed the maximum size limit of 50MB.");

      {i18n.language == 'en' ?  notification["error"]({
        message: "",
        description: "Total files exceed the maximum size limit of 50MB.",
      }) :  notification["error"]({
        message: "",
        description: `የፋይል መጠን ከ50MB መብለጥ የለበትም`,
      })}
      return;
    }

    if (newMaximumFiles > 5) {

      {i18n.language == 'en' ?  notification["error"]({
        message: "",
        description: `Only 5 files are allowed.`,
      }) :  notification["error"]({
        message: "",
        description: `ከ5 ፋይል በላይ መብለጥ የለበትም`,
      })}
      return;
    }
    

    setTotalFileSize(newTotalFileSize);
    setMaximumFiles(newMaximumFiles)

    fileUploadMutation.mutate(
      filteredFiles.map((item) => ({
        file: item,
        id: `${item.name}${item.size}`,
        uploadProgress: 0,
        uploadStatus: "idle",
      }))
    );

    

  }, [totalFileSize]);

  


const { getRootProps, getInputProps } = useDropzone({
  accept: {
    "*/*": [],
  },
  onDrop,
  maxFiles: 3,

  // accept: {
  //   "image/*": [],
  //   "video/*": [],
  // },
  // onDrop,
  // maxFiles: 15,
  // maxSize: 50 * 1024 * 1024,
});

return (
  <form
  // onSubmit={handleSubmit}
  >
    <div
      {...getRootProps({
        className: className,
      })}
      style={{
        padding: '1rem',
        marginTop: '1rem',
        border: '2px dashed #e5e7eb'
      }}
    >
      <input {...getInputProps()} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

        <>
          <FontAwesomeIcon
            icon={faCloudUpload}
            size="3x"
            className="fa-fw "
          />
          <div>{t("Upload Your files")}</div>
          <div>
            Drag a file here or{" "}
            <span className=" text-blue-700">browse</span> for a file to
            upload.
          </div>
          <div> maximum size limit 50MB</div>
        </>
      </div>
    </div>

    <Stack sx={{ gap: 2, width: 1 }} ref={autoAnimateRef}>
      {files.map((file) => (
        <Stack key={file.id}>
          <UploadProgressCard {...file} />
        </Stack>
      ))}
    </Stack>
  </form>
);
};

export default withTranslation()(Dropzone);

// import React, { useCallback, useState } from 'react';
// import { useDropzone } from 'react-dropzone';

// function Dropzone ({ className }) {
//   const [acceptedFiles, setAcceptedFiles] = useState([]);

//   const onDrop = useCallback(acceptedFiles => {
//     setAcceptedFiles(acceptedFiles);
//   }, []);

//   console.log(acceptedFiles)

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     accept: '*/*', // Example: Accept all image types
//     onDrop,
//   });

//   return (
//     <div {...getRootProps()}>
//       <input {...getInputProps()} />
//       {isDragActive ? (
//         <p>Drag & drop files here...</p>
//       ) : (
//         <p>
//           Drag & drop some files here, or click to select files (Only images allowed).
//         </p>
//       )}
//       <ul>
//         {acceptedFiles.map(file => (
//           <li key={file.path}>
//             {file.path} - {file.size} bytes
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Dropzone
