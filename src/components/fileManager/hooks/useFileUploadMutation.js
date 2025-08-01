import { useFileManagerStore } from "./useFileManagerStore";
// import { ExtendedFile } from "../types/extendedFile";
import { httpClient } from "../../shared/httpClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useFileUploadMutation() {
  const updateUploadProgress = useFileManagerStore(
    (state) => state.updateUploadProgress
  );
  const updateUploadStatus = useFileManagerStore(
    (state) => state.updateUploadStatus
  );
  const appendFiles = useFileManagerStore((state) => state.appendFiles);
  const uplodedFileLink =   useFileManagerStore((state) => state.uplodedFileLink);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (files) => {
      const uploadPromises = files.map(async (file) => {
        if (file.uploadStatus === "idle") {
          updateUploadStatus(file.id, "Received");

          const formData = new FormData();
          formData.append("file", file.file);

          return httpClient
            .post(`${process.env.REACT_APP_BACKEND_MEDIA_URL}/upload`, formData, {
            // .post(`${process.env.REACT_APP_BACKEND_MEDIA_URL}/test`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                "X-Security-Token": process.env.REACT_APP_nodeXSecurity
              },
              onUploadProgress: (event) => {
                if (event.lengthComputable && event.total) {
                  const percentComplete = Math.round(
                    (event.loaded / event.total) * 100
                  );
                  updateUploadProgress(file.id, percentComplete);
                }
              },
            })
            .then(res => {
                updateUploadStatus(file.id, "success");
                const filePath = res.data.data.filePath;
                uplodedFileLink(file.id, filePath)
                return true;
              })
            .catch((err) => {
              console.log("error", err)
              updateUploadStatus(file.id, "error");
              return false;
            });
        }
        // return Promise.resolve();
        return true;
      });

      // await Promise.all(uploadPromises);

      // Wait for all uploads to complete (including potential errors)
      const uploadResults = await Promise.all(uploadPromises);
  
      // Check if all uploads were successful
      const allUploadedSuccessfully = uploadResults.every((result) => result === true);
  
      // console.log("All files uploaded correctly:", allUploadedSuccessfully);
  
      // return allUploadedSuccessfully; // Return true or false based on success
    },
    onMutate: (variables) => {
      appendFiles(variables.map((item) => item.file));
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["files"] });
    },
  });
}
