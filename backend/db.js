import mongoose, { Schema, model } from 'mongoose';

export const connectToDB = () => {
    const DB_URL = process.env.DB_URL;
    mongoose.connect(DB_URL);
}


const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
})

const accountSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const historySchema = new Schema({
    fromId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    toId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
}, { timestamps: true })

export const User = model("User", userSchema);
export const Account = model("Account", accountSchema);
export const History = model("History", historySchema);