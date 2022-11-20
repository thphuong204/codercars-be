const mongoose = require('mongoose');
const { sendResponse, AppError}=require("../helpers/utils.js");
const { db } = require('../models/Car');
const Car = require('../models/Car');
const carController = {};

carController.createCar = async (req, res, next) => {
	try {
		// YOUR CODE HERE
		const info = req.body;

		if(!info) throw new AppError(402,"Bad Request","Create Car Error")
        //mongoose query
        const created= await Car.create(info)
        sendResponse(res,200,true,{data:created},null,"Create Car Success")
	
	} catch (err) {
		// YOUR CODE HERE
		next(err);
	}	
};

carController.getCars = async (req, res, next) => {
	const currentPage = req.query.page || 1;
	const limitPerPage = 20;
	const skipNumber = (currentPage-1) * limitPerPage;
	const filter = {};
	try {
		// YOUR CODE HERE
    	const listOfFound = await Car.find(filter).skip(skipNumber).limit(limitPerPage);
		const totalCar = await Car.count();
		const totalPage = Math.ceil(totalCar / limitPerPage);
		console.log("totalCar: ",totalCar," totalPage",totalPage)

		sendResponse(
			res,
			200,
			true,
			{ cars: listOfFound, page: 1, total: totalPage },
			null,
			"Get Car List Successfully!"
		  );
	} catch (err) {
		// YOUR CODE HERE
		next(err);
	}
};

carController.editCar = async (req, res, next) => {
	const targetId = null;
	const updateInfo = "";
	const options = { new: true };

	try {
		// YOUR CODE HERE
		const updated = await Car.findByIdAndUpdate(targetId, updateInfo, options);

		sendResponse(
		res,
		200,
		true,
		{ cars: updated },
		null,
		"Update Car Successfully!"
		);
	} catch (err) {
		// YOUR CODE HERE
		next(err);
	}
};

carController.deleteCar = async (req, res, next) => {
	const targetId = null;
	const options = { new: true };
	try {
		// YOUR CODE HERE
		const updated = await car.findByIdAndDelete(targetId, options);

		sendResponse(
		res,
		200,
		true,
		{ cars: updated },
		null,
		"Delete Car Successfully!"
		);
	} catch (err) {
		// YOUR CODE HERE
		next(err);
	}
};

module.exports = carController;
