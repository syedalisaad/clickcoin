const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {


  /**
   * @swagger
   * /api/auth/signup:
   *   post:
   *     summary: Register a new user
   *     description: Register a new user with unique username or email.
   *     tags:
   *       - Authentication
   *     requestBody:
   *       description: User registration data
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *                 description: The username of the user.
   *               email:
   *                 type: string
   *                 description: The email address of the user.
   *               password:
   *                 type: string
   *                 description: The password of the user.
   *             example:
   *               username: john_doe
   *               email: john@example.com
   *               password: secretPassword
   *     responses:
   *       200:
   *         description: User registered successfully
   *       400:
   *         description: Invalid request data
   *       409:
   *         description: Username or email already in use
   *       500:
   *         description: Internal server error
   */
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail
    ],
    controller.signup
  );

  /**
   * @swagger
   * /api/auth/signin:
   *   post:
   *     summary: Authenticate a user
   *     description: Authenticate a user by username and password.
   *     tags:
   *       - Authentication
   *     requestBody:
   *       description: User authentication data
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *                 description: The username of the user.
   *               password:
   *                 type: string
   *                 description: The password of the user.
   *             example:
   *               username: john_doe
   *               password: secretPassword
   *     responses:
   *       200:
   *         description: User authenticated successfully
   *       401:
   *         description: Unauthorized - Invalid username or password
   *       500:
   *         description: Internal server error
   */

  // Define the route and the corresponding controller function
  app.post("/api/auth/signin", controller.signin);
};
