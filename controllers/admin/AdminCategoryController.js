const { Category, Course, sequelize } = require("../../models");

class CategoryController {
	static async findAllCategories(req, res, next) {
		try {
			const categories = await Category.findAll();
			res.status(200).json(categories);
		} catch (err) {
			next(err);
		}
	}
	static async createCategory(req, res, next) {
		try {
			const { name } = req.body;
			const createdCategory = await Category.create({ name });
			res.status(201).json(createdCategory);
		} catch (err) {
			next(err);
		}
	}
	static async deleteCategory(req, res, next) {
		const t = await sequelize.transaction();
		try {
			const { categoryId } = req.params;
			const foundCategory = await Category.findByPk(categoryId);
			if (foundCategory) {
				await Category.destroy(
					{
						where: {
							id: categoryId,
						},
					},
					{ transaction: t }
				);

				await Course.destroy(
					{
						where: {
							CategoryId: categoryId,
						},
					},
					{ transaction: t }
				);
				res.status(200).json({
					message: `Course and category with id ${foundCategory.id} has been deleted`,
				});
			} else {
				throw { name: "CategoryNotFound" };
			}
		} catch (err) {
			next(err);
		}
	}
}

module.exports = CategoryController;
