const express = require('express');
const multer = require('multer');
const { exec } = require('child_process'); // For running Python script
const path = require('path');

const app = express();
const PORT = 5000;




// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: './uploads/', // Create this folder to store uploaded files
    filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`)
});

const upload = multer({ storage });

// Route to upload file and run model
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const uploadedFilePath = path.join(__dirname, req.file.path);

    // Run finbert_model.py with the uploaded file as input
    exec(`python finbert_model.py "${uploadedFilePath}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error running model: ${error.message}`);
            return res.status(500).json({ error: 'Model execution failed.' });
        }

        if (stderr) {
            console.error(`Model error output: ${stderr}`);
        }

        // Return model output (assuming finbert_model.py prints JSON output)
        try {
            const output = JSON.parse(stdout); 
            res.json({ message: 'Analysis complete!', result: output });
        } catch (parseError) {
            console.error('Error parsing model output:', parseError.message);
            res.status(500).json({ error: 'Failed to parse model output.' });
        }
    });
});

// Default route
app.get('/', (req, res) => res.send('Server is running... 🚀'));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
