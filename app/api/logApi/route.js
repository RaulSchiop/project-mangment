import { NextResponse } from "next/server";
import { db } from "../../../lib/db";


export async function POST(req){
const {email,password}= await req.json();
try{
if(!email || !password){
    return new NextResponse(JSON.stringify({error:'email or passward was not entered'},{
        status:400,
        headers:{"Content-Type":"application/json"}
    }))
}


const querry=`SELECT id from users WHERE Email=? AND Password=?`
const [rows]= await db.query(querry,[email,password])

return new NextResponse(JSON.stringify(rows),{status:200,headers:{"Content-Type":"application/json"}})

}catch(error){
console.log(error);
return new NextResponse(JSON.stringify({ error: 'Internal server error' }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' },
});
}

}