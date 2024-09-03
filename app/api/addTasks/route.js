import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

export async function POST(req) {
  try {
    const url = new URL(req.url);    
    const title = url.searchParams.get("title");
    const due_date = url.searchParams.get("due_date");
    const assigned_to = url.searchParams.get("assigned_to");
    const description = url.searchParams.get("description");
    const projectName = url.searchParams.get("projectName");
    const status = url.searchParams.get("status");

    if (!title || !due_date || !assigned_to || !description || !projectName || !status) {
      return new NextResponse(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Fetch project ID
    const [projectResult] = await db.query(`SELECT id FROM projects WHERE name = ?`, [projectName]);

    if (!projectResult || projectResult.length === 0) {
      return new NextResponse(JSON.stringify({ error: 'Project not found' }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const projectId = projectResult[0].id;

    // Fetch user ID
    const [userResult] = await db.query(`SELECT id FROM users WHERE name = ?`, [assigned_to]);

    if (!userResult || userResult.length === 0) {
      return new NextResponse(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const userId = userResult[0].id;

    // Insert task
    const query = `INSERT INTO tasks (project_id, title, due_date, assigned_to, description, status) VALUES (?, ?, ?, ?, ?, ?)`;
    const [insertResult] = await db.query(query, [projectId, title, due_date, userId, description, status]);

    return new NextResponse(JSON.stringify({ message: "Task created successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error creating task:", error);
    return new NextResponse(JSON.stringify({ error: 'Could not create task' }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
