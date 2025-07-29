import React from "react";

type TicketCategory = {
  id: string;
  name: string;
  price: number;
  available: number;
};

type TicketCategoryTabProps = {
  ticketCategories: TicketCategory[];
  selectedTickets: Record<string, string[]>; // Seat names selected per category ID
  handleSeatToggle: (categoryId: string, seatId: string) => void;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

const seatPrefixes: Record<string, string> = {
  vip: "A",
  regular: "B",
  economy: "C",
};

const TicketCategoryTab = ({
  ticketCategories,
  selectedTickets,
  handleSeatToggle,
  activeTab,
  setActiveTab,
}: TicketCategoryTabProps) => {
  return (
    <div>
      {/* Tabs */}
      <div
        role="tablist"
        className="tabs tabs-boxed mb-8 bg-gray-900 rounded-lg shadow-inner"
      >
        {ticketCategories.map(({ id, name }) => (
          <button
            key={id}
            role="tab"
            className={`tab flex-1 pb-3 text-lg font-semibold transition-all duration-300
            ${
                activeTab === id
                ? "tab-active bg-yellow-400 text-white shadow-lg"
                : "!text-white hover:!text-yellow-400 hover:bg-gray-800"
            }
            py-2 rounded-lg`}
            onClick={() => setActiveTab(id)}
            aria-selected={activeTab === id}
            aria-controls={`tabpanel-${id}`}
            id={`tab-${id}`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Active Tab Seats */}
      <div
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        id={`tabpanel-${activeTab}`}
        className="bg-gray-800 p-8 rounded-xl shadow-lg space-y-6"
      >
        {ticketCategories
          .filter((category) => category.id === activeTab)
          .map(({ id, name, price, available }) => {
            const selectedSeats = selectedTickets[id] || [];

            return (
              <div key={id}>
                <div className="mb-6">
                  <p className="font-bold text-2xl text-white tracking-wide">
                    {name}
                  </p>
                  <p className="text-yellow-400 font-semibold text-lg">
                    ${price} per ticket
                  </p>
                  <p className="text-gray-400 italic">
                    Available Seats: {available}
                  </p>
                </div>

                {/* Seat Selection Buttons */}
                <div className="grid grid-cols-5 gap-4">
                  {Array.from({ length: available }, (_, i) => {
                    const prefix = seatPrefixes[id] || "A"; // fallback 'A'
                    const seatId = `${prefix}${i + 1}`;
                    const isSelected = selectedSeats.includes(seatId);
                    return (
                      <label
                        key={seatId}
                        htmlFor={`${id}-${seatId}`}
                        className="cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          id={`${id}-${seatId}`}
                          checked={isSelected}
                          onChange={() => handleSeatToggle(id, seatId)}
                          className="peer hidden"
                        />
                        <div
                          className={`w-full py-3 rounded-lg border-2 text-center font-semibold
                            transition duration-300
                            cursor-pointer
                            ${
                              isSelected
                                ? "bg-yellow-400 border-yellow-500 text-black shadow-md"
                                : "bg-gray-700 border-gray-600 text-gray-300 hover:bg-yellow-400 hover:text-black hover:border-yellow-500"
                            }
                          `}
                        >
                          {seatId}
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TicketCategoryTab;
