const Workout = require("../models/workout")

module.exports = (app) => {
    app.get("/api/workouts/range", (req, res) => {
        Workout.find({})
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });

    app.get("/api/workouts", (req, res) => {
        Workout.find().sort({ _id: -1 }).limit(1)
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });

    app.post("/api/workouts", (req, res) => {
        Workout.create({})
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });

    app.put("/api/workouts/:id", (req, res) => {
        Workout.findById(req.params.id)
            .then(dbWorkout => {

                let totalTime = req.body.duration;

                (dbWorkout.exercises).forEach(exercise => {
                    console.log(exercise.duration)
                    totalTime += exercise.duration;
                });

                Workout.update(
                    { _id: req.params.id },
                    {
                        $push: { exercises: req.body },
                        $set: { totalDuration: totalTime }
                    }
                )
                    .then(dbWorkout => {
                        res.json(dbWorkout);
                    })
                    .catch(err => {
                        res.status(400).json(err);
                    });
            })
            .catch(err => {
                res.status(400).json(err);
            });



        // Workout.update(
        //     { _id: req.params.id },
        //     {
        //         $push: { exercises: req.body },
        //     }
        // )
        //     .then(dbWorkout => {
        //         res.json(dbWorkout);
        //     })
        //     .catch(err => {
        //         res.status(400).json(err);
        //     });
    });
}
