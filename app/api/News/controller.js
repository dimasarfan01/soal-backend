const News = require('./model');

module.exports = {
  async createNews(req, res) {
    const { title, category, duration, userName, userImage, image } = req.body;
    try {
      const newNews = new News({
        title,
        category,
        image,
        duration,
        postedBy: {
          userName,
          image: userImage,
        },
      });
      await newNews.save();
      return res.status(201).json({
        message: 'News created successfully',
        data: newNews,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  },
  async getAllNews(req, res) {
    const { page = 1, limit = 1, category = null } = req.query;
    try {
      let query = {};
      if (category) {
        query = { ...query, category: { $in: category.split(',') } };
      }
      const totalDocument = await News.countDocuments(query);
      const startIndex = (Number(page) - 1) * limit;
      const news = await News.find(query)
        .sort({ _id: -1 })
        .limit(Number(limit))
        .skip(startIndex);

      return res.status(200).json({
        message: 'News fetched successfully',
        data: news,
        currentPage: Number(page),
        numberOfPages: Math.ceil(totalDocument / limit),
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  },
  async getNewsById(req, res) {
    const { id } = req.params;
    try {
      const news = await News.findOne({ _id: id });
      return res.status(200).json({
        message: 'News fetched successfully',
        data: news,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  },
};
