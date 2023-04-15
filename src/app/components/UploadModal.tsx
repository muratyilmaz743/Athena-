"use client";

import CloseIcon from "@mui/icons-material/Close";
import { IconButton, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {
  ref,
  StorageReference,
  updateMetadata,
  uploadBytesResumable
} from "firebase/storage";
import * as React from "react";
import { useState } from "react";
import { storage } from "../../firebase";

export default function UploadModal() {
  const [modalOpen, setModalOpen] = useState(false);
  const [percent, setPercent] = useState(0);
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<Blob>();
  const handleOpen = () => {
    setPercent(0);
    setModalOpen(true);
  };

  const handleClose = () => setModalOpen(false);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const updateCategory = (documentRef: StorageReference, category: string) => {
    const newMetadata = {
      customMetadata: {
        category: category,
      },
    };
    updateMetadata(documentRef, newMetadata);
  };

  const onUpload = () => {
    debugger;

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
        updateCategory(storageRef, category);
        setModalOpen(false);
      }
    );
  };

  return (
    <div>
      <Button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3"
        onClick={handleOpen}
      >
        Belge Yükle
      </Button>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        className="flex items-center justify-center"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="bg-white shadow-md px-8 py-6 outline-none rounded-md max-w-md w-full">
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            className="relative left-[23rem] bottom-[1rem]"
          >
            <CloseIcon />
          </IconButton>
          <h2 id="modal-title" className="text-2xl font-bold mb-4">
            Upload File
          </h2>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            className="mb-4"
          />
          <input
            type="file"
            className="mb-4"
            accept=".pdf"
            onChange={onFileChange}
          />
          <p>{percent} % done</p>

          <Button
            type="submit"
            onClick={onUpload}
            variant="contained"
            color="primary"
            fullWidth
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
          >
            Upload
          </Button>
        </div>
      </Modal>
    </div>
  );
}
