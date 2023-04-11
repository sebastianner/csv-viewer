"use client";

import React, { ChangeEvent, DragEvent, useRef } from "react";
import FileUploadUI from "./fileUploadUI";

type Props = {};

export default function FileUpload({}: Props) {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const dropHandler = (event: DragEvent): void => {
    console.log(event);
  };
  const dragOverHandler = (event: DragEvent): void => {
    console.log(event);
  };

  const inputHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("here");

    const fileUploaded = event?.target?.files?.[0];
    // if (fileUploaded) {
    //   props.handleFile(fileUploaded);
    // }
  };

  const handleButtonClick = () => {
    if (hiddenFileInput.current) {
      console.log(hiddenFileInput);

      hiddenFileInput.current.click();
    }
  };

  return (
    <FileUploadUI
      dropHandler={dropHandler}
      dragOverHandler={dragOverHandler}
      handleChange={inputHandleChange}
      hiddenFileInput={hiddenFileInput}
      handleButtonClick={handleButtonClick}
    />
  );
}
