const express = require('express');
const movieRouter = express.Router();
//require model(s)
const Movie = require('../models/movie-model');


// This states the whole list of movies in the DB
movieRouter.get('/movies', (req, res, next)=>{
  
        res.render('movies/movie-list');
})


// When making API, need one get route that just renders an empty page(see above). then create get to api that uses json
// to get all the moves frm DB. 
movieRouter.get('/api/movies', (req, res, next)=>{
    Movie.find()
    .then(responseFromDB =>{
        console.log('Movies:', responseFromDB);
        res.json(responseFromDB);
    })
    .catch(err => console.log('errorwhiel getting movie DB', err));
})

// The form page for adding a movie. i think i get this now.
// find all the celebs then do a thing called allTheCelebs that
// renders the page and puts all the celebs you found in there.
movieRouter.get('/movies/create', (req, res, next)=>{
    Celeb.find()
    .then((allTheCelebs)=>{
        res.render('movies/new-movie', {allTheCelebs})
    })
    .catch((err)=>{
        next(err)
    })
})
  
// this is what happens to the data inputted in the forms page... nevermind i dont get this.
movieRouter.post('/movies/new-movie', (req, res, next)=> {
    const newMovie = {
        title: req.body.newTitle,
        genre: req.body.newGenre,
        plot: req.body.newPlot,
        actors: req.body.newActors
    }
    // res.redirect( err => console.log('error adding a movie', err))

    Movie.create(newMovie)
    .then(()=>{
        // redirect to /movies after the newMovie is created
        res.redirect('/movies')
    })
    .catch(err => console.log('error while saving new movie', err))


// movieRouter.post('/create', (req, res, next)=>{
//     const newMovie = new Movie(req.body);
//     newMovie.save()
//     .then = () =>{
//         // redirect looks for URL. always starts with '/blah'
//         res.redirect('/movies/new-movie')
//         .catch( err => console.log('error while saving the new movie', err))
//     };
// })
})


// post probably is for forms.
// edit the movie - get route. to display the form
movieRouter.get('/movies/:movieId/edit', (req, res, next)=>{
    const id = req.params.movieId;
    // console.log('id is:', id)
    Movie.findById(id)
    .then(oneMovie =>{
        // console.log('is this one movie:', oneMovie)
        res.render('movies/edit-movies', {movie: oneMovie})
    })
    .catch(err => console.log('error whiel updating movie', err));
})


// post route to pick up the changes and send it to DB
movieRouter.post('/movies/:id/update', (req, res, next)=>{
    const movieId = req.params.id;
    const editedMovie = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot
    }
    // console.log('edited:', editedMovie)
    // findByIdAndUpdate takes 2 arguments. first is the id, second is the changes saved in editMovie var.
    Movie.findByIdAndUpdate(movieId, editedMovie)
    .then(() =>{
        res.redirect(`/movies/${movieId}`)
    })
    .catch(err => console.log('error while saving chagnes after edit', err))
})

// delete
movieRouter.post('/movies/:movieId/delete', (req, res, next)=>{
    const id = req.params.movieId;
    Movie.findByIdAndRemove(id)
    .then( () =>{
        res.redirect('/movies');
    })
    .catch(err => console.log('error while deleting', err));
})


movieRouter.get('/movies/:theId', (req, res, next)=>{
    const movieId = req.params.theId;
    console.log('id:', movieId);
    Movie.findById(movieId)
    .then(oneMovieFromDB => {
        // movies is the folder in views
        res.render('movies/movie-detail', {movie: oneMovieFromDB});
    })
    .catch(err => console.log('error while getting sinlge movie from db', err))
});

module.exports = movieRouter;







