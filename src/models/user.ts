export const runtime = 'nodejs'
import mongoose, { Schema, model } from "mongoose"

interface IUser {
   name: string
   email: string
   password: string
}
const UserSchema = new Schema<IUser>({
   name: { type: String, required: true },
   email: {type: String, required: true, unique: true},
   password: { type: String, required: true },
}, { timestamps: true })


const User = mongoose.models?.User || model<IUser>('User', UserSchema);
export default User;