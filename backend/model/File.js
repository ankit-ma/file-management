const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  filePath: { type: String, required: true},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  size: { type: Number, required: true },
  url: { type: String, required: true }
});

module.exports = mongoose.model('File', FileSchema);
