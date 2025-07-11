import mongoose, { Document, Schema } from "mongoose";

export interface ITodo extends Document {
    title: string;
    description: string;
    completed: boolean;
    userId: mongoose.Schema.Types.ObjectId;
}
const todoSchema: Schema = new Schema (
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        completed: {
            type: Boolean,
            default: false
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);
const Todo = mongoose.model<ITodo>('Todo', todoSchema);
export default Todo;