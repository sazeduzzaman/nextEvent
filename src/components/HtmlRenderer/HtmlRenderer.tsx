"use client";

import React from "react";

interface HtmlRendererProps {
  html: string; // raw html string
  slice?: number; // optional slice length
  className?: string;
}

const HtmlRenderer: React.FC<HtmlRendererProps> = ({
  html,
  slice,
  className,
}) => {
  const processedHtml = React.useMemo(() => {
    if (slice && html) {
      // Strip HTML tags using regex (safe for SSR)
      const textOnly = html.replace(/<[^>]*>/g, "");
      return textOnly.slice(0, slice) + (textOnly.length > slice ? "..." : "");
    }
    return html;
  }, [html, slice]);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: processedHtml }}
    />
  );
};

export default HtmlRenderer;
