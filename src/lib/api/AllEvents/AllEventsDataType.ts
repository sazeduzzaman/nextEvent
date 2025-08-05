export interface Seat {
  id: number;
  name: string;
  row: string;
  column: string;
  status: string;  // e.g. "active", "inactive"
  price: string;   // e.g. "150.00"
  code: string;
}

export interface EventSeatGroup {
  seat_type: string;     // e.g. "VIP"
  seat_type_id: number;  // e.g. 1
  seats: Seat[];
}

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
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  venue: string;
  thumbnail: string;
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
  is_featured: number;

  // Add this new property for event seats
  event_seats: EventSeatGroup[];
}

export interface EventApiResponse {
  success: boolean;
  message: string;
  data: Event[];
}
