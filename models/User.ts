import mongoose,{Document,Schema,Model, model} from "mongoose";
export interface IUser extends Document{
    name: string;
    email:string;
}
const userSchema: Schema<IUser> = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
            match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
        }
    },
    {
        timestamps: true
    }
);
const User: Model<IUser> = mongoose.model<IUser>('User',userSchema);
export default User;
