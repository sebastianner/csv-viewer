"use client";

import React, { useRef, useState } from "react";
import FileUploadUI from "./fileUploadUI";

type Props = {};

export default function FileUpload({}: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const onDropHandler = (event: React.DragEvent): void => {
    event.preventDefault();
    const dragFiles = event.dataTransfer.files;
    //create array based on dragFles object and then filter it's contents to make sure there is non null
    const dragFileArray = Array.from(dragFiles).filter((file) => file !== null);
    //check if the file is already loaded
    let fileRepeated = false;
    for (const dragFile of dragFileArray) {
      const findRepeated = files.some((file) => file.name === dragFile.name);
      if (findRepeated) {
        fileRepeated = true;
        alert("Repeated file");
        break;
      }
    }
    if (!fileRepeated) {
      setFiles([...files, ...dragFileArray]);
    }
  };
  const ondragOverHandler = (event: React.DragEvent): void => {
    event.preventDefault();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filesUploaded = event?.target?.files;
    if (filesUploaded) {
      const uploadedFiles = Array.from(filesUploaded).filter(
        (file) => file !== null
      );
      //create array based on filesUploaded object and then filter it's contents to make sure there is non null
      let fileRepeated = false;
      for (const uploadedFile of uploadedFiles) {
        const findRepeated = files.some(
          (file) => file.name === uploadedFile.name
        );
        if (findRepeated) {
          fileRepeated = true;
          alert("repeated file");
          break;
        }
      }
      if (!fileRepeated) {
        setFiles([...files, ...uploadedFiles]);
        event.target.value = "";
      }
    }
  };

  const handleUploadButton = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const handleDeleteClick = (file: File) => {
    if (hiddenFileInput.current !== null) {
      hiddenFileInput.current.value = "";
    }

    const deleteFile = files.filter((e) => e !== file);
    setFiles([...deleteFile]);
  };

  return (
    <FileUploadUI
      onDropHandler={onDropHandler}
      ondragOverHandler={ondragOverHandler}
      handleInputChange={handleInputChange}
      hiddenFileInput={hiddenFileInput}
      handleUploadButton={handleUploadButton}
      handleDeleteClick={handleDeleteClick}
      files={files}
    />
  );
}
