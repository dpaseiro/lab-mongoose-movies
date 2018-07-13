// need to have mongoose
const mongoose = require('mongoose');

// This is telling seed to look for this model at this location
const Celebrity = require('../models/celebrity')

//literallt the name of the DB in mongo. Name it the project name for simplicity.
const dbName = 'lab-mongoose-movies';

// This connects to the DB location
mongoose.connect(`mongodb://localhost/${dbName}`);







const celebrityArray = [

    {
        name: 'Rich Sanchez',
        occupation: 'Scientist',
        catchPhrase: 'Wubbalubbadubdub'
    },

    {
        name: 'Captain Falcon',
        occupation: 'Race Car Driver',
        catchPhrase: 'Falcon Punch!'
    },

    {
        name: 'Ethan Klien',
        occupation: 'Meme Historian',
        catchPhrase: 'Poppa Bless'
    }
];

// this says take the model, apply it to the array and make that. Then disconnect from mongoose
Celebrity.create(celebrityArray)
.then((result)=>{
    result.forEach(oneCeleb => {
        console.log('In DB:', oneCeleb.title )
    })
    mongoose.disconnect();
})

.catch(err => console.log('Error while creating seeds:', err));
