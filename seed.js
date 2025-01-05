import mongoose from 'mongoose';
import Thought from './models/thought.js';
import User from './models/user.js'; // Assuming you have a User model

const seedData = async () => {
    await mongoose.connect('mongodb://localhost:27017/socialNetworkDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await Thought.deleteMany({});
    await User.deleteMany({});

    const users = await User.insertMany([
        {
            username: 'john_doe',
            email: 'john@example.com',
        },
        {
            username: 'jane_doe',
            email: 'jane@example.com',
        },
        {
            username: 'alice_smith',
            email: 'alice@example.com',
        },
        {
            username: 'bob_jones',
            email: 'bob@example.com',
        },
    ]);
    console.log('Users seeded!');

    console.log('Users:', users);

    const thoughts = await Thought.insertMany([
        {
            thoughtText: 'This is a thought by John',
            username: users[0].username,
            reactions: [
                { reactionBody: 'Great thought!', username: users[1].username },
                { reactionBody: 'Interesting perspective.', username: users[2].username },
            ],
        },
        {
            thoughtText: 'This is a thought by Jane',
            username: users[1].username,
            reactions: [
                { reactionBody: 'I agree!', username: users[0].username },
                { reactionBody: 'Well said.', username: users[3].username },
            ],
        },
        {
            thoughtText: 'This is a thought by Alice',
            username: users[2].username,
            reactions: [
                { reactionBody: 'Nice thought!', username: users[1].username },
            ],
        },
        {
            thoughtText: 'This is a thought by Bob',
            username: users[3].username,
            reactions: [
                { reactionBody: 'I like this.', username: users[2].username },
            ],
        },
    ]);
    console.log('Thoughts:', thoughts);

    console.log('Thoughts seeded!');

    console.log('Database seeded!');
    mongoose.connection.close();
};

seedData().catch((error) => {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
});