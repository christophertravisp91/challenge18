const { User } = require("../models");
const { populate } = require("../models/User");

const userController = {

getAllUsers(req, res) {
    User.find({})
        .populate({
        path: "thoughts",
        select: "-__v",
    })
    .select("-__v")
    .sort({ _id: -1 })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
        console.log(err);
        res.status(400).json(err);
    });
},
getUserById({ params }, res) {
    User.findOne({ __id: params.id })
    .populate({
        path: "thoughts",
        select: "-__v",
    })
    .select("-__v")
    .then((dbUserData) => {
        // If no user is found
        if (!dbUserData) {
            res.status(404).json({ message: "No user found with this ID" });
            return;
        }
        res.json(dbUserData);
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json(err);
    });
},
createUser({ body }), res) {
    User.create(body)
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(400).json(err));
},