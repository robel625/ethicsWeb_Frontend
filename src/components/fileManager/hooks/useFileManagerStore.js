// // import { ExtendedFile } from "../types/extendedFile";
// import { create } from "zustand";
// import { ExtendedFile } from "../types/ExtendedFile";

// type FileState = {
//   files: ExtendedFile[];
//   selectedFileIds: string[];
// };

// type FileActions = {
//   removeFile: (id: string) => void;
//   appendFiles: (acceptedFiles: File[]) => void;
//   updateUploadProgress: (id: string, uploadProgress: number) => void;
//   updateUploadStatus: (
//     id: string,
//     uploadStatus: ExtendedFile["uploadStatus"]
//   ) => void;
//   updateSelectedFileIds: (ids: string[]) => void;
// };

// type FileSlice = FileState & FileActions;

// export const useFileManagerStore = create<FileSlice>()((set) => ({
//   files: [],
//   selectedFileIds: [],
//   removeFile: (id) =>
//     set((state) => ({
//       files: state.files.filter((file) => file.id !== id),
//     })),

//   appendFiles: (acceptedFiles) =>
//     set((state) => {
//       const notDuplicatedNewFiles: ExtendedFile[] = acceptedFiles
//         .filter((file) => {
//           const isDuplicate = state.files.some(
//             (subItem) => subItem.id === `${file.name}${file.size}`
//           );
//           return !isDuplicate;
//         })
//         .map((file) => ({
//           file,
//           id: `${file.name}${file.size}`,
//           uploadStatus: "idle",
//           uploadProgress: 0,
//         }));

//       return {
//         files: [...state.files, ...notDuplicatedNewFiles],
//       };
//     }),

//   updateUploadProgress: (id, uploadProgress) =>
//     set((state) => ({
//       files: state.files.map((file) =>
//         file.id === id ? { ...file, uploadProgress } : file
//       ),
//     })),

//   updateUploadStatus: (id, uploadStatus) =>
//     set((state) => ({
//       files: state.files.map((file) =>
//         file.id === id ? { ...file, uploadStatus } : file
//       ),
//     })),
//   updateSelectedFileIds: (ids) =>
//     set(() => ({
//       selectedFileIds: ids,
//     })),
// }));


import { create } from "zustand";

export const useFileManagerStore = create((set) => ({
  files: [],
  selectedFileIds: [],
  allStatus : null,


    removeFile: (id) =>
      set((state) => {
        const updatedFiles = state.files.filter((file) => file.id !== id);
  
        // Determine the overall status after removing the file
        const allStatus = updatedFiles.some((file) => file.uploadStatus === "Received")
          ? "Received"
          : updatedFiles.some((file) => file.uploadStatus === "error")
          ? "error"
          : "success";
  
        return {
          files: updatedFiles,
          allStatus,
        };
      }),

    removeAllFile: () => 
      set((state) => {
        return {
          files: [],
          selectedFileIds: [],
          allStatus : null,
        };
      }),


    updateUploadStatus: (id, uploadStatus) => 
      set((state) => {
        const updatedFiles = state.files.map((file) =>
          file.id === id ? { ...file, uploadStatus } : file
        );
  
        // Determine the overall status
        const allStatus = updatedFiles.some((file) => file.uploadStatus === "Received")
          ? "Received"
          : updatedFiles.some((file) => file.uploadStatus === "error")
          ? "error"
          : "success";
  
        return {
          files: updatedFiles,
          allStatus,
        };
      }),

  appendFiles: (acceptedFiles) =>
    set((state) => {
      const notDuplicatedNewFiles = acceptedFiles
        .filter((file) => {
          const isDuplicate = state.files.some(
            (subItem) => subItem.id === `${file.name}${file.size}`
          );
          return !isDuplicate;
        })
        .map((file) => ({
          file,
          id: `${file.name}${file.size}`,
          uploadStatus: "idle",
          uploadProgress: 0,
        }));

      return {
        files: [...state.files, ...notDuplicatedNewFiles],
      };
    }),

  updateUploadProgress: (id, uploadProgress) =>
    set((state) => ({
      files: state.files.map((file) =>
        file.id === id ? { ...file, uploadProgress } : file
      ),
    })),

  // updateUploadStatus: (id, uploadStatus) =>
  //   set((state) => ({
  //     files: state.files.map((file) =>
  //       file.id === id ? { ...file, uploadStatus } : file
  //     ),
  //   })),

  updateUploadStatus: (id, uploadStatus) => 
    set((state) => {
      const updatedFiles = state.files.map((file) =>
        file.id === id ? { ...file, uploadStatus } : file
      );

      // Determine the overall status
      const allStatus = updatedFiles.some((file) => file.uploadStatus === "Received")
        ? "Received"
        : updatedFiles.some((file) => file.uploadStatus === "error")
        ? "error"
        : "success";

      return {
        files: updatedFiles,
        allStatus,
      };
    }),
    
  updateSelectedFileIds: (ids) =>
    set(() => ({
      selectedFileIds: ids,
    })),

  uplodedFileLink: (id, filePath) =>
    set((state) => ({
      files: state.files.map((file) =>
        file.id === id ? { ...file, filePath } : file
      ),
    })),

}));
