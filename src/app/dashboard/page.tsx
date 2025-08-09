import Dashboard from "@/components/Pages/UserDashboard/Dashboard/Dashboard";
import { fetchAllEvents } from "@/lib/api/AllEvents/AllEventsDataSet";

export default async function Page() {
  const allEvents = await fetchAllEvents(); // Runs on the server

  return <Dashboard events={allEvents} />;
}
