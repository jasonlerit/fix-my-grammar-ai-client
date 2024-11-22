"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TextGenerationType, useTextGenerationStore } from "@/stores/use-text-generation.store"
import { LuSettings2 } from "react-icons/lu"

export function TextGenerationTypeToggle() {
  const setType = useTextGenerationStore((state) => state.setType)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          <LuSettings2 className='w-5 h-5 text-black dark:text-white' />
          <span className='sr-only'>Toggle text generation type</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => setType(TextGenerationType.FIX_GRAMMAR)}>
          Fix Grammar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setType(TextGenerationType.FIX_COMMIT_MESSAGE)}>
          Fix Commit Message
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
