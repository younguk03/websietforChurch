import connectMongoDB from '@/libs/mongodb';
import Board from '@/models/board';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req:NextRequest) {
   try {
      await connectMongoDB();
      const {searchParams} = new URL(req.url);
      const page = parseInt(searchParams.get('page') || '1', 10);
      const totalPage = Math.ceil(await Board.find({categorie:'목사님 칼럼'}).sort({ createdAt: -1 }).countDocuments()/5)//전체 페이지수
      const boards = await Board.find({categorie:'목사님 칼럼'}).sort({ createdAt: -1 }).skip((page-1)*5).limit(5)
      return NextResponse.json({boards,page,totalPage});
   } catch (error) {
      console.log(error)
      console.error('Error fetch dics')
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
   }
}