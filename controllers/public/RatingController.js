const { Rating, Course } = require("../../models");

class RatingController {
  static async getRating(req, res, next) {
    try {
      const { courseId } = req.params;

      const foundCourse = await Course.findByPk(courseId);
      if (!foundCourse) {
        throw { name: "CourseNotFound" };
      }

      const ratings = await Rating.findAll({
        where: { CourseId: foundCourse.id },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      let rating = 0;
      ratings.forEach((el) => {
        rating += el.rating;
      });

      rating = Number((rating / ratings.length).toFixed(1));

      res.status(200).json({ rating });
    } catch (error) {
      next(error);
    }
  }

  static async addRating(req, res, next) {
    try {
      const { id } = req.user;
      const { courseId } = req.params;
      const { rating } = req.body;

      const addrating = await Rating.create({
        rating,
        UserId: id,
        CourseId: courseId,
      });

      res.status(201).json({
        rating: addrating.rating,
        UserId: addrating.UserId,
        CourseId: addrating.CourseId,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RatingController;
