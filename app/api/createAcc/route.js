import { NextResponse } from 'next/server';
import { db } from '../../../lib/db'; 

export async function POST(req) {
    try {
        const { email, password, name } = await req.json();

        if (!email || !password || !name) {
            return new NextResponse(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }


        const query = `INSERT INTO users (Email, Password, Name) VALUES (?, ?, ?)`;
        const [rows] = await db.query(query, [email, password, name]);



        
        return new NextResponse(JSON.stringify(rows), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Server error:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
