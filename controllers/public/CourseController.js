const { Course, Category, Video, Comment } = require("../../models");
const { Op } = require("sequelize");

class CourseController {
	static async readAllCourses(req, res, next) {
		try {
			const { page, search, categoryId, price, difficulty } = req.query;
			const size = 12;

			let options = {
				where: {
					status: "active",
				},
				include: [
					{
						model: Category,
						attributes: ["name"],
					},
				],
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
				order: [["id", "asc"]],
			};

			if (search) {
				options.where.name = { [Op.iLike]: `%${search}%` };
			}

			if (categoryId) {
				options.where.CategoryId = categoryId;
			}

			if (difficulty) {
				options.where.difficulty = difficulty;
			}

			if (price) {
				options.order = [[`price`, `${price}`]];
			}

			if (+page === 0) {
				throw { name: "CourseNotFound" };
			}

			let response;
			let result;
			if (page) {
				options.limit = size;
				options.offset = (+page - 1) * size;
				response = await Course.findAndCountAll(options);
				result = {
					totalCourse: response.count,
					course: response.rows,
					totalPage: Math.ceil(response.count / size),
					currentPage: +page,
				};
			} else {
				response = await Course.findAll(options);
				result = response;
			}

			res.status(200).json(result);
		} catch (err) {
			next(err);
		}
	}

	static async readCourseDetail(req, res, next) {
		try {
			const { courseId } = req.params;

			// let exclude 
			// if (Video[0]) {
			// 	exclude = { exclude: ["createdAt", "updatedAt"] }
			// } else {
			// 	exclude = { exclude: ["createdAt", "updatedAt", "videoUrl"] }
			// }

			const foundCourse = await Course.findByPk(courseId, {
				include: [
					{
						model: Category,
						attributes: {
							exclude: ["createdAt", "updatedAt"],
						},
					},
					{
						model: Video,
						attributes: {
							exclude: ["createdAt", "updatedAt"]
						},
						include: {
							model: Comment,
							attributes: ["id", "comment"],
						},
					},
				],
				order: [
					["id", "DESC"],
					[Video, "id", "ASC"]
				],
			});

			if (!foundCourse) {
				throw { name: "CourseNotFound" };
			}

			for (let i = 1; i < foundCourse.Videos.length; i++) {
				foundCourse.Videos[i].videoUrl = "";
			}

      	res.status(200).json(foundCourse);
    } catch (err) {
      next(err);
    }
  }

  static async readCategories(req, res, next) {
    try {
      const response = await Category.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      })

      res.status(200).json(response)
    } catch (err) {
      next(err)
    }
  }

}

module.exports = CourseController;
