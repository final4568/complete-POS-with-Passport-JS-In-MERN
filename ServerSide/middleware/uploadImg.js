const fs = require('fs');


module.exports = async (req, res, next) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({ msg: "No files were uploaded." })
        const file = req.files.file;

        if (file.size > 1024 * 1024) {
            removeTmp(file.tempFilePath)
            return res.status(400).json({ msg: "Size too large." })
        } // 1ms 

        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            removeTmp(file.tempFilePath)
            return res.status(400).json({ msg: "File format is incorrect." })
        }
        next()
    } catch (err) {
        return res.status(400).json({ msg: err.message })
    }

}

const removeTmp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err
    })
}