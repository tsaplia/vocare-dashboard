import { fakeRange } from '@/lib/fakeDB';
import { NextRequest, NextResponse } from 'next/server';
import { FullAppointment } from '@/types/superbase';
// import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
    //const { data, error } = await supabase.from('patients').select('*');
    const url = new URL(req.url);
    const from = url.searchParams.get('from') || new Date().toISOString();
    const to = url.searchParams.get('to') || new Date().toISOString();
    const appointments: FullAppointment[] = fakeRange(10, new Date(from), new Date(to));
    appointments.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
    return NextResponse.json(appointments);
}
