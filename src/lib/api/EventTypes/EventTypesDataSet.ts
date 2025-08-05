import { EventType, EventTypesApiResponse } from "./EventTypesDataType";

export const fetchEventTypes = async (): Promise<EventType[]> => {
  try {
    const res = await fetch(
      "https://admin.eventstailor.com/api/v1/event-types",
      {
         next: { revalidate: 1 }, // force no caching
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json: EventTypesApiResponse = await res.json();
    return json.data; // This is EventType[]
  } catch (err) {
    console.error("❌ Failed to fetch event types:", err);
    throw new Error("Unable to load event types.");
  }
};
