
import { db } from '../../../lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const query = `
    SELECT users.id, users.Email, users.name, ProjectMembers.role
    FROM users
    LEFT JOIN ProjectMembers ON users.id = ProjectMembers.user_id
    LIMIT 3
    `;
    const [rows] = await db.query(query);
    return new NextResponse(JSON.stringify(rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
