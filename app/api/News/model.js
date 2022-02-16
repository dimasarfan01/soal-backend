const mongoose = require('mongoose');

const newsSchema = mongoose.Schema(
  {
    title: String,
    category: Array,
    duration: String,
    postedBy: {
      userName: String,
      image: String,
    },
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('News', newsSchema);
