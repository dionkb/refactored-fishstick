// Require schema and model from mongoose
const mongoose = require('mongoose');

// Construct a new instance of the schema class
const userSchema = new mongoose.Schema(
    {
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
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        // Use built in date method to get current date
        lastAccessed: { 
            type: Date, 
            default: Date.now 
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    },
);

// Adding a 'virtual' property to the model
userSchema
    // naming the virtual function
    .virtual('friendCount')
    // The GETTER function
    .get(function() {
        return this.friends.length;
    });

// Using mongoose.model() to compile a model based on the schema 'userSchema'
const User = mongoose.model('User', userSchema);

// Create new instances of the model, a document
// User.create([

// ]);

module.exports = User;
