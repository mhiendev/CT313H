exports.create = (req, res) => {
    return res.send({ message: 'create handler' });
};

exports.findAll = (req, res) => {
    return res.send({ message: 'findAll handler'});
};

exports.findOne = (req, res) => {
    return res.send({ message: 'findOne handler'});
};

exports.update = (req, res) => {
    return res.send({ message: 'update handler'});
};

exports.delete = (req, res) => {
    return res.send({ message: 'delete handler'});
};

exports.deleteAll = (req, res) => {
    return res.send({ message: 'deleteAll handler'});
};

exports.findAllFavorite = (req, res) => {
    return res.send({ message: 'findAllFavorite handler'});
};

const ContactService = require('../ContactService/contact.service');
const ApiError = require('../api-error');


//Create and Save a new Contact
exports.create = async(req, res, next) => {
    if(!req.body?.name){
        return next(new ApiError(400, 'Name can not be empty'));
    }

    try{
        const contactService = new ContactService();
        const contact = await contactService.create(req.body);
        return res.send(contact);
    }catch(error){
        console.log(error);
        return next(
            new ApiError(500, 'An error occured while creating the contact')
        );
    }
};

// Find a single contact with an id
exports.findOne = async (req, res) => {

}