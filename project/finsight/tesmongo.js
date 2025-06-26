require('dotenv').config();
const mongoose = require('mongoose');

console.log("Connecting to:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Connection successful!");
  process.exit(0);
})
.catch((err) => {
  console.error("❌ Connection failed:", err);
  process.exit(1);
});
