const { Course, Category, Video, sequelize } = require("../../models");
const { Op } = require("sequelize");

class CourseController {
	static async findAllCourses(req, res, next) {
		try {
			const { page, search } = req.query;
			const size = 10;

			let options = {
				where: {},
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

			if (result.currentPage > result.totalPage) {
				throw { name: "CourseNotFound" };
			}
			res.status(200).json(result);
		} catch (err) {
			next(err);
		}
	}
	static async findCourseById(req, res, next) {
		try {
			const { courseId } = req.params;

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
							exclude: ["createdAt", "updatedAt"],
						},
					},
				],
				order: [["id", "DESC"]],
			});

			if (!foundCourse) {
				throw { name: "CourseNotFound" };
			}

			res.status(200).json(foundCourse);
		} catch (err) {
			next(err);
		}
	}

	static async createCourse(req, res, next) {
		try {
			const t = await sequelize.transaction();
			const { name, description, price, thumbnailUrl, difficulty, status, CategoryId, Videos } = req.body;
			const newCourse = await Course.create(
				{
					name,
					description,
					price,
					thumbnailUrl,
					difficulty,
					status,
					CategoryId,
				},
				{ transaction: t }
			);
			if (!newCourse) {
				throw { name: "Bad Request" };
			} else {
				const videosArray = [];
				Videos.forEach((video) => {
					let videoObj = {
						name: video.name,
						videoUrl: video.videoUrl,
						CourseId: newCourse.id,
					};
					videosArray.push(videoObj);
				});
				const newVideos = await Video.bulkCreate(videosArray, {
					transaction: t,
				});
				await t.commit();
				res.status(201).json({ course: newCourse, videos: newVideos });
			}
		} catch (err) {
			next(err);
		}
	}
	static async updateCourse(req, res, next) {
		try {
			const { courseId } = req.params;
			const { name, description, price, thumbnailUrl, difficulty, status, CategoryId } = req.body;

			const foundCourse = await Course.findByPk(courseId);

			if (!foundCourse) {
				throw { name: "CourseNotFound" };
			}

			const updatedCourse = await Course.update(
				{
					name,
					description,
					price,
					thumbnailUrl,
					difficulty,
					status,
					CategoryId,
				},
				{
					where: { id: courseId },
					returning: true,
				}
			);

			if (updatedCourse[0] === 0) {
				throw { name: "CourseNotFound" };
			} else {
				res.status(200).json(updatedCourse[1][0]);
			}
		} catch (err) {
			next(err);
		}
	}
	static async patchCourse(req, res, next) {
		try {
			const { courseId } = req.params;
			const { status } = req.body;

			const foundCourse = await Course.findByPk(courseId);

			if (!foundCourse) {
				throw { name: "CourseNotFound" };
			}

			const patchedCourse = await Course.update(
				{
					status,
				},
				{
					where: { id: courseId },
					returning: true,
				}
			);
			if (patchedCourse[0] === 0) {
				throw { name: "CourseNotFound" };
			} else {
				res.status(200).json(patchedCourse[1][0]);
			}
		} catch (err) {
			next(err);
		}
	}
}

module.exports = CourseController;
