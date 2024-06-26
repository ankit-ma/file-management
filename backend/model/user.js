const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: String },
    rowstate: { type: Number, default: 1 },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields
  }
);

module.exports = model("user", userSchema);
