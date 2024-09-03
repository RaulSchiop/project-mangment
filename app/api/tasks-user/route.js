import { db } from '../../../lib/db';
import { NextResponse } from 'next/server';
export async function GET(req) {
  try {
    const userId = req.headers.get('user-id');

    if (!userId || isNaN(parseInt(userId, 10))) {
      return new NextResponse(JSON.stringify({ error: 'Invalid or missing user-id' }), {
        status: 400,
      });
    }

    const query = `
      SELECT id, title, description, status, due_date
      FROM tasks
      WHERE assigned_to = ?
    `;

    const [rows] = await db.query(query, [parseInt(userId, 10)]);
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
