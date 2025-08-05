import { Event, EventApiResponse } from "./AllEventsDataType";

export const fetchAllEvents = async (): Promise<Event[]> => {
  try {
    const res = await fetch("https://admin.eventstailor.com/api/v1/events", {
      cache: "no-store", // ✅ always fetch fresh data
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json: EventApiResponse = await res.json();
    return json.data; // ✅ This is an array of Event
  } catch (err) {
    console.error("❌ Failed to fetch events:", err);
    throw new Error("Unable to load events.");
  }
};
