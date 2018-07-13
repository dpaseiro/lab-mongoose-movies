const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create schema to map out what keys are needed in the DB and what type of info they use
const celebSchema = new Schema({

    name: {type: String},
    occupation: {type: String},
    catchPhrase: {type: String}
}, {
    timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

//this part is the model. Create a model with a schema to apply it to array. this is the format of the array
const Celeb = mongoose.model('Celebritymodel', celebSchema)
    
//exporting it somewhere
module.exports = Celeb;