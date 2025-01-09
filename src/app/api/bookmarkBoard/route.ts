import { auth } from "@/auth";
import connectMongoDB from "@/libs/mongodb";
import Board from "@/models/board";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
   try {
      const session = await auth()
      await connectMongoDB();
      const {searchParams} = new URL(req.url);
      const page = parseInt(searchParams.get('page') || '1', 10);
      const totalPage = Math.ceil(await Board.find({bookmark:`${session?.user?.name}`,
         categorie: { $ne: "앨범" }}).countDocuments()/4)
      const userBoard = await Board.find({bookmark:`${session?.user?.name}`,
         categorie: { $ne: "앨범" }}).sort({createdAt:-1}).skip((page-1)*4).limit(4);
      return NextResponse.json({userBoard,page,totalPage});
   } catch (error) {
      console.log(error)
      console.error('Error fetch dics')
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
   }
}