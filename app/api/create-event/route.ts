import { google, calendar_v3 } from "googleapis";
import { NextRequest } from "next/server";

const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const calendarId = process.env.GOOGLE_CALENDAR_ID!;

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: SCOPES,
});

export async function POST(req: NextRequest) {
  try {
    const { summary, description, start, end } = await req.json();

    const authClient = await auth.getClient();

    // Приводимо тип до потрібного
    const calendar = google.calendar({
      version: "v3",
      auth: authClient as unknown as calendar_v3.Options["auth"],
    });

    const event = await calendar.events.insert({
      calendarId,
      requestBody: {
        summary,
        description,
        start: { dateTime: start, timeZone: "Europe/Kiev" },
        end: { dateTime: end, timeZone: "Europe/Kiev" },
      },
    });

    return new Response(JSON.stringify({ message: "Event created", event }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating event:", error);
    return new Response(
      JSON.stringify({ message: "Error creating event", error }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
