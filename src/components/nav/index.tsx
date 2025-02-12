import { cn, Image } from "@heroui/react"
import React from "react"

export interface NavProps extends React.HTMLAttributes<HTMLDivElement> {}

const Nav = React.forwardRef<HTMLDivElement, NavProps>(
  ({ className, children, ...props }, ref) => {
    return <div ref={ref} className={cn(className || "")} {...props}>
        <div>
            {/* <Image></Image> */}
        </div>
    </div>
  }
)

Nav.displayName = "Nav"

export { Nav }
