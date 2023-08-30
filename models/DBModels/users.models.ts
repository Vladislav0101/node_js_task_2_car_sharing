import mongoose from "mongoose";

import { User } from "../users";

const Schema = mongoose.Schema;

const UserSchema = new Schema<User>({
  licenseNumber: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  creditCard: {
    type: {
      number: Number,
      owner: String,
      validThrough: Date,
    },
  },
});

const UserModel = mongoose.model("User", UserSchema);

export { UserModel };
