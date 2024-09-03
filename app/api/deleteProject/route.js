import { db } from "../../../lib/db"

const { NextResponse } = require("next/server")


export async function DELETE(req){
const url=new URL(req.url)
const projectId=url.searchParams.get('projectId')

if(!projectId){
    return new NextResponse(JSON.stringify({error:"no project id"}),{status:400, headers: { 'Content-Type': 'application/json' }
    })
}
try{

 await db.query(`DELETE FROM ProjectMembers Where project_id=?`,[projectId])
await db.query(`DELETE FROM tasks WHERE project_id=?`,[projectId])
const querry=`DELETE FROM projects WHERE id=?`
const [row]=await db.query(querry,[projectId])

if (row.affectedRows === 0) {
    return new NextResponse(JSON.stringify({ error: "projcet not found" }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new NextResponse(JSON.stringify({message:"project Deleted"}),{status:200,
headers:{'Content-Type': 'application/json' }
})

}catch(error){
    console.log(error)
    return new NextResponse(JSON.stringify({ error: "Failed to delete task" }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
}

}