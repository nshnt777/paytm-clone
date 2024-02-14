import mongoose from 'mongoose'
import env from 'dotenv';
env.config();

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@paytmaccounts.z7vtml7.mongodb.net/paytm`)
.then((result) => {
    console.log("Database connected successfully");
})
.catch((err) => {
    console.log("Error: ", err.message);
});

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, minLength: 8},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
});

const UserModel = mongoose.model("Users", userSchema);

const accountSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    balance: {
        type: Number,
        default: 0
    }
});

const AccountModel = mongoose.model("Accounts", accountSchema);

export {UserModel, AccountModel};