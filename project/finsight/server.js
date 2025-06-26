require('dotenv').config();
console.log("JWT Secret:", process.env.JWT_SECRET);

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const { exec } = require('child_process');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/schemafile');

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ MongoDB Connected");
}).catch((err) => {
  console.error("❌ MongoDB Error:", err);
});

// ✅ JWT Middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: "Token missing" });

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    req.user = decoded;
    next();
  });
};

// ✅ Register Route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered!" });
  } catch (err) {
    console.error("💥 Registration error:", err);
    res.status(500).json({ error: "Server error during registration" });
  }
});

// ✅ Login Route with JWT
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid email or password" });

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("💥 Login error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});

// ✅ File Upload Config
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`)
});
const upload = multer({ storage });

// ✅ Protected Upload Route
app.post('/upload', verifyToken, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const uploadedFilePath = path.join(__dirname, 'uploads', req.file.filename);
  exec(`python finbert_model.py "${uploadedFilePath}"`, (error, stdout, stderr) => {
    if (error) return res.status(500).json({ error: 'Model failed' });

    try {
      const output = JSON.parse(stdout);
      res.json({ message: 'Analysis complete!', result: output });
    } catch (parseErr) {
      res.status(500).json({ error: 'Invalid model output' });
    }
  });
});

// ✅ Health Check
app.get('/', (req, res) => res.send('Server is running... 🚀'));

// ✅ Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
