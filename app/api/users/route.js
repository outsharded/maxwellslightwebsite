export async function GET() {
  const res = await fetch('https://data.mongodb-api.com/app/data-kyrmw/endpoint/data/v1/action/find', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
//      Access-Control-Request-Headers': '*',
      'api-key': process.env.MONGODB_APIKEY,
    },
    body: JSON.stringify({
      "collection": "users",
      "database": "maxwellslight",
      "dataSource": "MaxwellSlight",
      "filter": {}
    }),
  })

  const product = await res.json()
  return Response.json({ product })
}