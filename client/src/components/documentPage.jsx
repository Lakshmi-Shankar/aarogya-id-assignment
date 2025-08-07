import React from 'react';

import "../styles/documentStyle.css"
import { useEffect } from 'react';
import { useState } from 'react';

const DocumentPage = () => {

    const [fileData, setFileData] = useState([]);
    const [id, setId] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [idDoc, setIdDoc] = useState([]);

    // To retrive all the files
    const allDocuments = async() => {

        const response = await fetch("https://aarogya-id-backend.onrender.com/api/getDocument", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        const data = await response.json();
        setDocuments(data.Data);
        console.log(data.Data);
    }

    // To upload files
    const upload = async (fileName) => {
        const response = await fetch("https://aarogya-id-backend.onrender.com/api/fileUpload", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fileName: fileName,
                fileURL: fileData
            })
        })

        if(!response) {
            console.log(response);
            console.log(fileName, fileData);
        }

        const data = await response.json();
        allDocuments();
    }

    // Calling submit function
    const printData = async(e) => {
        e.preventDefault();
        const fileName = fileData.split("\\").pop();
        upload(fileName);
    }

    // To find the document by ID for VIEW DOCUMENT button
    const findbyid = async(idFetch) => {
        const response = await fetch("https://aarogya-id-backend.onrender.com/api/getFileId", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Id: idFetch
            })
        })

        const data = await response.json();
        setIdDoc(data.file);
    }

    // To display all the documents on mount
    useEffect(() => {
        allDocuments();
    },[]);

    return (
        <>
            <div className='input-container'>
                <input className='fileInput' type='file' title='File Upload' onChange={(e) => setFileData(e.target.value)}></input>
                <br />
                <button type='submit' onClick={printData}>Submit</button>

                <div className='overview'>
                    <div>
                        <h4>Documents Uploaded</h4>
                        <p className='doc-length'>{documents.length}</p>
                    </div>
                </div>
            </div>

            <h2>Document Table</h2>

            <div className='show-documents'>
                <table>
                    <thead>
                    <tr>
                        <th>Document ID</th>
                        <th>File Name</th>
                        <th>File URL</th>
                        <th>Upload Date</th>
                        <th>View</th>
                    </tr>
                    </thead>
                    <tbody>
                    {documents.map((doc, index) => (
                        <tr key={doc._id || index}>
                        <td className='fileData'>{doc._id}</td>
                        <td className='fileData'>{doc.fileName}</td>
                        <td className='fileData'>{doc.fileURL}</td>
                        <td className='fileData'>{doc.uploadedAt.split("T")[0] + " " + doc.uploadedAt.split("T")[1].slice(0, 5)}</td>
                        <td>
                            <button className='viewButton' onClick={() => {setId(doc._id); setShowPopup(true); findbyid(doc._id)}}>VIEW DOCUMENTS</button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            

            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h3>Document Details</h3>
                        <p><strong>ID:</strong> {id}</p>
                        <p><strong>Name:</strong> {idDoc.fileName}</p>
                        <p><strong>URL:</strong> {idDoc.fileURL}</p>
                        <p><strong>UploadedAt:</strong> {idDoc.uploadedAt ? idDoc.uploadedAt.split("T")[0] + " " + idDoc.uploadedAt.split("T")[1].slice(0, 5) : "Loading..."}</p>
                        <button onClick={() => setShowPopup(false)}>Close</button>
                    </div>
                </div>
            )}

        </>
    );
}

export default DocumentPage;
