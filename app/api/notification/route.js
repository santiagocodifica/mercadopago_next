export async function POST(req){

  const body = await req.json()
  console.log("notification: ", body)

  return new Response(body)
}