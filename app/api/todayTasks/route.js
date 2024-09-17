import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');
    const date = url.searchParams.get('date');

    if (!userId || !date) {
      return new NextResponse(JSON.stringify({ error: 'userId and date are required' }), {
        status: 400,
      });
    }

    const query = `SELECT * FROM tasks WHERE assigned_to = ? AND due_date = ?`;
    const [rows] = await db.query(query, [userId, date]);

    if (rows.length === 0) {
      return new NextResponse(JSON.stringify({ message: 'No tasks found' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new NextResponse(JSON.stringify(rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Server error:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    });
  }
}
