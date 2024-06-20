const mongoose = require('mongoose');

const FolderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  filePath: { type: String, required: true},
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Folder' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }]
});

module.exports = mongoose.model('Folder', FolderSchema);
