const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DB_FILE = path.join(__dirname, 'db.json');
if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, '[]', 'utf8');

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadsDir));

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2,8)}${ext}`);
  }
});
const upload = multer({ storage });

// small helpers
function readDB() {
  try { return JSON.parse(fs.readFileSync(DB_FILE, 'utf8') || '[]'); }
  catch (e) { return []; }
}
function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// Image upload endpoint
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ url });
});

// Create profile
app.post('/api/profiles', (req, res) => {
  const profiles = readDB();
  const profile = Object.assign({}, req.body);
  profile.id = uuidv4();
  profile.createdAt = new Date().toISOString();
  profiles.push(profile);
  writeDB(profiles);
  res.status(201).json(profile);
});

// Update profile
app.put('/api/profiles/:id', (req, res) => {
  const profiles = readDB();
  const idx = profiles.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  profiles[idx] = Object.assign({}, profiles[idx], req.body, { updatedAt: new Date().toISOString() });
  writeDB(profiles);
  res.json(profiles[idx]);
});

// Get all profiles (optional skill filter q & skill)
app.get('/api/profiles', (req, res) => {
  let profiles = readDB();
  const { q, skill } = req.query;
  if (q) {
    const qq = q.toLowerCase();
    profiles = profiles.filter(p => (p.hero?.name||'').toLowerCase().includes(qq) || (p.about?.bio||'').toLowerCase().includes(qq));
  }
  if (skill) {
    profiles = profiles.filter(p => Array.isArray(p.skills) && p.skills.includes(skill));
  }
  res.json(profiles);
});

// Get single profile
app.get('/api/profiles/:id', (req, res) => {
  const profiles = readDB();
  const p = profiles.find(x => x.id === req.params.id);
  if (!p) return res.status(404).json({ error: 'Not found' });
  res.json(p);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API server listening on http://localhost:${PORT}`));
