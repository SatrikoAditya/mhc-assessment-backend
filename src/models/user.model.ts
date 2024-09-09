import mongoose, { Schema } from "mongoose";
import { toJSON } from "@src/plugins/toJSON";
import { IUserDoc } from "@src/interfaces/user.interface";
import {
  generateHashPassword,
  compareHashedPassword,
} from "@src/plugins/bcrypt/bcrypt";

const userSchema = new Schema<IUserDoc>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value: string) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
      private: true, // used by the toJSON plugins
    },
    userType: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Company",
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Vendor",
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);

/**
 * Check if username is exist
 * @param {string} username - The user's username
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.static(
  "isUsernameExist",
  async function (
    username: string,
    excludeUserId: mongoose.ObjectId
  ): Promise<boolean> {
    const user = await this.findOne({ username, _id: { $ne: excludeUserId } });
    return !!user;
  }
);

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.method(
  "isPasswordMatch",
  async function (password: string): Promise<boolean> {
    const user = this;
    return await compareHashedPassword(password, user.password);
  }
);

// Hashing password before saving user
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await generateHashPassword(user.password);
  }
  next();
});

const User = mongoose.model<IUserDoc>("User", userSchema);

export default User;
