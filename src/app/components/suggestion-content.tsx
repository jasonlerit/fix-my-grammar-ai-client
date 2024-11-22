"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useSuggestionStore } from "@/stores/use-suggestion.store"
import { useState } from "react"
import { LuCheck, LuCopy } from "react-icons/lu"

export const SuggestionContent = () => {
  const suggestions = useSuggestionStore((state) => state.suggestions)
  const [copiedItems, setCopiedItems] = useState<number[]>([])

  const handleCopy = (index: number, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedItems((pv) => [...pv, index])
      setTimeout(() => {
        setCopiedItems((pv) => pv.filter((i) => i !== index))
      }, 2000)
    })
  }

  return (
    <div className='flex-1 overflow-y-auto'>
      <div className='container mx-auto lg:max-w-4xl flex flex-col gap-4 px-4'>
        {suggestions.map((suggestion, index) => (
          <Card key={index}>
            <CardContent className='flex justify-between items-start gap-4 p-4'>
              <p>{suggestion}</p>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => handleCopy(index, suggestion)}
                disabled={copiedItems.includes(index)}
                aria-label='copy button'
              >
                {copiedItems.includes(index) ? <LuCheck /> : <LuCopy />}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
