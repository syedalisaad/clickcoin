const express = require("express");
const cors = require("cors");
const db = require("./app/models");

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerFile = require('./swagger_output.json');
const createError = require('http-errors'); // Import createError

const app = express();
const userRoutes = require('./app/routes/user.routes');
const authRoutes = require('./app/routes/auth.routes');

// Define CORS options
const corsOptions = {
  origin: "http://localhost:8081",
};

// Enable CORS for your app
app.use(cors(corsOptions));

// Connect to the database
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// Swagger setup
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "clickcoin Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "clickcoin",
        url: "https://clickcoin.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./app/routes/*.routes.js"], // Update the path pattern to match your route files
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Error handling middleware (should be defined before mounting routes)
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: err,
  });
});


// Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount the user routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Set the port and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
