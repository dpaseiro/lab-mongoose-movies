const express = require('express');
const celebRouter  = express.Router();

const Celeb = require('../models/celebrity');



celebRouter.get('/celebs', (req, res, next)=>{
    Celeb.find()
    .then(respondFromDB =>{
        console.log('Celebs:', respondFromDB)
        res.render('celebs/celeb-list', {celebs: respondFromDB})
    })
    .catch(err => console.log('error getting celeb DB', err))
})

celebRouter.get('/celebs/create', (req, res, next)=>{
    res.render('celebs/new-celeb')
});

celebRouter.post('/celebs/create', (req, res, next) =>{
    const newCeleb = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    }
    Celeb.create(newCeleb)
    .then (() =>{
        res.redirect('/celebs')
    })
    .catch(err => console.log('error create new celeb', err))
});

celebRouter.get('/celebs/:id', (req, res, next)=>{
    // const movieId = req.params.id;
    Celeb.findById(req.params.id)
    .then((oneCeleb)=>{
        res.render('celebs/celeb-details', {celeb: oneCeleb})
    })
    .catch((err)=>{
        next(err)
    });
})



  //edit
  celebRouter.get('/celebs/:id/edit', (req, res, next)=>{
      const id = req.params.celebId;
      Celeb.findById(id)
      .then(oneCeleb =>{
          res.render('celebs/edit-celebs', {celeb: oneCeleb})
        })
      .catch(err => console.log('error updating celeb', err))
  })

  celebRouter.post('/celebs/:id/edit', (req, res, next)=>{
    const celebId =req.params.id;
    const editedCeleb = {
        name: req.body.editedName,
        occupation: editedOccupation,
        catchPhrase: editedCatchPhrase
    }
    console.log('edited: ', editedCeleb)
    Celeb.findByIdAndUpdate(celebId, editedCeleb)
    .then(()=>{
        res.redirect(`/celebs/${celebId}`);
    })
    .catch(err => console.log('error while saving changes after edit', err))
})



//DELETE

celebRouter.get('/celebs/:id/delete', (req, res, next)=>{
    res.render('celebs')
})

celebRouter.post('/celebs/:id/delete', (req, res, next)=>{
    const id = req.params.id;
    Celeb.findByIdAndRemove(id)
    .then(()=>{
        // HOW DO I KNOW WHEN TO REDIRECT OR TO RENDER? redirect for a post. render for get.
        res.redirect('/celebs');
    })
    .catch(err => consle.log('err while del', err));
})


// celebRouter.get('/celebs/:id', (req, res, next)=>{
//     const celebId = req.params.id;
//     Celeb.findById(celebId)
//     .then(oneCelebFromDB => {
//         res.render('celebs/celeb-details', {celeb: oneCelebFromDB});
//     })
//     .catch(err => console.log('err getting single celeb', err))
// });





module.exports = celebRouter;