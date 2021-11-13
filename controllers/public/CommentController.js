const { Comment, UserCourse, Course, Video } = require("../../models");

class CommentController {
  static async AddComment(req, res, next) {
    try {
      const { videoId } = req.params;
      const { comment } = req.body;
      const { id } = req.user;

      const foundVideo = await Video.findOne({
        where: {
          id: videoId
        },
        include: Course
      })

      if(!foundVideo) {
        throw {name: "VideoNotFound"}
      }
    
      const foundMyCourse = await UserCourse.findOne({
        where: {
          CourseId: foundVideo.Course.id
        }
      })

      if (foundMyCourse.isPaid === false) {
        throw { name: "CourseNotPaid" };
      }

      const newComment = await Comment.create({
        comment,
        VideoId: videoId,
        UserId: id,
      });

      res.status(201).json({
        comment: newComment.comment,
        VideoId: newComment.VideoId,
        UserId: newComment.UserId,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CommentController;
