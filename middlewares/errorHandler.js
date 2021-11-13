const errorHandler = (err, req, res, next) => {
	let code = 500;
	let msg = "Internal server error";

	console.log(err);
	if (err.name === "SequelizeValidationError") {
		code = 400;
		msg = err.errors[0].message;
	} else if (err.name === "SequelizeUniqueConstraintError") {
		code = 400;
		msg = err.errors[0].message;
	} else if (err.name === "InvalidInput") {
		code = 401;
		msg = "Invalid email/password";
	} else if (err.name === "JsonWebTokenError") {
		code = 401;
		msg = "Unauthorized";
	} else if (err.name === "Unauthentication") {
		code = 401;
		msg = "You must login first";
	} else if (err.name === "CourseNotFound") {
		code = 404;
		msg = "Course Not Found";
	} else if (err.name === "CourseAlreadyPurchased") {
		code = 404;
		msg = "Course Already Purchased";
	} else if (err.name === "CategoryNotFound") {
		code = 404;
		msg = "Category Not Found";
	} else if (err.name === "IdNotFound") {
		code = 404;
		msg = "Id is not found";
	} else if (err.name === "InvalidFileFormat") {
		code = 400;
		msg = "File Format Should Be MP4";
	} else if (err.name === "InvalidFileSize") {
		code = 400;
		msg = "File Size Should Not Exceeded 25MB";
	} else if (err.name === "ImagekitError") {
		code = 400;
		msg = "Imagekit Error";
	} else if (err.name === "Forbidden") {
		code = 401;
		msg = "Not Authorized";
	}

	res.status(code).json({ message: msg });
};

module.exports = errorHandler;
