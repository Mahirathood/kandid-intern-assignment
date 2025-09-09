

import React from "react"
import { cn } from "@/lib/utils" // make sure you have this utility

export function Card({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("bg-white dark:bg-gray-800 shadow rounded-md", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-4 py-3 border-b dark:border-gray-700", className)} {...props}>
      {children}
    </div>
  )
}

export function CardContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-4", className)} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-lg font-semibold", className)} {...props}>
      {children}
    </h3>
  )
}

export default Card
