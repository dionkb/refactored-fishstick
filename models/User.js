// Require schema and model from mongoose
const { Schema, model } = require('mongoose');

// Construct a new instance of the schema class
const userSchema = new Schema(
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
            validate: {
                validator: function(email) {
                    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email);
                },
                message: input => `${input.value} is not a valid email address`
            },
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
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
const User = model('user', userSchema);

module.exports = User;
