import React from "react";
import Image from "next/image";
import { TrashIcon, DragOverIcon } from "@/icons/export.icons";

type Props = {
  onDropHandler: (event: React.DragEvent) => void;
  onDragOverHandler: (event: React.DragEvent) => void;
  onDragLeaveHandler: (event: React.DragEvent) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUploadButton: () => void;
  handleDeleteClick: (file: File) => void;
  handleUploadClick: () => void;
  hiddenFileInput: React.RefObject<HTMLInputElement>;
  dragEnter: boolean;
  files: File[];
};

export default function FileUploadUI({
  onDropHandler,
  onDragOverHandler,
  onDragLeaveHandler,
  handleInputChange,
  handleUploadButton,
  handleDeleteClick,
  handleUploadClick,
  hiddenFileInput,
  dragEnter,
  files,
}: Props) {
  //TODO MOVE ICON TO ICON FOLDER
  const dragOverIcon = <DragOverIcon />;

  let fileList: JSX.Element | JSX.Element[] = (
    <li className="h-full w-full text-center flex flex-col justify-center items-center">
      <Image
        draggable={false}
        className="mx-auto w-32"
        src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
        alt="no data"
        width={100}
        height={100}
        priority
      />
      <span className="text-small text-gray-500">No files selected</span>
    </li>
  );

  if (files.length > 0) {
    fileList = files.map((file, i) => {
      //TODO CHECK IF FILE IS A CSV
      //   const objectURL = URL.createObjectURL(file);
      const fileSize = `${Math.round(file?.size / 1000)} kb`;

      return (
        <li key={i} className="relative">
          <article className="w-40 h-32 bg-cover rounded-lg bg-gray-100 drop-shadow-lg">
            <Image
              src="https://cdn-icons-png.flaticon.com/512/8242/8242984.png"
              alt={file.name}
              className="w-full h-full rounded"
              fill={true}
            />
          </article>
          <div className="w-full h-full absolute top-0 bottom-0 left-0 right-0  rounded justify-between items-end p-2 flex transition-opacity hover:bg-black opacity-0 hover:opacity-50">
            <span className="text-white">{fileSize}</span>
            <button
              className="p-1"
              onClick={() => {
                handleDeleteClick(file);
              }}
            >
              <TrashIcon />
            </button>
          </div>
        </li>
        // <span className="text-black">{file.name}</span>
      );
    });
  }

  return (
    <>
      <article
        aria-label="File Upload Modal"
        className="relative h-full flex flex-col bg-white shadow-xl rounded-md"
        onDrop={onDropHandler}
        onDragOver={onDragOverHandler}
        onDragLeave={onDragLeaveHandler}
      >
        {dragEnter && (
          <div className="w-full h-full absolute top-0 left-0 pointer-events-none z-50 flex flex-col items-center justify-center rounded-md backdrop-blur-sm">
            {dragOverIcon}
            <p className="text-lg text-blue-700">Drop files to upload</p>
          </div>
        )}

        <section className="h-full overflow-auto p-8 w-full flex flex-col">
          <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
            <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
              <span>Drag and drop your</span>&nbsp;
              <span>files anywhere or</span>
            </p>
            <input
              type="file"
              className="hidden"
              multiple={false}
              ref={hiddenFileInput}
              onChange={handleInputChange}
            />
            <button
              className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
              onClick={handleUploadButton}
            >
              Upload a file
            </button>
          </header>
          <h1 className="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
            To Upload
          </h1>

          <ul className="flex flex-wrap -m-1 gap-x-2.5">{fileList}</ul>
        </section>

        <footer className="flex justify-end px-8 pb-8 pt-4">
          <button
            onClick={handleUploadClick}
            className="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none"
          >
            Upload now
          </button>
          <button className="ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
            Cancel
          </button>
        </footer>
      </article>
    </>
  );
}
