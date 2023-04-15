"use client";

import {
  ref,
  getMetadata,
  getDownloadURL,
  list,
  StorageReference,
} from "firebase/storage";
import { storage } from "../../firebase";
import { useEffect, useState } from "react";
import ListedDocumentItem from "./ListedDocumenItem";
import { DocumentProps } from "../utils/models/DocumentProps";
import { formatBytes } from "../utils/sizeFormat";
import { PageToken } from "../utils/models/PageToken";
import { documentLister } from "../constants/variables";
import UploadModal from "./UploadModal";

export default function DocumentLister() {
  const [files, setFiles] = useState<DocumentProps[]>([]);
  const [pageToken, setPageToken] = useState<PageToken>({
    maxResults: documentLister.listingResult,
  });

  const listRef = ref(storage, "files/");

  const getNextPage = async () => {
    getListedDocument();
  };

  const addDocuments = (documents: StorageReference[]) => {
    documents.forEach((document) => {
      const documentReference = ref(storage, document.fullPath);
      getMetadata(documentReference).then((res) => {
        getDownloadURL(documentReference).then((url) => {
          setFiles((currentFiles) => [
            ...currentFiles,
            {
              name: res.name,
              category: !!res.customMetadata
                ? res.customMetadata?.category
                : "Yok",
              size: formatBytes(res.size),
              type: res.contentType,
              url: url,
            },
          ]);
        });
      });
    });
  };

  const getListedDocument = async () => {
    await list(listRef, pageToken).then((res) => {
      !res.nextPageToken
        ? document.getElementById("nextPageBtn")?.setAttribute("disabled", "")
        : "";
      addDocuments(res.items);
      setPageToken({
        maxResults: documentLister.listingResult,
        pageToken: res.nextPageToken,
      });
    });
  };

  useEffect(() => {
    getListedDocument();
  }, []);

  /**
   * bucket
    : 
    "athena-dms.appspot.com"
    cacheControl
    : 
    undefined
    contentDisposition
    : 
    "inline; filename*=utf-8''Murat+Y%C4%B1lmaz+RESUME-1.pdf"
    contentEncoding
    : 
    "identity"
    contentLanguage
    : 
    undefined
    contentType
    : 
    "application/pdf"
    customMetadata
    : 
    undefined
    fullPath
    : 
    "files/Murat+Yılmaz+RESUME-1.pdf"
    generation
    : 
    "1679392154958597"
    md5Hash
    : 
    "NujMqYjC0wc83xNhlA/1CQ=="
    metageneration
    : 
    "1"
    name
    : 
    "Murat+Yılmaz+RESUME-1.pdf"
    size
    : 
    445953
    timeCreated
    : 
    "2023-03-21T09:49:15.073Z"
    type
    : 
    "file"
    updated
    : 
    "2023-03-21T09:49:15.073Z"
   */
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <UploadModal />
      <div className="relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {/* <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th> */}
              <th scope="col" className="px-6 py-3">
                Belge Adı
              </th>
              <th scope="col" className="px-6 py-3">
                Kategori
              </th>
              <th scope="col" className="px-6 py-3">
                Boyut
              </th>
              <th scope="col" className="px-6 py-3">
                Dosya Tipi
              </th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <ListedDocumentItem
                key={file.name}
                name={file.name}
                category={file.category}
                size={file.size}
                type={file.type}
                url={file.url}
              />
            ))}
          </tbody>
        </table>
        <div className="grid width-100 justify-center items-center align-middle">
          <nav
            className="flex items-center justify-between pt-4"
            aria-label="Table navigation"
          >
            {" "}
            <ul className="inline-flex items-center -space-x-px">
              <li>
                <button
                  id="nextPageBtn"
                  onClick={getNextPage}
                  className="bg-blue-500 hover:bg-blue-700 mb-4 text-white font-bold py-2 px-4 rounded disabled:bg-gray-600 disabled:text-gray-500"
                >
                  Next Page
                </button>
              </li>
            </ul>
          </nav>
          {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded my-4 mx-12">
          Seçilenleri İndir
        </button> */}
        </div>
      </div>
    </div>
  );
}
