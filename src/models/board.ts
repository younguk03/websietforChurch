import mongoose, { Schema } from 'mongoose'

const boardSchame = new Schema({
   title: String,
   description: String,
   categorie: String,
   user: String,
   bookmark:[String],
}, {timestamps:true})

const Board = mongoose.models.Board || mongoose.model('Board',boardSchame);
export default Board;