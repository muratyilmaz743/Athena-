"use client";

export default function UploadModal() {
  const onUpload = () => {};
  return (
    <div id="uploadFile" className="flex">
      <input
        className="p-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="file_input"
        type="file"
        accept=".pdf"
      />

      <button
        type="submit"
        onClick={onUpload}
        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-15 mt-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Upload Files
      </button>
    </div>
  );
}
