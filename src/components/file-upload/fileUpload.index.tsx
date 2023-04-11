"use client";

import React, { useRef, useState } from "react";
import FileUploadUI from "./fileUploadUI";

type Props = {};

export default function FileUpload({}: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const onDropHandler = (event: React.DragEvent): void => {
    event.preventDefault();
    console.log(event);
  };
  const dragOverHandler = (event: React.DragEvent): void => {
    // console.log(event);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filesUploaded = event?.target?.files;
    console.log(filesUploaded);

    if (filesUploaded) {
      const newFiles = Array.from(filesUploaded).filter(
        (file) => file !== null
      );
      setFiles([...files, ...newFiles]);
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
      dragOverHandler={dragOverHandler}
      handleInputChange={handleInputChange}
      hiddenFileInput={hiddenFileInput}
      handleUploadButton={handleUploadButton}
      handleDeleteClick={handleDeleteClick}
      files={files}
    />
  );
}
