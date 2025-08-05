export interface EventTypeData {
  id: number;
  name: string;
  slug: string;
  code: string;
  serial: string;
  description: string;
  status: string;
}

export interface Event {
  id: number;
  event_type_id: number;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  logo: string;
  image: string;
  banner_image: string;
  video_teaser_url: string;
  location_map_url: string;
  start_date: string; // e.g. "2025-08-29"
  end_date: string;   // e.g. "2025-08-31"
  start_time: string; // e.g. "14:00:00"
  end_time: string;   // e.g. "19:00:00"
  venue: string;
  organizer_name: string;
  organizer_brand: string;
  purchase_deadline: string;
  total_capacity: number;
  age_restriction: string;
  event_type: string;
  terms_and_conditions: string;
  added_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
  event_type_data: EventTypeData;
}

export interface EventApiResponse {
  success: boolean;
  message: string;
  data: Event[];
}
