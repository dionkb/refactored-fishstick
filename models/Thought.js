// Require schema and model from mongoose
const { Schema, model } = require('mongoose');

// Defining a new schema for the subdocument
const reactionSchema = new Schema(
    {
        reactionId: { 
            type: Schema.Types.ObjectId, 
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
            get: timeFormat => timeFormat.toLocaleString(),
        }
    },
    {
        toJSON: {
            getters: true,
        }
    }
);

// Construct a new instance of the schema class
const thoughtSchema = new Schema(
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
            get: timeFormat => timeFormat.toLocaleString(),
        },
        username: { 
            type: String, 
            required: true, 
        },
        reactions: [reactionSchema],
        lastAccessed: { 
            type: Date, 
            default: Date.now 
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    },
);

// Adding a 'virtual' property to the model
thoughtSchema
    // naming the virtual function
    .virtual('reactionCount')
    // The GETTER function
    .get(function() {
        return this.reactions.length;
    });

// Using mongoose.model() to compile a model based on the schema 'thoughtSchema'
const Thought = model('Thoughts', thoughtSchema);

// Create new instances of the model, a document
// Thought.create([

// ]);

module.exports = Thought;
