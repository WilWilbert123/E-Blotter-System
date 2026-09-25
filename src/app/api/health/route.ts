import { NextResponse } from 'next/server';
import { getDb } from '@/lib/database';

export async function GET() {
  try {
    const db = getDb();
    
    // Perform a lightweight query to verify the database is reachable
    const { data, error } = await db.from('barangays').select('id').limit(1);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      status: 'ok',
      database: 'connected',
      timestamp: new Date().toISOString()
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      database: 'disconnected',
      message: error.message,
      timestamp: new Date().toISOString()
    }, { status: 503 });
  }
}
