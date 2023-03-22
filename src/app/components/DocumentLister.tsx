"use client";

import { ref, listAll, getMetadata, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { useEffect, useState } from "react";
import ListedDocumentItem from "./ListedDocumenItem";
import { DocumentProps } from "../utils/models/DocumentProps";
import { formatBytes } from "../utils/sizeFormat";

export default function DocumentLister() {
  const [files, setFiles] = useState<DocumentProps[]>([]);

  const listRef = ref(storage, "files/");

  useEffect(() => {
    listAll(listRef).then((res) => {
      res.items.forEach((document) => {
        const documentReference = ref(storage, document.fullPath);
        getMetadata(documentReference).then((res) => {
          getDownloadURL(documentReference).then(url => {
            setFiles((currentFiles) => [
              ...currentFiles,
              {
                name: res.name,
                category: !!res.customMetadata ? res.customMetadata?.category : "Yok",
                size: formatBytes(res.size),
                type: res.contentType,
                url: url
              },
            ])
          })}
        );
      });
    });
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
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
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
            </th>
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
              <a
                href="#"
                className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  ></path>
                </svg>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                className="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                ...
              </a>
            </li>
            <li>
              <a
                href="#"
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                100
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  ></path>
                </svg>
              </a>
            </li>
          </ul>
        </nav>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded my-4 mx-12">
          Seçilenleri İndir
        </button>
      </div>
    </div>
  );
}
