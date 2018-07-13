const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Celeb = require('./celebrity');


const movieSchema = new Schema({
 title: {type: String},
 genre: {type: String},
 plot: {type: String},
 actors: [{type: Schema.Types.ObjectId, ref:'Celeb'}],
 reviews: [
    {reviewer: String, content: String}
  ]
}, {
    timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

// Movies will translate, in the DB, to movies
const Movie = mongoose.model('Movie', movieSchema)


module.exports = Movie;