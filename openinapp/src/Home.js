import React, { useState, useRef } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faCodepen } from "@fortawesome/free-brands-svg-icons";

import {
  faTachometerAlt, // Dashboard icon
  faUpload,
  faFileInvoice,
  faCalendarCheck,
  faCalendarAlt,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

import * as XLSX from "xlsx"; // Import XLSX for reading Excel files

function Home() {
  const [file, setFile] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFileDetails, setUploadedFileDetails] = useState(null); // Add this line

  const sidebarRef = useRef(null);

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (validateFileType(selectedFile)) {
        setFile(selectedFile);
        readExcelFile(selectedFile);
      } else {
        alert("Please select a valid Excel file (.xlsx, .xls).");
        setFile(null); // Clear file state
      }
    }
  };

  // Handle drag and drop
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      if (validateFileType(droppedFile)) {
        setFile(droppedFile);
        readExcelFile(droppedFile);
      } else {
        alert("Please select a valid Excel file (.xlsx, .xls).");
        setFile(null); // Clear file state
      }
    }
  };

  // Prevent default behavior for drag over
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Validate file type
  const validateFileType = (file) => {
    const validTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    return validTypes.includes(file.type);
  };

  // Read Excel file and set table data
  const readExcelFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryString = e.target.result;
      const workbook = XLSX.read(binaryString, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setTableData(jsonData);

      //Generate a link to the file(for demo purposes, using URL. createObjectURL)
      const fileURL = URL.createObjectURL(file);
      setUploadedFileDetails({
        name: file.name,
        type: file.type,
        size: file.size,
        url: fileURL,
      });
    };
    reader.readAsBinaryString(file);
  };

  // Handle profile picture change
  const [profilePic, setProfilePic] = useState(null); // Default profile picture URL

  const handleProfileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = () => {
    if (file) {
      // Logic to upload file (e.g., send to backend)
      alert(`File ${file.name} uploaded.`);
      setFile(null);
      document.getElementById("file-input").value = ""; // Clear file input
    } else {
      alert("No file selected.");
    }
  };

  // Handle drag for sidebar resizing
  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newWidth = e.clientX;

      // Set min and max width for the sidebar
      const minWidth = 100; // Minimum width in pixels
      const maxWidth = 300; // Maximum width in pixels

      if (newWidth >= minWidth && newWidth <= maxWidth) {
        sidebarRef.current.style.width = `${newWidth}px`;
      }
    }
  };

  return (
    <div
      className="container"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Sidebar */}
      <nav className="sidebar" ref={sidebarRef}>
        <ul className="ulList">
          <li className="logo">
            <FontAwesomeIcon
              icon={faCodepen}
              style={{ color: "#74C0FC", margin: "0 19px", fontSize: "60px" }}
            />
            <p>Base</p>
          </li>
          <li>
            <FontAwesomeIcon
              icon={faTachometerAlt}
              style={{ fontSize: "40px" }}
            />{" "}
            Dashboard
          </li>
          <li>
            <FontAwesomeIcon icon={faUpload} style={{ fontSize: "40px" }} />{" "}
            Upload
          </li>
          <li>
            <FontAwesomeIcon
              icon={faFileInvoice}
              style={{ fontSize: "48px" }}
            />{" "}
            Invoice
          </li>
          <li>
            <FontAwesomeIcon
              icon={faCalendarCheck}
              style={{ fontSize: "40px" }}
            />{" "}
            Schedule
          </li>
          <li>
            <FontAwesomeIcon
              icon={faCalendarAlt}
              style={{ fontSize: "40px" }}
            />{" "}
            Calendar
          </li>
          <li>
            <FontAwesomeIcon icon={faBell} style={{ fontSize: "40px" }} />{" "}
            Notification
          </li>
          <li>
            <FontAwesomeIcon icon={faGear} style={{ fontSize: "40px" }} />{" "}
            Settings
          </li>
        </ul>
        <div className="sidebar-resizer" onMouseDown={handleMouseDown}></div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <div className="header">
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <div className="header-left">Upload CSV</div>
          </Link>

          <div className="header-right">
            <FontAwesomeIcon icon={faBell} className="notification-icon" />

            <input
              type="file"
              id="profile-upload"
              className="profile-upload-input"
              onChange={handleProfileChange}
              accept="image/*"
            />
            <label htmlFor="profile-upload" className="profile-label">
              <img
                src={profilePic || "https://via.placeholder.com/100"} // Placeholder image
                alt="Profile"
                className="profile-pic"
              />
            </label>
          </div>
        </div>
        <div
          className="upload-box"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="upload-inner-box">
            <img
              src="https://cdn2.iconfinder.com/data/icons/metro-ui-icon-set/512/Excel_15.png"
              alt="Excel Icon"
              className="excel-icon"
            />
            <input
              type="file"
              onChange={handleFileChange}
              className="file-input"
              id="file-input"
              accept=".xlsx, .xls" // Accept only Excel files
            />
            <label htmlFor="file-input" className="file-label">
              Drop Excel Sheet Here or{" "}
              <span className="browse-link">Browse</span>
            </label>
          </div>
          <button onClick={handleUpload} className="upload-button">
            <img
              src="https://img.icons8.com/material-outlined/24/undefined/upload.png"
              alt="Upload"
              style={{ marginRight: "8px", width: "24px", height: "24px" }}
            />
            Upload
          </button>
        </div>
        <div className="details-section">
          <h2>Upload Details</h2>
          <table>
            <thead>
              <tr>
                <th>Serial No</th>
                <th>Links</th>
                <th>Prefix</th>
                <th>Add Tags</th>
                <th>Selected Tags</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <a
                      href={row.Link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {row.Link}
                    </a>
                  </td>
                  <td>{row.Prefix}</td>
                  <td>{row["Add Tags"]}</td>
                  <td>{row["Selected Tags"]}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* demo */}
          {uploadedFileDetails && (
            <div className="uploaded-file-details">
              <h3>Uploaded File Details</h3>
              <p>
                <strong>File Name:</strong> {uploadedFileDetails.name}
              </p>
              <p>
                <strong>File Type:</strong> {uploadedFileDetails.type}
              </p>
              <p>
                <strong>File Size:</strong>{" "}
                {(uploadedFileDetails.size / 1024).toFixed(2)} KB
              </p>
              <a
                href={uploadedFileDetails.url}
                download={uploadedFileDetails.name}
              >
                Download {uploadedFileDetails.name}
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
export default Home;
