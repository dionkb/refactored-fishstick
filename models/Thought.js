// Require schema and model from mongoose
const mongoose = require('mongoose');

// Defining a new schema for the subdocument
const reactionSchema = new mongoose.Schema({
    reactionId: { 
        type: mongoose.Schema.Types.ObjectId, 
        default: () => new Types.ObjectId(),
    },
    reactionBody: { 
        type: String, 
        required: true,
        maxLength: 280
    },
    username: {
        type: String, 
        required: true,
    },
    createdAt: {
        type: Date, 
        default: Date.now,
        // get: timeFormat, TODO:
    }
});

// Construct a new instance of the schema class
const thoughtSchema = new mongoose.Schema(
    {
        thoughtText: { 
            type: String, 
            required: true, 
            minLength: 1,
            maxLength: 280
        },
        createdAt: { 
            type: Date, 
            default: Date.now,
            // get: timeFormat, TODO:
        },
        username: { 
            type: String, 
            required: true, 
        },
        reactions: [reactionSchema],
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

// TODO: Creating the getter function used in createdAt attribute of reactionSchema & thoughtSchema
// function timeFormat(date) {
//     if (date) {
//         return date      
//     }
// }

// Adding a 'virtual' property to the model
thoughtSchema
    // naming the virtual function
    .virtual('reactionCount')
    // The GETTER function
    .get(function() {
        return this.reactions.length;
    });

// Using mongoose.model() to compile a model based on the schema 'thoughtSchema'
const Thought = mongoose.model('Thoughts', thoughtSchema);

// Create new instances of the model, a document
// Thought.create([

// ]);

module.exports = Thought;
