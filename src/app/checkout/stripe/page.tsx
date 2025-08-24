"use client";
import React, { useEffect, useState } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";
import { Seat } from "@/lib/api/AllEvents/AllEventsDataType";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const StripePaymentForm = ({ order }: { order: any }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    if (loading) return;
    if (!stripe || !elements) return toast.error("Stripe not loaded");
    if (!order) return toast.error("No order data found");

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return toast.error("Card info missing");

    setLoading(true);

    try {
      // 1. Create PaymentIntent via backend
      const res = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          totalPrice: order.totalPrice,
          userInfo: order.userInfo,
        }),
      });
      const { clientSecret } = await res.json();
      if (!clientSecret) throw new Error("PaymentIntent not created");

      // 2. Confirm payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: order.userInfo.name,
              email: order.userInfo.email,
            },
          },
        }
      );

      if (error) throw error;

      if (paymentIntent?.status === "succeeded") {
        toast.success("Payment successful!");

        // Refined order with all seats
        const refinedOrder = {
          transactionId: paymentIntent.id,
          totalTickets: order.totalTickets,
          totalPrice: order.totalPrice,
          event: {
            id: order.eventData.id,
            name: order.eventData.name,
            date: order.eventData.date || null,
          },
          user: {
            name: order.userInfo.name,
            email: order.userInfo.email,
            phone: order.userInfo.phone,
          },
          tickets: Object.entries(order.selectedTickets).map(
            ([categoryId, seats]) => {
              const seatArray = seats as Seat[];
              const category = order.ticketCategories.find(
                (c: any) => c.id.toString() === categoryId
              );
              return {
                categoryId,
                categoryName: category?.name || "Unknown",
                seats: seatArray,
              };
            }
          ),
        };

        console.log("Refined Order:", refinedOrder);
        router.push("/dashboard/tickets");

        // Clear localStorage
        localStorage.removeItem("stripeOrder");
      }
    } catch (err: any) {
      toast.error(err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-neutral-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Stripe Checkout</h2>

      <div className="mb-4 p-2 bg-gray-800 rounded">
        <CardElement options={{ hidePostalCode: true }} />
      </div>

      <button
        onClick={handlePayment}
        disabled={loading}
        className={`w-full py-3 font-bold rounded-lg shadow-md ${
          loading
            ? "bg-gray-500 cursor-not-allowed text-black"
            : "bg-yellow-400 hover:bg-yellow-500 text-black"
        }`}
      >
        🚀 {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

const OrderInfo = ({ order }: { order: any }) => {
  return (
    <div className="p-6 bg-neutral-800 rounded-lg shadow-lg text-white space-y-4">
      <h2 className="text-2xl font-bold mb-4">{order.eventData.name}</h2>
      <p className="text-gray-300">Date: {order.eventData.date || "TBD"}</p>
      <p className="text-gray-300">Total Tickets: {order.totalTickets}</p>
      <p className="text-gray-300">
        Total Price: ${order.totalPrice.toFixed(2)}
      </p>

      {order.ticketCategories.map((category: any) => {
        const seats = order.selectedTickets[category.id] || [];
        if (!seats.length) return null;

        return (
          <div key={category.id} className="mt-2">
            <p className="font-semibold text-yellow-400">
              {category.name} Seats:
            </p>
            <ul className="list-disc list-inside ml-4 text-gray-300">
              {seats.map((seat: Seat) => (
                <li key={seat.id}>
                  {seat.name} - {seat.code} - ${seat.price} - Row: {seat.row} -
                  Col: {seat.column}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default function StripeCheckoutPage() {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const storedOrder = localStorage.getItem("stripeOrder");
    if (!storedOrder) {
      toast.error("No order found.");
      return;
    }
    setOrder(JSON.parse(storedOrder));
  }, []);

  if (!order)
    return (
      <p className="text-center py-10 text-white">Loading order data...</p>
    );

  return (
    <div className="max-w-7xl mx-auto p-6 h-screen items-center d-flex">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Order Info */}
        <OrderInfo order={order} />

        {/* Right: Payment Form */}
        <Elements stripe={stripePromise}>
          <StripePaymentForm order={order} />
        </Elements>
      </div>
    </div>
  );
}
