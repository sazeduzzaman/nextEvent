export interface BusinessHours {
  saturday: DayHours;
  sunday: DayHours;
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
}

export interface DayHours {
  start: string | null;
  end: string | null;
}

export interface CustomSettings {
  some_plugin_enabled: boolean;
  max_upload_size_mb: number;
  notifications_enabled: boolean;
}

export interface SiteInfo {
  website_name: string;
  site_title: string;
  site_motto: string;
  site_logo_white: string | null;
  site_logo_black: string | null;
  site_favicon: string | null;
  login_background_image: string | null;
  primary_email: string;
  support_email: string;
  info_email: string;
  news_email: string | null;
  primary_phone: string;
  fax: string | null;
  alternative_phone: string;
  whatsapp_number: string;
  address_one: string | null;
  address_two: string | null;
  default_language: string;
  default_currency: string;
  system_timezone: string;
  site_url: string;
  meta_title: string;
  meta_keyword: string;
  meta_tags: string;
  meta_description: string;
  google_analytics: string | null;
  google_adsense: string | null;
  facebook_pixel_id: string | null;
  og_image: string;
  og_title: string;
  og_description: string;
  footer_description: string;
  canonical_url: string;
  copyright_title: string;
  copyright_url: string;
  facebook_url: string;
  instagram_url: string;
  linkedin_url: string;
  whatsapp_url: string;
  twitter_url: string;
  youtube_url: string;
  pinterest_url: string;
  reddit_url: string;
  tumblr_url: string;
  tiktok_url: string;
  website_url: string;
  company_name: string;
  business_hours: BusinessHours;
  theme_color: string;
  dark_mode: boolean;
  custom_css: string | null;
  custom_js: string | null;
  custom_settings: CustomSettings;
}

export interface SiteInfoApiResponse {
  success: boolean;
  message: string;
  data: SiteInfo;
}
