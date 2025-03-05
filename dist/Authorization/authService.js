"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const user_model_1 = require("../Models/user-model");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // Find the user by Google ID
        let user = yield user_model_1.userModel.findOne({ googleId: profile.id });
        if (!user) {
            // If user does not exist, check if email already exists in the database
            user = yield user_model_1.userModel.findOne({ email: (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0].value });
            if (!user) {
                user = yield user_model_1.userModel.create({
                    googleId: profile.id, // Save the googleId
                    name: profile.displayName,
                    email: ((_b = profile.emails) === null || _b === void 0 ? void 0 : _b[0].value) || "",
                    password: "password",
                    confirmPassword: "password",
                    role: "user",
                });
            }
        }
        return done(null, user); // Pass the user object to done
    }
    catch (error) {
        return done(error); // Pass the error to done
    }
})));
// Serialize user to store user info in session
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
// Deserialize user from session (fetch full user data)
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.userModel.findById(id);
        done(null, user); // Attach the user object to req.user
    }
    catch (error) {
        done(error, null);
    }
}));
