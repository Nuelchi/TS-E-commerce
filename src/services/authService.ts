import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { userModel } from "../Models/user-model";
import dotenv from "dotenv";

dotenv.config();

// Configure Google OAuth strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: "http://localhost:3000/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await userModel.findOne({ googleId: profile.id });

                // Check if email exists in the database
                if (!user) {
                    user = await userModel.findOne({ email: profile.emails?.[0].value });

                    if (!user) {
                        user = await userModel.create({
                            googleId: profile.id,
                            name: profile.displayName,
                            email: profile.emails?.[0].value || "",
                            password: "password",
                            confirmPassword: "password",
                            role: "user",
                        });
                    }
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

// Serialize user (store user ID in session)
passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

// Deserialize user (fetch full user data from session)
passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await userModel.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

export default passport;