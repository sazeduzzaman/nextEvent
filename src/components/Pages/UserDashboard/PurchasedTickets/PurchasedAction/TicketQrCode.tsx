import React from "react";

interface TicketQRCodeProps {
  url: string; // QR code URL
}

const TicketQRCode: React.FC<TicketQRCodeProps> = ({ url }) => {
  const secretURL = url || "Unverified";

  const qrCodeImage = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
    secretURL
  )}&size=100x100`;

  return (
    <div>
      <img
        src={qrCodeImage}
        alt="QR Code"
        style={{
          maxWidth: "100%",
          height: "auto",
          display: "block",
          margin: "0 auto",
        }}
      />
    </div>
  );
};

export default TicketQRCode;
