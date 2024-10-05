import { generateTimetable, optimizeTimetable } from '@/lib/ai-service';

describe('Timetable Generator', () => {
  it('should generate a timetable based on constraints', async () => {
    const constraints = JSON.stringify({
      courses: [{ name: 'Math 101', code: 'MATH101' }],
      faculty: [{ name: 'John Doe', employeeId: 'F001' }],
      classrooms: [{ name: 'Room 101', capacity: 30 }],
    });

    const timetable = await generateTimetable(constraints);
    expect(timetable).toBeTruthy();
    expect(typeof timetable).toBe('string');
  });

  it('should optimize an existing timetable', async () => {
    const initialTimetable = 'Monday: Math 101 (Room 101) - John Doe';
    const constraints = JSON.stringify({
      courses: [{ name: 'Math 101', code: 'MATH101' }],
      faculty: [{ name: 'John Doe', employeeId: 'F001' }],
      classrooms: [{ name: 'Room 101', capacity: 30 }],
    });

    const optimizedTimetable = await optimizeTimetable(initialTimetable, constraints);
    expect(optimizedTimetable).toBeTruthy();
    expect(typeof optimizedTimetable).toBe('string');
    expect(optimizedTimetable).not.toEqual(initialTimetable);
  });
});