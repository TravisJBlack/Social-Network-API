const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
        createdAt: { type: Date, default: Date.now, get: (createdAt) => createdAt.toString()} ,
        username: {type: String, required: true },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
        getters: true,
        virtuals: true,
        },
        id: false,
    });

userSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const User = model('user', userSchema);

module.exports(User);