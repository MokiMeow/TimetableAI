import { NextResponse } from 'next/server';
import { generateTimetable } from '@/lib/ai-service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { courses, faculty, classrooms, departments } = body;

    // Prepare constraints
    const constraints = JSON.stringify({
      courses,
      faculty,
      classrooms,
      departments,
    });

    // Generate timetable
    const timetable = await generateTimetable(constraints);

    // Parse the timetable to ensure it's valid JSON
    const parsedTimetable = JSON.parse(timetable);

    return NextResponse.json({ timetable: JSON.stringify(parsedTimetable) });
  } catch (error) {
    console.error('Error generating timetable:', error);
    return NextResponse.json({ error: 'Error generating timetable' }, { status: 500 });
  }
}