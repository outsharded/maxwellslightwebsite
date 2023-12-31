'use server'
 
import { cookies } from 'next/headers'

export async function POST(request) {
 const data = await request.json();
 const user = data.username;
 const password = data.password;

 if (user === process.env.SYSUSER && password === process.env.SYSPASS) {
    cookies().set('authed', 'system', { secure: true })
    return new Response("system", {
      status: 200,
    });
 } else {
    const res = await fetch('https://data.mongodb-api.com/app/data-kyrmw/endpoint/data/v1/action/findOne', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
    //      Access-Control-Request-Headers': '*',
          'api-key': process.env.MONGODB_APIKEY,
          'Cache-Control': 'no-store, max-age=0',
        },
        body: JSON.stringify({
          "collection": "users",
          "database": "maxwellslight",
          "dataSource": "MaxwellSlight",
          "filter": { "user": user}
        }),
      }, { cache: 'no-store' })
      console.log(res)
 }

if (process.env.PAGE_PASSWORD !== password) {
 return new Response("incorrect password", {
 status: 401,
 });
 }


}