const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    totalDuration: {
        type: Number,
        default: 0
    },
    exercises: [{
        workoutType: String,
        name: String,
        duration: Number,
        weight: Number,
        reps: Number,
        sets: Number
    }]
});

// workoutSchema.methods.setTotalDuration = () => {
//     let total = 0;

//     (this.exercises).forEach(exercise => {
//         total += exercise.duration;
//     });

//     this.totalDuration = total;

//     return this.totalDuration;
// }

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;