import mongoose, { mongo } from 'mongoose';

mongoose.connect('mongodb://localhost:27017/paytm');

const userSchema = new mongoose.Schema({
    userName: String,
    password: String,
    firstName: String,
    lastName: String,
})

export const User = mongoose.model("User", userSchema);