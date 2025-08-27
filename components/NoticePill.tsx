// components/NoticePill.tsx
import { AlertTriangle, Info } from "lucide-react";
import clsx from "clsx";

type NoticePillProps = {
  variant?: "alert" | "info";
  size?: "sm" | "md";
  children: React.ReactNode;
  className?: string;
};

export default function NoticePill({
  variant = "info",
  size = "md",
  children,
  className,
}: NoticePillProps) {
  const isAlert = variant === "alert";

  // compact vs regular styles
  const sizeClasses =
    size === "sm"
      ? "px-4 py-2 text-[14px] gap-1.5" // 🔥 much shorter
      : "px-5 py-3 text-xs md:text-sm gap-3";

  const iconSize = size === "sm" ? "h-4 w-4" : "h-5 w-5"; // smaller icon

  return (
    <div
      className={clsx(
        "inline-flex items-center rounded-full shadow-sm ring-1",
        isAlert
          ? "bg-[#F26344] ring-orange-100"
          : "bg-[#00B169] ring-blue-100",
        sizeClasses,
        className
      )}
      role={isAlert ? "alert" : "status"}
      aria-live="polite"
    >
      {isAlert ? (
        <AlertTriangle className={`${iconSize} flex-none`} aria-hidden />
      ) : (
        <Info className={`${iconSize} flex-none`} aria-hidden />
      )}
      <span className="leading-snug text-[#f0ead2]">{children}</span>
    </div>
  );
}
