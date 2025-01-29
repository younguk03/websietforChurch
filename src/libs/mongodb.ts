export const runtime = "nodejs";

import mongoose from "mongoose";

export default async function connectMongoDB() {
   try {
      await mongoose.connect('mongodb+srv://hoebokYouth:gksksla1@hoebokyouth.42mz7.mongodb.net/?retryWrites=true&w=majority&appName=hoebokYouth',{
         serverSelectionTimeoutMS: 30000})
      console.log("connected to MongoDB. 몽고디비 연결 완료");
   } catch (error) {
      console.log(error);
   }
}

