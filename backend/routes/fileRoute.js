const express = require("express");
const router = express.Router();

const fileSchema = require("../schema/fileSchema");

router.get("/getFile", async(req, res) => {
    try{
        const allFileData = await fileSchema.find();
        if( allFileData.length === 0 ){
            return res.status(404).json({
                message: "No data found!"
            })
        }

        return res.status(200).json({
            message: "Retrived Data",
            Data: allFileData
        })
    } catch(err) {
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        })
    }
});

router.post("/getFileId", async(req, res) => {
    try{
        const { Id } = req.body;
        const fileData = await fileSchema.findById( Id );
        if(!fileData) {
            return res.status(404).json({
                message: "No data found!"
            })
        }
        return res.status(200).json({
            message: "Data found",
            file: fileData
        })
    } catch(err) {
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        })
    }
})

router.post("/fileUpload", async(req, res) => {
    try {
        const { fileName, fileURL } = req.body;
        if( !fileName || !fileURL ) {
            return res.status(401).json({
                message: "All fields are required"
            });
        }
        const newFile = new fileSchema({
            fileName: fileName,
            fileURL: fileURL
        });
        await newFile.save();
        return res.status(201).json({
            message: "New file added",
            newFile: newFile
        })
    } catch(err) {
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        })
    }
});

module.exports = router