export async function POST(req) {

    try {
      const body = await req.json();
      const { status, _id } = body;
  
      // Log the received data
  
      const res = await fetch('https://data.mongodb-api.com/app/data-kyrmw/endpoint/data/v1/action/updateOne', {
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
          "filter": {"_id":{"$oid":`${_id}`}},  
          "update": {
            "$set": {
                "status": status
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