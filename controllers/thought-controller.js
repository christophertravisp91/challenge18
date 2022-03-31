const { Thought, User } = require("../models");

const thoughtController = {

getAllThoughts(req, res) {
    Thought.find({})
        .populate({
        path: "reactions",
        select: "-__v",
    })
        .populate({
        path: "thoughts",
        select: "-__v",
    })
    .select("-__v")
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => {
        console.log(err);
        res.status(400).json(err);
    });
},
getThoughtById({ params }, res) {
    Thought.findOne({ __id: params.id })
    .then((dbThoughtData) => {
        if (!dbThoughtData) {
            res.status(404).json({ message: "No thought with this ID" });
            return;
        }
        res.json(dbThoughtData);
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json(err);
    });
},

};

module.exports = thoughtController;
