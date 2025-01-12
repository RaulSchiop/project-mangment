import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
export async function GET() {
   try {
      const querry = `SELECT * FROM projects`;
      const [rows] = await db.query(querry);

      return new NextResponse(JSON.stringify(rows), {
         status: 200,
         headers: { "Content-Type": "application/json" },
      });
   } catch (error) {
      console.error("Server error:", error);
      return new NextResponse(
         JSON.stringify({ error: "Internal server error" }),
         {
            status: 500,
         }
      );
   }
}
