import { SiteInfo, SiteInfoApiResponse } from "./SiteInformationDataType";

export const fetchSiteInformation = async (): Promise<SiteInfo> => {
  try {
    const res = await fetch(
      "https://admin.eventstailor.com/api/v1/site-informations",
      {
        next: { revalidate: 1 }, // force no caching
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json: SiteInfoApiResponse = await res.json();
    return json.data;
  } catch (err) {
    console.error("❌ Failed to fetch site information:", err);
    throw new Error("Unable to load site information.");
  }
};
