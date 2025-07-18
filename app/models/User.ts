// import mongoose, { Document, Schema, Model } from "mongoose";
// import bcrypt from "bcryptjs";

// export interface IUser extends Document {
//   name: string;
//   email: string;
//   password: string;
//   comparePassword(candidatePassword: string): Promise<boolean>;
// }

// const userSchema: Schema<IUser> = new Schema(
//   {
//     name: { type: String, required: true, trim: true },
//     email: {
//       type: String,
//       required: true,
//       trim: true,
//       lowercase: true,
//       unique: true,
//       match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
//     },
//     password: { type: String, required: true, minlength: 6 }
//   },
//   { timestamps: true }
// );

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
//   const result = await bcrypt.compare(candidatePassword, this.password);
//   console.log("bcrypt.compare result:", result); 
//   return result;
// };


// const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
// export default User;




import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  resetToken?: string;
  resetTokenExpiry?: number;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    password: { type: String, required: true, minlength: 6 },
    resetToken: { type: String },              // optional field for password reset
    resetTokenExpiry: { type: Number }         // UNIX timestamp (ms)
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const result = await bcrypt.compare(candidatePassword, this.password);
  return result;
};

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;
