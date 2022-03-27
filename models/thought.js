const { Schema, model, Types } = require('mongoose');
const dateFormat = require("../utils/dateFormat");

const thoughtSchema = new Schema(
{
    userName: {
        type: String,
        required: true,
        trim: true,
        required: 'First Name is Required'
    },

    lastName: {
        type: String,
        trim: true,
        required: 'Last Name is Required'
    },

    password: {
        type: String,
        trim: true,
        required: 'Password is Required',
        validate: [({ length }) => length >= 6, 'Password should be longer.']
    },

    email: {
        type: String,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },

    userCreated: {
        type: Date,
        default: Date.now
    }
},
    {
    toJSON: {
        virtuals: true,
    },
    id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reaction.length;
}); 

const Thought = model('Thought', thoughtSchema);

module.exports = User;