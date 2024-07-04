const { User, Thought } = require('../models');

module.exports = {
    // returns all users
    async getUsers(req, res) {
        try {
            const users = await User.find();

            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //get one user provided by the req.params
    async getOneUser(req, res) {
        try {
            const oneUser = await User.findOne({ _id: req.params.userId })


            if (!oneUser) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.status(200).json(oneUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //creates a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);

            res.status(200).json(user);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    //delets a user via the req.params 
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId })

            if (!user) {
                res.status(400).json({ message: 'No user with that ID' })
            }

            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'User and thoughts deleted for this user' });
        } catch (err) {
            res.status(500).json(err)
        }
    },

    //updates the user provided by the req.params variable
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                res.status(400).json({ message: 'No user with this ID' })
            }

            res.json(user);
        } catch (err) {
            res.staus(500).json(err);
        }
    },

    // add friend to a User
    async addFriend(req, res) {
        try {
            const friend = await User.findOne({ _id: req.params.friendId });
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: friend._id } },
                { new: true }
            );

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'No user with that ID!' });
            }

            res.json({ message: 'Added friend' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    //removes provided friend from the provided user both via req.params
    async deleteFriend(req, res) {
        try {
            const friend = await User.findOne({ _id: req.params.friendId });
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: friend._id } },
                { new: true }
            );

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'No user with that ID!' });
            }

            res.json({ message: 'Added friend' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
}