import { db } from "../../../lib/db";

export async function DELETE(req) {
  const url = new URL(req.url);
  const taskID = url.searchParams.get("taskId");

  if (!taskID) {
    return new Response(JSON.stringify({ error: "Missing taskId" }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    
    await db.query('DELETE FROM comments WHERE task_id = ?', [taskID]);

    
    const query = `DELETE FROM tasks WHERE id = ?`;
    const [result] = await db.query(query, [taskID]);

    if (result.affectedRows === 0) {
      return new Response(JSON.stringify({ error: "Task not found" }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: "Task deleted successfully" }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in DELETE request:', error);
    return new Response(JSON.stringify({ error: "Failed to delete task" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
