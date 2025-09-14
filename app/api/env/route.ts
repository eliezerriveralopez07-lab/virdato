export async function GET() {
  return Response.json({
    haveURL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    haveAnon: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    haveSvc:  !!process.env.SUPABASE_SERVICE_ROLE_KEY
  });
}
