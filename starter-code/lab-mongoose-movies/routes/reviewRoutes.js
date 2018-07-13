const express       = require('express');
const reviewRouter  = express.Router();
const Movie          = require('../models/movie-model');



reviewRouter.get('/movies/:id/reviews/new', (req, res, next)=>{
    Movie.findById(req.params.id)
    .then((theMovie)=>{
    res.render('movies/addReview', {theMovie})
    })
    .catch((err)=>{
        next(err)
    });
})

reviewRouter.post('/movies/:id/reviews/create', (req, res, next)=>{
    Movie.findByIdAndUpdate(req.params.id, {$push:{reviews: req.body}})
    .then((response)=>{
        res.redirect('/movies/' + req.params.id)
    })
    .catch((err)=>{
        next(err)
    });
})

reviewRouter.post('/movies/:id/delete', (req, res, next)=>{
    Movies.findByIdAndRemove(req.params.id)
    .then((reponse)=>{
        res.redirect('/movies');
    })
    .catch((err)=>{
        next(err);
    })
})




// //EDIT REVIEW
// movieRouter.get('/movies/:movieId/edit', (req, res, next)=>{
//     const id = req.params.movieId;
//     // console.log('id is:', id)
//     Movie.findById(id)
//     .then(oneMovie =>{
//         // console.log('is this one movie:', oneMovie)
//         res.render('movies/edit-movies', {movie: oneMovie})
//     })
//     .catch(err => console.log('error whiel updating movie', err));
// })


// // post route to pick up the changes and send it to DB
// movieRouter.post('/movies/:id/update', (req, res, next)=>{
//     const movieId = req.params.id;
//     const editedMovie = {
//         title: req.body.title,
//         genre: req.body.genre,
//         plot: req.body.plot
//     }
//     // console.log('edited:', editedMovie)
//     // findByIdAndUpdate takes 2 arguments. first is the id, second is the changes saved in editMovie var.
//     Movie.findByIdAndUpdate(movieId, editedMovie)
//     .then(() =>{
//         res.redirect(`/movies/${movieId}`)
//     })
//     .catch(err => console.log('error while saving chagnes after edit', err))
// })



// DELETE REVIEW
reviewRouter.post('/movies/:id/reviews/:reviewIndex/delete', (req, res, next)=>{
    const movieID = req.params.id;
    const reviewIndex = req.params.reviewIndex;
    Movie.findById(movieID)
    .then((theMovieThatImEditing)=>{
        theMovieThatImEditing.reviews.splice(reviewIndex, 1);
        theMovieThatImEditing.save()
        .then((x)=>{
            res.redirect('/movies/' + movieID)
        })

        .catch((err)=>{
            next(err)
        })
    })
    .catch((err)=>{
        next(err);
    })
})





module.exports = reviewRouter;