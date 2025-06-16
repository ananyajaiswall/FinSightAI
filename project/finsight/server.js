const express = require('express');
const cors = require('cors'); // ✅ Require CORS at the top
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');

const app = express(); // ✅ Initialize Express before using app.use()

// ✅ Enable CORS after initializing Express
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json()); // (Optional) If you're sending JSON requests

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`)
});

const upload = multer({ storage });

// Route to upload file and run model
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const uploadedFilePath = path.join(__dirname, 'uploads', req.file.filename);

    // Run finbert_model.py with the uploaded file
    exec(`python finbert_model.py "${uploadedFilePath}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error running model: ${error.message}`);
            return res.status(500).json({ error: 'Model execution failed.' });
        }

        if (stderr) {
            console.error(`Model error output: ${stderr}`);
        }

        console.log("Raw Model Output:", stdout);

        // Return model output (assuming it prints JSON output)
        try {
            const output = JSON.parse(stdout);
            res.json({ message: 'Analysis complete!', result: output });
        } catch (parseError) {
            console.error('Error parsing model output:', parseError.message);
            res.status(500).json({ error: 'Failed to parse model output.' });
        }
    });
});

//  




// Default route
app.get('/', (req, res) => res.send('Server is running... 🚀'));

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
