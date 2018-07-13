// need to have mongoose
const mongoose = require('mongoose');

// This is telling seed to look for this model at this location
const Movie = require('../models/movie-model')

//literallt the name of the DB in mongo. Name it the project name for simplicity.
const dbName = 'lab-mongoose-movies';

// This connects to the DB location
mongoose.connect(`mongodb://localhost/${dbName}`);

const movieArray = [

    {
        title: 'Crazy movie',
        genre: 'action',
        plot: 'Wubbalubbadubdub',
        actors: []
    },

    {
        title: 'Omg this movie',
        genre: 'drama',
        plot: 'Falcon Punch!',
        actors: []
    },

    {
        title: 'H3 move',
        genre: 'comedy',
        plot: 'Poppa Bless',
        actors: []
    }
];
