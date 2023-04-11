import React from "react";
import TrashIcon from "../../icons/trash.icon";

type Props = {
  onDropHandler: (event: React.DragEvent) => void;
  dragOverHandler: (event: React.DragEvent) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  hiddenFileInput: React.RefObject<HTMLInputElement>;
  handleUploadButton: () => void;
  handleDeleteClick: (file: File) => void;
  files: File[];
};

export default function FileUploadUI({
  onDropHandler,
  dragOverHandler,
  handleInputChange,
  handleUploadButton,
  hiddenFileInput,
  handleDeleteClick,
  files,
}: Props) {
  const dragOverIcon = (
    <div className="w-full h-full absolute top-0 left-0 pointer-events-none z-50 flex flex-col items-center justify-center rounded-md">
      <i>
        <svg
          className="fill-current w-12 h-12 mb-3 text-blue-700"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z" />
        </svg>
      </i>
      <p className="text-lg text-blue-700">Drop files to upload</p>
    </div>
  );

  let fileList: JSX.Element | JSX.Element[] = (
    <li className="h-full w-full text-center flex flex-col justify-center items-center">
      <img
        className="mx-auto w-32"
        src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
        alt="no data"
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
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASkAAACpCAMAAABAgDvcAAAAWlBMVEXh5urDzdba3+LFz9nf5+rEz9HBy8/S3d/CytHJztHBzNLL19ji6e3R193g5enCzNbGys7O1t7Z4OPa4ejS2t/J0tXV3eXU2dze5u3N0tXa5O69yNHZ4+XF0dKFwnRbAAAC4klEQVR4nO3c63KqMBRAYYLIQY3BCy1yaN//NQ83EQjqHi/TM93r+9GZxtYZ1wRMwDYIAAAAAAAAAAAAAAAAAAAAAAAAADzKRe/ifvqlvVi4fJfwp1/ai4XmXShFKUrdRikpSklRSopSUpSSopTUoFSaPC/VUSp8no5Sixc83YJSQpSSopQUpWa5wAZRVH25oNSVXy52cbwrwksrSs3al93ywvRXgik1w636dWayO3SDlPJZM1hlmqQbpZTHZokZltq2w4pLuWD+FZ8WwylVza9TM6y51CE+zo6no1LGtD+luJRdrhdz9ziP5TiUyZphxaWytTEfkT9+8Eo1iyrFperzdrzxx4/lJJXqOVXtVvbNI0lup49Fy/W4VHuIKi3VH2PpzjtV2c2oVLpQ/t636t/gpqmcG6+nui5aS+WXGitvVmXlYJ3QLTy1lnKDFOU+mJyrbH4+8tKkOA8qLVUMVpdpkgfjaeWCo0nqSZeaz35QZ6mveLxh+fTeAIMwL4p8mERnqY/JOsD42xrv5KWyVG48p7tPp6+UC06JFyrd+8ffhL5Sl0u/Q+vNzA5wRGGpMPVDVamyO0+nsNRqLtRlLe5x7QPqStlsdkrVZq/rBce0XaWrKxUmV0v525pKkZQ6S0Wba52qbc102eXs32pY6Zw6LK+XMmUxXiu4bTP/dJa60alONdrWhKZdTqgslfmLzqHUHPpUUXY+o2ksdbx6Nj9bdgtQ+/XdjyksZYu7peLmbo2z2TLWXCq8few1mm2N2w+TKiwlCFVvayYfTFBYKpveRr+S6jseD+grtZV0qlNNvqeUFKUo1aGUFKWkKCVFKSlKSfmlRAtPj74reXa7fsxW3acXD5vHtH/loKiUs49q7kQoKvUkSklRSopSUipKpeXqeYNPyf7eUq9GKUpR6jZKSVFKilJSlJKilBSlpML4XX5bKffnXX7bf/0GAAAAAAAAAAAAAAAAAAAAAAAA8D/6B0YsNs6SxFarAAAAAElFTkSuQmCC"
              alt={file?.name}
              className="w-full h-full object-cover rounded"
            />
          </article>
          <div className="w-full h-full absolute top-0 bottom-0 left-0 right-0  rounded justify-between items-end p-2 flex transition-opacity hover:bg-black opacity-0 hover:opacity-50">
            <span className="text-white">{fileSize}</span>
            <button
              className="text-white p-1"
              onClick={() => {
                handleDeleteClick(file);
              }}
            >
              <TrashIcon />
            </button>
          </div>
        </li>
      );
    });
  }

  return (
    <div className="bg-gray-500 h-screen w-screen sm:px-8 md:px-16 sm:py-8">
      <main className="container mx-auto max-w-screen-lg h-full">
        <article
          aria-label="File Upload Modal"
          className="relative h-full flex flex-col bg-white shadow-xl rounded-md"
          onDrop={onDropHandler}
          onDragOver={dragOverHandler}
          // ondragleave="dragLeaveHandler(event);"
          // ondragenter="dragEnterHandler(event);"
        >
          {false && dragOverIcon}

          <section className="h-full overflow-auto p-8 w-full flex flex-col">
            <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
              <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                <span>Drag and drop your</span>&nbsp;
                <span>files anywhere or</span>
              </p>
              <input
                type="file"
                className="hidden"
                multiple
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
            <button className="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none">
              Upload now
            </button>
            <button className="ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
              Cancel
            </button>
          </footer>
        </article>
      </main>
    </div>
  );
}
