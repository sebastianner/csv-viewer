import React, { ReactElement } from "react";
import FileUpload from "@/components/file-upload/fileUpload.index";
import OptionsModal from "@/components/optionsModal/optionsModal.index";
type Props = {};

export default function index({}: Props): ReactElement {
  return (
    <OptionsModal>
      <FileUpload />
    </OptionsModal>
  );
}
