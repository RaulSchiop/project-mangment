
import { db } from '../../../lib/db';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const url = new URL(req.url);
  const getProject = url.searchParams.get('projectId');
  const getUserId = url.searchParams.get('userId');

  if (!getProject || !getUserId) {
    return new NextResponse(JSON.stringify({ error: 'Missing projectId or userId' }), {
      status: 400,
    });
  }

  try {
    const query = 'SELECT * FROM tasks WHERE project_id = ? AND assigned_to = ?;';
    const [rows] = await db.query(query, [getProject, getUserId]);

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
