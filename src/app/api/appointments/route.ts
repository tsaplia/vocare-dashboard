import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { dateString } from '@/lib/time';
import { Appointment } from '@/types/superbase';

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const from = url.searchParams.get('from') || dateString(new Date());
    const to = url.searchParams.get('to') || dateString(new Date());
    const { data, error } = await supabase
        .from('appointments')
        .select(
            `id,
            start,
            end,
            location,
            notes,
            title,
            patient: patient (id, firstname, lastname ),
            category:category (id, label, color)`
        )
        .gte('start', from)
        .lte('start', to);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    data!.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
    return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
    const { start, end, location, notes, title, patient, category }: Appointment = await req.json();
    const { data, error } = await supabase
        .from('appointments')
        .insert([{ start, end, location, notes, title, patient, category }])
        .select();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
    const { id } = await req.json();
    const { error } = await supabase.from('appointments').delete().eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ id });
}

export async function PUT(req: NextRequest) {
    const { start, end, location, notes, title, patient, category, id }: Appointment = await req.json();
    const { data, error } = await supabase
        .from('appointments')
        .update({start, end, location, notes, title, patient, category})
        .eq('id', id)
        .select();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
}
