export async function POST(req) {

  try {
    const body = await req.json();
    console.log(body);
    const { name, email, address } = body;

    // Log the received data
    console.log('Received data:', { name, email, address });

    const res = await fetch('https://data.mongodb-api.com/app/data-kyrmw/endpoint/data/v1/action/insertOne', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
//        'Access-Control-Request-Headers': '*',
        'api-key': process.env.MONGODB_APIKEY,
      },
      body: JSON.stringify({
        "collection": "users",
        "database": "maxwellslight",
        "dataSource": "MaxwellSlight",
        "document":  {
        "name": name,
        "email": email,
        "address": address,
        "orders": []
        }
    })
  })

   
    const data = await res.json()
    console.log(data)
    return Response.json(data)
  } catch (error) {
    console.error(error)
  }
}