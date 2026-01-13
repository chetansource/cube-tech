export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json({
    success: true,
    message: 'Frontend is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
  }, { status: 200 });
}
