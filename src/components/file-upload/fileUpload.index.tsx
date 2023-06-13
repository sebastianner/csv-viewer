"use client";

import React, { useRef, useState } from "react";
import FileUploadUI from "./fileUploadUI";

type Props = {};

export default function FileUpload({}: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [dragEnter, setDragEnter] = useState<boolean>(false);
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
    setDragEnter(false);
  };
  const onDragOverHandler = (event: React.DragEvent): void => {
    event.preventDefault();
    setDragEnter(true);
  };

  const onDragLeaveHandler = (event: React.DragEvent) => {
    //review event.relatedTarget
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setDragEnter(false);
    }
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

  const handleUploadClick = async () => {
    if (files.length > 0) {
      const formData = new FormData();
      for (const file of files) {
        formData.append(file?.name, file, file?.name);
      }
      const csvToJson = await fetch("/api/submit", {
        method: "POST",
        body: formData,
      });

      console.log(await csvToJson.json());
    }

    //todo more than one file
  };

  return (
    <FileUploadUI
      onDropHandler={onDropHandler}
      onDragOverHandler={onDragOverHandler}
      onDragLeaveHandler={onDragLeaveHandler}
      handleInputChange={handleInputChange}
      handleUploadButton={handleUploadButton}
      handleDeleteClick={handleDeleteClick}
      handleUploadClick={handleUploadClick}
      hiddenFileInput={hiddenFileInput}
      dragEnter={dragEnter}
      files={files}
    />
  );
}
