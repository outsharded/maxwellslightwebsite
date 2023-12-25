var data = JSON.stringify({
    "collection": "users",
    "database": "maxwellslight",
    "dataSource": "MaxwellSlight"
});
          
    export async function GET(request) {
      const res = await fetch('https://data.mongodb-api.com/app/data-kyrmw/endpoint/data/v1/action/findOne', {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': '*',
          'api-key': process.env.MONGODB_APIKEY,
        },
        data: data,
      })
      const product = await res.json()
     
      return Response.json({ product })
    }