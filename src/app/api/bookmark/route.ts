import connectMongoDB from '@/libs/mongodb';
import Board from '@/models/board';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
   try {
      await connectMongoDB();
      const { id } = params;
      const { userName } = await request.json();

      const board = await Board.findById(id);

      if (!board) {
         return NextResponse.json({ message: 'Board not found' }, { status: 404 });
      }

      const bookmarks = board.bookmark || [];
      const index = bookmarks.indexOf(userName);

      if (index > -1) {
         bookmarks.splice(index, 1);
      } else {
         bookmarks.push(userName);
      }

      await Board.findByIdAndUpdate(id, { bookmark: bookmarks });

      return NextResponse.json({ message: 'Bookmark updated successfully' }, { status: 200 });
   } catch (error) {
      console.error('Error updating bookmark:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
   }
}
