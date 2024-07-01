const connection = require('../config/connection');
const { User, Thought} = require('../models');

const userData = require('./userData.json');
const thoughtData = require('./thoughtsData.json');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    let userCheck = await connection.db.listCollections({ name: 'user'}).toArray();
    if (userCheck.length) {
        await connection.dropCollection('user');
    }

    let thoughtCheck = await connection.db.listCollections({ name: 'thought'}).toArray();
    if (thoughtCheck.length) {
        await connection.dropCollection('user');
    }
})

const seedDB =  async () => {

    const user = await User.create(userData);

    const thought = await Thought.create(thoughtData);
    
    process.exit(0);
}

seedDB();