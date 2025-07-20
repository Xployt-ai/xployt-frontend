import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const Footer = () => {
  return (
    <footer className="w-full">
      <Separator />
      <div className="max-w-6xl mx-auto py-6 text-center">
        <p className={cn("text-sm text-muted-foreground")}>
          © Xployt.ai 2025. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
