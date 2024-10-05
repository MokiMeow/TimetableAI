import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

const AI_SERVICE = process.env.AI_SERVICE || 'openai';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

let openai: OpenAI;
let gemini: GoogleGenerativeAI;

if (AI_SERVICE === 'openai') {
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set in the environment variables');
  }
  openai = new OpenAI({ apiKey: OPENAI_API_KEY });
} else if (AI_SERVICE === 'gemini') {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not set in the environment variables');
  }
  gemini = new GoogleGenerativeAI(GEMINI_API_KEY);
}

export async function generateTimetable(constraints: string): Promise<string> {
  const prompt = `
    Generate a detailed college timetable based on the following constraints:
    ${constraints}

    Requirements:
    1. Create a weekly schedule (Monday to Friday) with time slots from 8:30 AM to 3:35 PM.
    2. Use 50-minute periods with appropriate breaks.
    3. Assign courses to specific time slots, rooms, and faculty members without conflicts.
    4. Include various session types (lectures, labs, special courses).
    5. Incorporate breaks, including a lunch break.
    6. Ensure even course distribution throughout the week.
    7. Assign appropriate rooms based on capacity and course type.
    8. Include special sessions like placement training.

    Please provide the timetable in a JSON format with the following structure:
    {
      "schedule": [
        {
          "time": "8:30 - 9:20",
          "Monday": { "subject": "CS101", "room": "Room 101", "type": "lecture" },
          "Tuesday": { "subject": "MATH101", "room": "Room 102", "type": "lecture" },
          ...
        },
        ...
      ],
      "subjects": [
        { "code": "CS101", "name": "Introduction to Computer Science", "faculty": "Dr. John Doe" },
        ...
      ]
    }
  `;

  if (AI_SERVICE === 'openai') {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant that generates college timetables." },
        { role: "user", content: prompt }
      ],
    });
    return completion.choices[0].message.content || '';
  } else if (AI_SERVICE === 'gemini') {
    const model = gemini.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } else {
    throw new Error('Invalid AI service specified');
  }
}

export async function optimizeTimetable(timetable: string, constraints: string): Promise<string> {
  if (AI_SERVICE === 'openai') {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant that optimizes college timetables." },
        { role: "user", content: `Optimize this timetable based on these constraints: ${constraints}\n\nTimetable: ${timetable}` }
      ],
    });
    return completion.choices[0].message.content || '';
  } else if (AI_SERVICE === 'gemini') {
    const model = gemini.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(`Optimize this timetable based on these constraints: ${constraints}\n\nTimetable: ${timetable}`);
    const response = result.response;
    return response.text();
  } else {
    throw new Error('Invalid AI service specified');
  }
}