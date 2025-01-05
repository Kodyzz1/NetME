import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:26017/socialNetworkDB'{
useNewUrlParser: true,
useUnifiedTopology: true,
});

const db = mongoose.connection;

export default db;
