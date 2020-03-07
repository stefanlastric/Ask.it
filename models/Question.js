const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    text: {
      type: String,
      required: true
    },
    name: {
      type: String
    },
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'users'
        }
      }
    ],
    answers: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'users'
        },
        text: {
          type: String,
          required: true
        },
        name: {
          type: String
        },
        date: {
          type: Date,
          default: Date.now
        }
      },
      { timestamps: true }
    ],
    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = Question = mongoose.model('question', QuestionSchema);
