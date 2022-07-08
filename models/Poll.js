const mongoose = require("mongoose");
const { registerSchema, registerSchemas } = require("swaggiffy");

const pollSchema = new mongoose.Schema(
  {
    pollingTitle: {
      type: String,
      required: true,
    },

    candidates: [
      {
        firstName: String,
        lastName: String,
        nationalId: String,
        gender: {
          type: String,
          enum: ["M", "F"],
        },
        profilePic: String,
        missionStatemet: { type: String, maxLength: 200 },
        votes: [{ type: mongoose.Types.ObjectId, ref: "users" }],
      },
    ],
    votes: [mongoose.Types.ObjectId],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Poll = mongoose.model("poll", pollSchema);

registerSchema("polls", pollSchema, { orm: "mongoose" });
module.exports = Poll;
