const { Schema, Types } = require('mongoose');
const dayjs = require('dayjs');

const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now, 
            createdAt: { type: Date, default: dayjs(), get: (createdAt) => dayjs(createdAt).format('MMM MM[th], YYYY [at] hh:mm a')},

        }
    },
    {
        toJSON: {
            getters: true,
        }
    }
)

module.exports = reactionSchema;