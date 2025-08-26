import { clsx, type ClassValue } from "./clsx-fallback"
import { twMerge } from "tailwind-merge"

export type VariantProps<T> = T extends (...args: any[]) => any ? Parameters<T>[0] : never

export interface CVAConfig {
  variants?: Record<string, Record<string, ClassValue>>
  defaultVariants?: Record<string, any>
}

export function cva(base: ClassValue, config?: CVAConfig) {
  return (props?: Record<string, any>) => {
    if (!config?.variants) {
      return twMerge(clsx(base))
    }

    const { variants, defaultVariants } = config
    const activeVariants = { ...defaultVariants, ...props }

    const variantClasses = Object.entries(activeVariants)
      .map(([key, value]) => {
        if (variants[key] && value !== undefined) {
          return variants[key][value as string]
        }
        return null
      })
      .filter(Boolean)

    return twMerge(clsx(base, ...variantClasses, props?.className))
  }
}
