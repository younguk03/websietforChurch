import connectMongoDB from '@/libs/mongodb';
import Board from '@/models/board';
import { NextResponse } from 'next/server';

export async function GET() {
   try {
      await connectMongoDB();
      //categorie가 앨범인것 제외하고 검색
      const boards = await Board.find({categorie:{$ne:'앨범'}}).sort({ createdAt: -1 })
      return NextResponse.json(boards);
   } catch (error) {
      console.log(error)
      console.error('Error fetch dics')
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
   }
}