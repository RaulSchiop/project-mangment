import { db } from "../../../lib/db";
import { NextResponse } from "next/server";
export async function POST(req) {
   try {
      const url = new URL(req.url);
      const name = url.searchParams.get("Name");
      const description = url.searchParams.get("Description");
      const owner = url.searchParams.get("owner");

      if (!name || !description || !owner) {
         return new NextResponse(
            JSON.stringify({ error: "Missing required fields" }),
            {
               status: 400,
               headers: { "Content-Type": "application/json" },
            }
         );
      }

      const [user] = await db.query(`SELECT id FROM users WHERE name = ?`, [
         owner,
      ]);

      if (!user || user.length === 0) {
         return new NextResponse(JSON.stringify({ error: "Owner not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
         });
      }

      const userId = user.id;
      const query = `INSERT INTO projects (name, description, owner_id) VALUES (?, ?, ?);`;
      const [result] = await db.query(query, [name, description, userId]);

      return new NextResponse(
         JSON.stringify({
            message: "Project created successfully",
            projectId: result.insertId,
         }),
         {
            status: 201,
            headers: { "Content-Type": "application/json" },
         }
      );
   } catch (error) {
      console.log(error);
      return new NextResponse(
         JSON.stringify({ error: "Could not create project" }),
         {
            status: 500,
            headers: { "Content-Type": "application/json" },
         }
      );
   }
}
