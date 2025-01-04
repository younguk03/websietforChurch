import { auth } from '@/auth';
import connectMongoDB from '@/libs/mongodb';
import Board from '@/models/board';
import { NextResponse } from 'next/server';

export async function GET() {
   try {
      const session = await auth()
      await connectMongoDB();
      const boardsCount = await Board.find({user:`${session?.user?.name}`,categorie:'앨범'}).countDocuments()
      return NextResponse.json(boardsCount);
   } catch (error) {
      console.log(error)
      console.error('Error fetch dics')
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
   }
}