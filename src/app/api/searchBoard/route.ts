import connectMongoDB from "@/libs/mongodb"
import Board from "@/models/board";
import { NextResponse } from "next/server"

export async function GET(request:Request) {
   try {
      await connectMongoDB();
      const {searchParams} = new URL(request.url);
      const title = searchParams.get('title');
      const searchTitle = title||'';
      const board = await Board.find({"title":{$regex: new RegExp(searchTitle,"i")}}).sort({createdAt: -1})
      return NextResponse.json(board)
   } catch (error) {
      console.log(error)
      return NextResponse.json({error:'Error fteching Board data'}, {status:500})
   }
}