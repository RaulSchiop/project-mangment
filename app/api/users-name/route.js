import { db } from "../../../lib/db";
import { NextResponse } from "next/server";
export async function GET(request) {
  try {

    const userId = request.headers.get("user-id");

    
    if (!userId) {
      console.error("User ID not provided");
      return new NextResponse(
        JSON.stringify({ error: "User ID not provided" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }


    const query = `SELECT name FROM users WHERE id = ?`;
    const [rows] = await db.query(query, [userId]);

   
    if (rows.length === 0) {
      console.error("User not found");
      return new NextResponse(
        JSON.stringify({ error: "User not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    
    return new NextResponse(
      JSON.stringify({ greeting: `Welcome ${rows[0].name}` }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error('Server Error:', error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch user" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
