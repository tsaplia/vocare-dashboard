import { patients } from '@/lib/fakeDB';
import { NextResponse } from 'next/server';
// import { supabase } from '@/lib/supabase';

export async function GET() {
    return NextResponse.json(patients);
}
