import React from "react";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="loading-wrapper">
      <Image
        src="/images/preloader.gif"
        alt="Loading..."
        width={100}
        height={100}
        priority
      />
    </div>
  );
};

export default Loading;
