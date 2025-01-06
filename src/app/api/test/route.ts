import connectMongoDB from '@/libs/mongodb';
import Board from '@/models/board';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req:NextRequest) {
   try {
      await connectMongoDB();
      //1.파라미터값
      const {searchParams} = new URL(req.url);
      const page = parseInt(searchParams.get('page') || '1', 10);
      // const limit = Number(searchParams.get('limit'))
      const totalPage = Math.floor(await Board.find({categorie:{$ne:'앨범'}}).sort({ createdAt: -1 }).countDocuments()/2)+1//전체 페이지수
      const boards = await Board.find({categorie:{$ne:'앨범'}}).sort({ createdAt: -1 }).skip((page-1)*2).limit(2)
      return NextResponse.json({boards,page,totalPage});
   } catch (error) {
      console.log(error)
      console.error('Error fetch dics')
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
   }
}