import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { Button } from "@/components/ui/button"
import { GitHubLogoIcon } from "@radix-ui/react-icons"

export const Navbar = () => {
  return (
    <header>
      <div className='container mx-auto h-14 flex justify-between items-center'>
        <span className='font-bold'>Fix My Grammar AI</span>
        <div className='flex items-center gap-1'>
          <Button asChild variant='ghost'>
            <Link href='https://github.com/jatnerubia/fix-my-grammar-ai-client'>
              <GitHubLogoIcon className='h-[1.2rem] w-[1.2rem]' />
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
