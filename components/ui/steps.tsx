"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  currentStep: number
  children: React.ReactNode
}

export function Steps({ currentStep, className, children, ...props }: StepsProps) {
  // Count the number of Step children
  const steps = React.Children.toArray(children).filter((child) => React.isValidElement(child) && child.type === Step)

  return (
    <div className={cn("space-y-4", className)} {...props}>
      <div className="relative flex gap-2">
        {steps.map((step, index) => {
          const isActive = index + 1 === currentStep
          const isCompleted = index + 1 < currentStep
          const isLast = index === steps.length - 1

          return (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium",
                    isActive && "border-primary bg-primary text-primary-foreground",
                    isCompleted && "border-primary bg-primary text-primary-foreground",
                    !isActive && !isCompleted && "border-muted-foreground text-muted-foreground",
                  )}
                >
                  {isCompleted ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-check"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <div
                  className={cn(
                    "mt-2 text-center text-xs",
                    (isActive || isCompleted) && "text-foreground",
                    !isActive && !isCompleted && "text-muted-foreground",
                  )}
                >
                  {React.isValidElement(step) && step.props.title}
                </div>
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "flex-1 border-t-2 transition-colors mt-4",
                    isCompleted ? "border-primary" : "border-muted",
                  )}
                />
              )}
            </React.Fragment>
          )
        })}
      </div>
      <div className="mt-8">
        {steps.map((step, index) => {
          const isActive = index + 1 === currentStep
          return (
            <div key={index} className={cn("text-sm", isActive ? "block" : "hidden")}>
              {step}
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface StepProps {
  title: string
  description?: string
  children?: React.ReactNode
}

export function Step({ title, description, children }: StepProps) {
  return (
    <div className="space-y-2">
      <p className="text-muted-foreground">{description}</p>
      {children}
    </div>
  )
}
