const express = require('express');
const cors = require('cors');
const contactController = require('./controllers/contact.controller');
const ApiError = require('./api-error');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to contact book application.' });
});

app.route('/api/contacts')
    .get(contactController.findAll)
    .post(contactController.create)
    .delete(contactController.deleteAll);

app.route('/api/contacts/favorite').get(contactController.findAllFavorite);

app.route('/api/contacts/:id')
    .get(contactController.findOne)
    .put(contactController.update)
    .delete(contactController.delete);
module.exports = app;

//Handle 404 response
app.use((req, res, next) => {
    //Handler for unknown route.
    //Call next() to pass to the error handling middleware.
    return next(new ApiError(404, 'Resource not found'));
});

//Define error-handling middleware last, aftr other app.use() and routes calls
app.use((err, req, res, next) => {
    //The centralized error handling middleware.
    //In any route handler, calling next(error)
    //   will passs to this error handling middleware.
    return res.status(err.StatusCode || 500).json({
        message: err.message || 'Internal Server Error',
    });
});