"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UploadModal() {
  const [modalOpen, setModalOpen] = useState(false);
  const [percent, setPercent] = useState(0);
  const [file, setFile] = useState<Blob>();
  const handleOpen = () => {
    setPercent(0)  
    setModalOpen(true)
  };
  const handleClose = () => setModalOpen(false);

  const onChange = (event: { target: { files: any[] } }) => {
    setFile(event.target.files[0]);
  };

  const onUpload = () => {
    if (!file) return;

    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ); // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        setModalOpen(false)
      }
    );
  };

  return (
    <div>
      <Button onClick={handleOpen}>Belge Yükle</Button>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div id="uploadFile" className="flex">
            <input
              className="p-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              accept=".pdf"
              onChange={onChange}
            />

            <button
              type="submit"
              onClick={onUpload}
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-15 mt-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Upload Files
            </button>
            <p>{percent} % done</p>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
