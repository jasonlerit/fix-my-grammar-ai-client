"use client"

import { ModeToggle } from "@/components/shared/mode-toggle"
import { TextGenerationTypeToggle } from "@/components/shared/text-generation-type-toggle"
import { Button } from "@/components/ui/button"
import { TextGenerationType, useTextGenerationStore } from "@/stores/use-text-generation.store"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import Link from "next/link"

export const Navbar = () => {
  const type = useTextGenerationStore((state) => state.type)

  return (
    <header className='absolute w-full'>
      <nav className='container mx-auto h-14 flex justify-between items-center px-4'>
        <span className='font-bold'>
          {type === TextGenerationType.FIX_GRAMMAR && "Fix Grammar"}
          {type === TextGenerationType.FIX_COMMIT_MESSAGE && "Fix Commit Message"}
        </span>
        <div className='flex items-center gap-1'>
          <TextGenerationTypeToggle />
          <Button asChild variant='ghost' size='icon' aria-label='github link'>
            <Link href='https://github.com/jatnerubia/fix-my-grammar-ai-client'>
              <GitHubLogoIcon className='w-5 h-5' />
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </nav>
    </header>
  )
}
