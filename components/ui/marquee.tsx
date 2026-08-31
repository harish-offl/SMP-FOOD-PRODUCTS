import * as React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children?: React.ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  style?: React.CSSProperties;
}

function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = false,
  style,
}: MarqueeProps) {
  const content = React.Children.toArray(children);
  const doubled = [...content, ...content];

  return (
    <div
      data-slot="marquee"
      data-direction={reverse ? "reverse" : "normal"}
      data-pause-on-hover={pauseOnHover ? "true" : "false"}
      className={cn("marquee", className)}
      style={style}
    >
      <div className="marquee__content" aria-hidden="true">
        {doubled.map((child, index) => (
          <div key={index} className="shrink-0">
            {child}
          </div>
        ))}
      </div>
      <div className="sr-only">{content}</div>
    </div>
  );
}

export { Marquee };
