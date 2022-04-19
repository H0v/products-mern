const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const userModel = require('../models/User');

router.get('/users', async (req, res) => {
	try {
		const users = await userModel.find().select('-password');
		res.json(users);
	} catch (e) {
		res.json({message: 'Something went wrong while trying to get all users.'});
	}
});

router.get('/users/:id', async (req, res) => {
	try {
		const {params} = req;
		const user = await userModel.findById(params.id).select('-password -passwordHash');
		res.json({user});
	} catch (e) {
		res.json({message: "Something went wrong while trying to get single user."});
	}
});

router.get('/users-count', async (req, res) => {
	try {
		const allUsers = await userModel.countDocuments(count => count);

		if(!allUsers) {
			res.status(500).json({message: 'Something went wrong while trying to count all users.'});
		}

		res.json({usersCount: allUsers});
	}
	catch(e) {
		res.json({message: 'Something went wrong...'});
	}
});

router.post('/login', async (req, res) => {
	try {
		const {body} = req;
		const user = await userModel.findOne({username: body.username}).select('-password');

		if (!user) {
			return res.status(400).send({message: 'User does not exist...'});
		}

		if (user && bcrypt.compareSync(body.password, user.passwordHash)) {
			const token = jwt.sign({
				userId: user._id,
				isAdmin: user.isAdmin,
			}, 'hello-world', {expiresIn: '1w'});

			return res.status(200).json({user, token})
		} else {
			return res.status(400).json({message: 'User not found...'});
		}

	} catch (e) {
		res.json({message: `Something went wrong... Error: ${e}`});
	}
});

router.post('/register', async (req, res) => {
	try {
		const { body } = req;
		let user = new userModel({
			username: body.username,
			password: body.password,
			passwordHash: bcrypt.hashSync(body.password + '', 10),
		});

		await user.save();

		res.json({message: 'User created successfully.'});
	} catch (e) {
		res.json({message: `Something went wrong while creating user: ${e}`});
	}
});

router.put('/update-user', async (req, res) => {
	try {
		const { body } = req;
		await userModel.findByIdAndUpdate(body.id, {
			username: body.username,
		});
		res.json({message: 'User updated successfully.'});
	}
	catch(e) {
		res.json({message: 'Something went wrong while trying to update user...'});
	}
});

router.delete('/delete-user', async (req, res) => {
	try {
		const { body } = req;
		const userToDelete = await userModel.findOne({_id: body.id});

		if (userToDelete) {
			await userModel.findOneAndRemove({_id: body.id});
		} else {
			res.status(400).json({message: 'User not found...'});
		}

		res.json({message: 'User deleted...'})
	}
	catch(e) {
		res.json({message: 'Something went wrong...'});
	}
});

module.exports = router;