export async function POST(req) {

    try {
      const body = await req.json();
      const { address, contents, _id } = body;
  
      // Log the received data
  
      const res = await fetch('https://data.mongodb-api.com/app/data-kyrmw/endpoint/data/v1/action/insertOne', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
  //        'Access-Control-Request-Headers': '*',
          'api-key': process.env.MONGODB_APIKEY
        },
        body: JSON.stringify({
          "collection": "orders",
          "database": "maxwellslight",
          "dataSource": "MaxwellSlight",
          "document": {
            "userId": _id,
            "address": address,
            "contents": contents,
            "status": 1
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