import { HtmlHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "../lib/utils";
import { Navigation } from "./navigation";

export function Layout({
  className,
  ...props
}: PropsWithChildren & HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <main
      className={cn(
        "bg-neutral-900 min-h-screen flex flex-col flex-1",
        className
      )}
      {...props}
    >
      <Navigation />
      {props.children}
    </main>
  );
}
