import "./upload.css";
import React from "react";
import { useRef, useState } from "react";
import axios from "axios";

function Uploads() {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedfiles] = useState([]);
  const [showProgress, setShowProgress] = useState(false);
  const fileInputRef = useRef(null);

  console.log(uploadedFiles);

  const handleFileInput = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const uploadFile = (event) => {
    const files = event.target.files;
    if (!files) {
      return ;
    }
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);
      setFiles((preValue) => [
        ...preValue,
        { name: files[i].name, loading: 0 },
      ]);
      setShowProgress(true);
      axios
        .post("http://localhost:8000/upload", formData, {
          onUploadProgress: ({ loaded, total }) => {
            setFiles((preValue) => {
              if (preValue) {
                const newFiles = [...preValue];
                if (newFiles.length > 0) {
                  for (let i = 0; i < newFiles.length; i++) {
                    newFiles[i].loading = Math.floor((loaded / total) * 100);
                  }
                  return newFiles;
                }
              }
            });
            if (loaded === total) {
              // window.alert("File updated")
              const fileSize =
                total < 1024
                  ? `${total} KB`
                  : `${(loaded / (1024 * 1024)).toFixed(2)} MB`;
              setUploadedfiles((preValue) => {
                return [...preValue, { name: files[i].name, size: fileSize }];
              });

              setFiles([]);
              setShowProgress(false);
            }
          },
        })
        // .then((res)=>{
        //   console.log(res.data.status)
        //   window.alert(res.data.status)
        // })
        .catch(console.error);
    }
  };


  return (
    <div className="upload-box">
      <p>Upload your file </p>
      <form>
        <input
          className="file-input"
          type="file"
          name="file"
          hidden
          ref={fileInputRef}
          onChange={uploadFile}
          multiple
        />
        <div className="icon" onClick={handleFileInput}>
          <img src="images/icons/fileupload.png" alt="icon"></img>
        </div>
        <p>Browse your file to upload</p>
      </form>
      {showProgress && (
        <section className="loading-area">
          {files.map((file, index) => (
            <li className="row" key={index}>
              <i className="fas fa-file-alt"></i>
              <div className="content">
                <div className="details">
                  <span className="name">{`${file.name} -uploading`}</span>
                  <span className="percent">{`${file.loading} %`}</span>
                  <div className="loading-bar">
                    <div
                      className="loading"
                      style={{ width: `${file.loading}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </section>
      )}

      <section className="uploaded-area">
        {uploadedFiles.map((file, index) => (
          <li className="row" key={index}>
            <div className="content upload">
              {/* <i className = 'fas fa-file-alt'> </i> */}
              <div className="details">
                <span className="name">{`${file.name}`}</span>
                <span className="size">{`${file.size}`}</span>
              </div>
            </div>
            {/* <div className="download">
              <button className="download-button" >Download</button>
            </div> */}
            {/* <i className = 'fas fa-check'></i> */}
          </li>
        ))}
      </section>
    </div>
  );
}

export default Uploads;
