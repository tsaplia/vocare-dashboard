import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
    const { data, error } = await supabase.from('appointment_assignee').select('*');
    return NextResponse.json(data || error);
}
