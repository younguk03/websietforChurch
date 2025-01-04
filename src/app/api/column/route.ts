import connectMongoDB from '@/libs/mongodb';
import Board from '@/models/board';
import { NextResponse } from 'next/server';

export async function GET() {
   try {
      await connectMongoDB();
      const boards = await Board.find({categorie:'목사님 칼럼'}).sort({ createdAt: -1 })
      return NextResponse.json(boards);
   } catch (error) {
      console.log(error)
      console.error('Error fetch dics')
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
   }
}