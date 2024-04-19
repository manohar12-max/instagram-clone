import { useState } from "react";
import useShowToast from "./useShowToast";

const usePreviewImg = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const showToast = useShowToast();
  const maxFileSizeInBytes = 5 * 1024 * 1024; // 5MB

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      //check if the file is present and file type is image
      if (file.size > maxFileSizeInBytes) {
        showToast("Error", "File size must be less than 2MB", "error");
        setSelectedFile(null);
        return;
      }
      const reader = new FileReader();
      // The FileReader object lets web applications asynchronously read the contents
	 //of files (or raw data buffers) stored on the user's computer, using File or
    // Blob objects to specify the file or data to read.
      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      showToast("Error", "Please select an image file", "error");
      setSelectedFile(null);
    }
  };

  return { selectedFile, handleImageChange, setSelectedFile };
};

export default usePreviewImg;
