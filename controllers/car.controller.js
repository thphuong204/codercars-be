const mongoose = require('mongoose');
const { sendResponse, AppError}=require("../helpers/utils.js");
const { db } = require('../models/Car');
const Car = require('../models/Car');
const carController = {};
const { validationResult } = require('express-validator');

// check('make').not().isEmpty()

carController.createCar = async (req, res, next) => {
	try {
		// YOUR CODE HERE

		//Express validation, check information before creating a new document
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(422).json({ errors: errors.array() });
			return;
		}
		
		const {
			make,
			 model, 
			 release_date, 
			 transmission_type, 
			 size, 
			 style, 
			 price
		} = req.body;

        //mongoose query
        const created= await Car.create({
			make: make,
			model: model,
			release_date : release_date, 
			transmission_type: transmission_type, 
			size: size, 
			style: style, 
			price: price,
		})
        sendResponse(res,200,true,{data:created},null,"Create Car Success")
	
	} catch (err) {
		// YOUR CODE HERE
		next(err);
	}	
};

carController.getCars = async (req, res, next) => {
	console.log("req",req)
	const currentPage = req.query.page || 1;
	const limitPerPage = 20;
	const skipNumber = (currentPage-1) * limitPerPage;
	const filter = {isDeleted: false};
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

	try {
		// YOUR CODE HERE

		//Express validation, check information before editting a document
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(422).json({ errors: errors.array() });
			return;
		}

		const {
			make,
			model, 
			release_date, 
			transmission_type, 
			size, 
			style, 
			price
		} = req.body;

		const targetId = req.params.id;
		const options = { new: true };

	
		Car.findOneAndUpdate(
			{_id: targetId, isDeleted: false}, 
			{	make: make,
				model: model,
				release_date : release_date, 
				transmission_type: transmission_type, 
				size: size, 
				style: style, 
				price: price
			}, 
			options,
			// handle error if can't find id
			(err, car) => {
				if (err) {
                    res.status(400)
					res.json({
						success: false,
						err
					})
					return
				};

				if (!car) {
					res.status(404)
					res.json({
						success: false,
						err: {message: `Can't update data of car which does not exist`}
					})
					return
				};

				sendResponse(
					res,
					200,
					true,
					{ car: car },
					null,
					"Update Car Successfully!"
				)
			},
		);
		
	} catch (err) {
		// YOUR CODE HERE
		next(err);
	}
};

carController.deleteCar = async (req, res, next) => {
	const targetId = req.params.id;
	const options = { new: true };
	try {
		// YOUR CODE HERE
		Car.findOneAndUpdate(
			{_id: targetId, isDeleted: false}, 
			{isDeleted: true},
			options,
			// handle error if can't find id 
			(err, car) => {
			if (err) {
				res.status(400)
				res.json({
					success: false,
					err
				})
				return
			};

			if (!car) {
				res.status(404)
				res.json({
					success: false,
					err: {message : `Can't delete data of car which does not exist`}
				})
				return
			};

			sendResponse(
				res,
				200,
				true,
				{ car: car },
				null,
				"Delete Car Successfully!"
			);
		}
		);

	} catch (err) {
		// YOUR CODE HERE
		next(err);
	}
};

module.exports = carController;
