// Require schema and model from mongoose
const mongoose = require('mongoose');

// Construct a new instance of the schema class
const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true 
    },
    email: { 
        type: String, 
        required: true,
        unique: true,
        // TODO: Check if this validator works 
        match: [ 
            `/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/`,
            'Invalid email address'
        ] 
    },
    // thoughts: [], TODO: Figure out what this should be
    // friends: [], TODO: Figure out what this should be
    // Use built in date method to get current date
    lastAccessed: { 
        type: Date, 
        default: Date.now 
    },
});

// Using mongoose.model() to compile a model based on the schema 'bookSchema'
// const User = mongoose.model('Users', userSchema);

// Create new instances of the model, a document
// User.create([

// ]);

module.exports = User;
