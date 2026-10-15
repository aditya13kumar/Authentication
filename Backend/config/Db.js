import mongoose from 'mongoose';

async function ConnectDb(){
    try {
        await mongoose.connect(process.env.MONGO_URL).then(
        console.log("Db connected")
        )       
    } catch (error) {
        console.log(error);
    }
    
}

export default ConnectDb;