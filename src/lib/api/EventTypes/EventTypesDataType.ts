export interface EventType {
  id: number;
  name: string;
  slug: string;
  code: string;
  status: string;
  logo: string;
  image: string;
  banner_image: string;
  events: Event[]; // Adjust Event type below accordingly
}

export interface EventTypes {
  // Add the event properties you have, e.g.:
  id: number;
  name: string;
  slug: string;
  start_date?: string;
  end_date?: string;
  city: string;
  eventTypes: string[];
  date: Date | null;
  price: number;
  // add other fields as needed...
}

// The API response shape:
export interface EventTypesApiResponse {
  success: boolean;
  message: string;
  data: EventType[];
}
