import React, { useEffect, useState } from "react";
import { getProfile } from "@/lib/api/UserData/userApi"; // Adjust path if needed

interface UserProfile {
  name: string;
  email: string;
  phone: string;
}

interface OrderSummaryProps {
  selectedTickets: Record<number, string[]>;
  ticketCategories: any[];
  totalTickets: number;
  totalPrice: number;
  eventData: any;
  proceedToPurchase: () => void;
}

const SingleEventsOrderSummary: React.FC<OrderSummaryProps> = ({
  selectedTickets,
  ticketCategories,
  totalTickets,
  totalPrice,
  eventData,
  proceedToPurchase,
}) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);
  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoadingProfile(true);
        const profileData = await getProfile();
        // profileData can be null if no user logged in
        if (profileData) {
          setUserProfile(profileData);
        } else {
          setUserProfile(null); // no user logged in
        }
      } catch (error) {
        setProfileError("Failed to load user profile.");
      } finally {
        setLoadingProfile(false);
      }
    }
    fetchProfile();
  }, []);

  if (loadingProfile) {
    return (
      <div className="flex justify-center items-center h-48 text-yellow-400">
        Loading user profile...
      </div>
    );
  }

  // Here we do NOT block showing order summary if userProfile is null
  // Instead we just show "N/A" for user info fields
  return (
    <div className="bg-neutral-900 border border-yellow-500 rounded-lg shadow-xl p-8 transition duration-300">
      <h3 className="text-3xl font-extrabold mb-6 text-white text-start">
        Order Summary
      </h3>

      <div className="space-y-2 mb-6">
        <h4 className="text-xl text-gray-300 font-semibold border-b border-neutral-700 pb-2">
          👤 User Info
        </h4>
        <p>
          <span className="text-gray-400">Name:</span>{" "}
          <span className="text-yellow-400 font-semibold">
            {userProfile?.name || "N/A"}
          </span>
        </p>
        <p>
          <span className="text-gray-400">Email:</span>{" "}
          <span className="text-yellow-400 font-semibold">
            {userProfile?.email || "N/A"}
          </span>
        </p>
        <p>
          <span className="text-gray-400">Phone:</span>{" "}
          <span className="text-yellow-400 font-semibold">
            {userProfile?.phone || "N/A"}
          </span>
        </p>
        <p>
          <span className="text-gray-400">Event:</span>{" "}
          <span className="text-yellow-400 font-semibold">
            {eventData.name}
          </span>
        </p>
        <p>
          <span className="text-gray-400">Event:</span>{" "}
          <span className="text-yellow-400 font-semibold">
            {eventData.id}
          </span>
        </p>
      </div>

      {totalTickets === 0 ? (
        <p className="text-start site-txt font-medium mt-10 text-2xl">
          🎟️ No seats selected yet.
        </p>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {ticketCategories.map(({ id, name }) => {
              const seats = selectedTickets[id] || [];
              if (seats.length === 0) return null;

              return (
                <div key={id}>
                  <p className="text-yellow-300 font-semibold">{name} Seats:</p>
                  <ul className="list-disc list-inside text-gray-300 ml-3">
                    {seats.map((seatId) => (
                      <li key={seatId}>{seatId}</li>
                    ))}
                  </ul>

                  {name === "No Seat" && (
                    <p className="mt-1 text-sm text-red-400 italic">
                      ⚠️ This category does not include a seat. You’ll only get
                      entry access.
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="space-y-2 text-gray-300 font-medium mb-6">
            <p>
              Total Tickets:{" "}
              <span className="text-yellow-400 font-bold">{totalTickets}</span>
            </p>
            <p>
              Total Price:{" "}
              <span className="text-yellow-400 font-bold">
                ${totalPrice.toFixed(2)}
              </span>
            </p>
          </div>

          <button
            onClick={proceedToPurchase}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            🚀 Proceed to Purchase
          </button>
        </>
      )}
    </div>
  );
};

export default SingleEventsOrderSummary;
