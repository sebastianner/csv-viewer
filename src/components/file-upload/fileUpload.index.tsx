"use client";

import React, {
  ChangeEvent,
  DragEvent,
  useRef,
  useState,
  MouseEvent,
} from "react";
import FileUploadUI from "./fileUploadUI";

type Props = {};

export default function FileUpload({}: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const dropHandler = (event: DragEvent): void => {
    console.log(event);
  };
  const dragOverHandler = (event: DragEvent): void => {
    console.log(event);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const filesUploaded = event?.target?.files;

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
      dropHandler={dropHandler}
      dragOverHandler={dragOverHandler}
      handleInputChange={handleInputChange}
      hiddenFileInput={hiddenFileInput}
      handleUploadButton={handleUploadButton}
      handleDeleteClick={handleDeleteClick}
      files={files}
    />
  );
}
