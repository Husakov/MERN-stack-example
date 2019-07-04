const express = require('express');
const moviesRoutes = express.Router();

// Require Business model in our routes module
let Movies = require('./movies.model');

// Defined store route
moviesRoutes.route('/add').post(function (req, res) {
    let movies = new Movies(req.body);
    movies.save()
        .then(business => {
            res.status(200).json({'Movies': 'movie in added successfully'});
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

// Defined get data(index or listing) route
moviesRoutes.route('/').get(function (req, res) {
    Movies.find(function(err, moviess){
        if(err){
            console.log(err);
        }
        else {
            res.json(moviess);
        }
    });
});

// Defined edit route
moviesRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    Movies.findById(id, function (err, business){
        res.json(business);
    });
});

//  Defined update route
moviesRoutes.route('/update/:id').post(function (req, res) {
    Movies.findById(req.params.id, function(err, movies) {
        if (!movies)
            res.status(404).send("data is not found");
        else {
            movies.title = req.body.person_name;
            movies.Vote_Mark = req.body.business_name;
            movies.Image = req.body.business_gst_number;

            movies.save().then(movies => {
                res.json('Update complete');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

// Defined delete | remove | destroy route
moviesRoutes.route('/delete/:id').get(function (req, res) {
    Movies.findByIdAndDeleteOne()({_id: req.params.id}, function(err, movies){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = moviesRoutes;
