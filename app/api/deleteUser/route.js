import { db } from "../../../lib/db";

export async function DELETE(req) {
  const url = new URL(req.url);
  const userID = url.searchParams.get("userID");

  if (!userID) {
    return new Response(JSON.stringify({ error: "Missing userID" }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
 
    await db.query('BEGIN');

    await db.query('DELETE FROM Comments WHERE user_id = ?', [userID]);
    await db.query('DELETE FROM ProjectMembers WHERE user_id = ?', [userID]);
    await db.query('DELETE FROM tasks WHERE assigned_to = ?', [userID]);
    await db.query('DELETE FROM projects WHERE owner_id = ?', [userID]);


    const query = `DELETE FROM users WHERE id = ?`;
    const [result] = await db.query(query, [userID]);

    if (result.affectedRows === 0) {
  
      await db.query('ROLLBACK');
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

  
    await db.query('COMMIT');

    return new Response(JSON.stringify({ message: "User and associated data deleted successfully" }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    
    await db.query('ROLLBACK');
    console.error('Error in DELETE request:', error);
    return new Response(JSON.stringify({ error: "Failed to delete user and associated data" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
