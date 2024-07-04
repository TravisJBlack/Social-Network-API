const { User, Thought } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();

            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

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

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);

            res.status(200).json(user);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

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

    async updateUser (req, res) {
        try{
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                res.status(400).json({message: 'No user with this ID'})
            }

            res.json(user);
        } catch (err) {
            res.staus(500).json(err);
        }
    }
}