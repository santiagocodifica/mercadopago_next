export async function POST(req){

  const body = req.json()
  console.log("notification: ", body)

  return new Response(body)
}