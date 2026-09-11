import mongoose from 'mongoose';

async function ConnectDb(){
    await mongoose.connect(process.env.MONGO_URL).then(
        console.log("Db connected")
    )
}

export default ConnectDb;