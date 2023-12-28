export async function POST(req) {
    console.log("order deleting")
    try {
      const body = await req.json();
      const { address, contents, _id } = body;
  
      // Log the received data
  
      const res = await fetch('https://data.mongodb-api.com/app/data-kyrmw/endpoint/data/v1/action/updateOne', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
  //        'Access-Control-Request-Headers': '*',
          'api-key': process.env.MONGODB_APIKEY
        },
        body: JSON.stringify({
          "collection": "users",
          "database": "maxwellslight",
          "dataSource": "MaxwellSlight",
          "filter": {"_id":{"$oid":`${_id}`}},
          "update": {
            "$pull": {
              orders: { address, contents }
            }
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