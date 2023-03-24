const mongoose = require("mongoose");
const validator = require("validator");

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: [true, "Please enter post heading"],
  },
  description: {
    type: String,
  },
  images: [
    {
      image: {
        public_id: {
          type: String,
          // required: true,
        },
        url: {
          type: String,
          // required: true,
        },
      },
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
      },
      comment: {
        type: String,
      },
      image: {
        type: String,
      },
      likes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "userModel",
        },
      ],
      replies: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userModel",
          },
          reply: {
            type: String,
          },
          image: {
            type: String,
          },
          likes: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "userModel",
            },
          ],
          createdAt: {
            type: Date,
            default: Date.now(),
          },
        },
      ],
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Post", postSchema);
