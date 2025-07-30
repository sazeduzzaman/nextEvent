"use client";

import React, { useState, useMemo } from "react";
import { BiDownload, BiExpand, BiPrinter } from "react-icons/bi";

type Ticket = {
  id: number;
  date: string;
  seat: string;
  price: number;
  purchaseDate: string;
  expireDate: string;
  status: "Active" | "Expired" | "Cancelled";
};

const sampleData: Ticket[] = [
  {
    id: 1,
    date: "2025-08-01",
    seat: "A1",
    price: 50,
    purchaseDate: "2025-07-25",
    expireDate: "2025-08-02",
    status: "Active",
  },
  {
    id: 2,
    date: "2025-08-03",
    seat: "B5",
    price: 75,
    purchaseDate: "2025-07-26",
    expireDate: "2025-08-04",
    status: "Expired",
  },
  {
    id: 3,
    date: "2025-08-03",
    seat: "B5",
    price: 75,
    purchaseDate: "2025-07-26",
    expireDate: "2025-08-04",
    status: "Expired",
  },
  {
    id: 4,
    date: "2025-08-03",
    seat: "B5",
    price: 75,
    purchaseDate: "2025-07-26",
    expireDate: "2025-08-04",
    status: "Expired",
  },
];

const PurchasedTickets = () => {
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter tickets by search (seat, status, or date)
  const filteredData = useMemo(() => {
    const searchLower = search.toLowerCase();
    return sampleData.filter(
      (ticket) =>
        ticket.seat.toLowerCase().includes(searchLower) ||
        ticket.status.toLowerCase().includes(searchLower) ||
        ticket.date.includes(search)
    );
  }, [search]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="max-w-7xl mx-auto p-8 site-second-bg rounded-xl shadow-lg">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold site-txt mb-8">Purchased Tickets</h1>

        {/* Search and Page Size Controls */}
        <div className="flex gap-4 mb-6 justify-end">
          <input
            type="text"
            placeholder="Search by seat, status, or date"
            value={search}
            onChange={handleSearchChange}
            className="w-full md:w-1/2 px-4 py-1 rounded-lg border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="w-full md:w-24 px-4 py-1 rounded-lg border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          >
            {[5, 10, 15, 20].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-yellow-400 text-black uppercase border border-gray-800 text-sm font-semibold tracking-wide">
            <tr>
              <th className="px-6 py-4">SL</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Seat</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Purchase Date</th>
              <th className="px-6 py-4">Expire</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="text-center text-gray-500 py-8 font-medium"
                >
                  No tickets found.
                </td>
              </tr>
            ) : (
              currentData.map((ticket, index) => (
                <tr
                  key={ticket.id}
                  className={
                    index % 2 === 0 ? "site-second-bg" : "site-second-bg"
                  }
                >
                  <td className="px-6 py-4 border-b border-gray-800 text-center font-medium">
                    {(currentPage - 1) * pageSize + index + 1}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-800 text-center">
                    {ticket.date}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-800 text-center font-semibold site-txt">
                    {ticket.seat}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-800 text-center font-semibold site-txt">
                    ${ticket.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-800 text-center">
                    {ticket.purchaseDate}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-800 text-center">
                    {ticket.expireDate}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-800 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        ticket.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : ticket.status === "Expired"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b border-gray-800 text-end space-x-2">
                    <button
                      onClick={() => alert(`Print ticket #${ticket.id}`)}
                      className="bg-yellow-400 hover:bg-yellow-500 transition rounded px-4 py-1 font-semibold shadow-sm text-black"
                    >
                      <BiPrinter/>
                    </button>
                    <button
                      onClick={() => alert(`View ticket #${ticket.id}`)}
                      className="bg-gray-200 hover:bg-gray-300 transition rounded px-4 py-1 font-semibold shadow-sm text-black"
                    >
                      <BiExpand/>
                    </button>
                    <button
                      onClick={() => alert(`View ticket #${ticket.id}`)}
                      className="bg-gray-200 hover:bg-gray-300 transition rounded px-4 py-1 font-semibold shadow-sm text-black"
                    >
                      <BiDownload/>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-3">
        <p className="text-gray-700 font-semibold">
          Page {currentPage} of {totalPages || 1}
        </p>
        <div className="space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-5 py-2 rounded bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 transition font-semibold text-black shadow"
          >
            Previous
          </button>
          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-5 py-2 rounded bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 transition font-semibold text-black shadow"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchasedTickets;
