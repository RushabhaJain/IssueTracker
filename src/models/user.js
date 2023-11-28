import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function(next) {
    const user = this;
    // Hash the password
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
});

export const User = mongoose.model('User', userSchema);