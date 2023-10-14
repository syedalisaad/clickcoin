const express = require('express');
const router = express.Router();
const users = require('../controllers/user.controller.js');

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with the provided information.
 *     tags:
 *       - User
 *     requestBody:
 *       description: User object to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               firstName:
 *                 type: string
 *                 description: The first name of the user.
 *               lastName:
 *                 type: string
 *                 description: The last name of the user.
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *               phone:
 *                 type: string
 *                 description: The phone number of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *               image:
 *                 type: string
 *                 description: URL to the user's profile image.
 *               published:
 *                 type: boolean
 *                 description: Whether the user is published or not.
 *             example:
 *               username: john_doe
 *               firstName: John
 *               lastName: Doe
 *               email: john@example.com
 *               phone: +1234567890
 *               password: secretPassword
 *               image: https://example.com/profile.jpg
 *               published: true
 *     responses:
 *       200:
 *         description: User successfully created
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 */
router.post('/', users.create);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve all users
 *     description: Retrieve a list of all users.
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', users.findAll);

/**
 * @swagger
 * /api/users/published:
 *   get:
 *     summary: Retrieve all published users
 *     description: Retrieve a list of all published users.
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: List of published users retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get('/published', users.findAllPublished);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Retrieve a single user by ID
 *     description: Retrieve a single user by their ID.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', users.findOne);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     description: Update a user's information by their ID.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: User object with updated information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define properties to update here
 *             example:
 *               // Provide an example of the updated user object
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', users.update);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Delete a user by their ID.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', users.delete);

/**
 * @swagger
 * /api/users:
 *   delete:
 *     summary: Delete all users
 *     description: Delete all users.
 *     tags:
 *       - User
 *     responses:
 *       204:
 *         description: All users deleted successfully
 *       500:
 *         description: Internal server error
 */
router.delete('/', users.deleteAll);

module.exports = router;