"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { useState } from "react"
import { LuCheck, LuCopy, LuLoader2, LuSend } from "react-icons/lu"
import { z } from "zod"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

async function generateText(formData: { prompt: string }) {
  const res = await fetch(`${BASE_URL}/text-generation`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
  if (!res.ok) {
    throw new Error("Server error")
  }
  const data = await res.json()
  return data
}

export default function Home() {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [copiedItems, setCopiedItems] = useState<number[]>([])

  const form = useForm({
    defaultValues: {
      prompt: "",
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value)
    },
    validatorAdapter: zodValidator(),
  })

  const mutation = useMutation({
    mutationKey: ["prompt"],
    mutationFn: generateText,
    onSuccess: (data) => {
      setSuggestions(data.suggestions)
    },
    onSettled: () => {
      form.reset()
    },
  })

  const handleCopy = (index: number, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedItems((pv) => [...pv, index])
      setTimeout(() => {
        setCopiedItems((pv) => pv.filter((i) => i !== index))
      }, 2000)
    })
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      if (!event.shiftKey) {
        event.preventDefault()
        form.handleSubmit()
      }
    }
  }

  return (
    <div className='max-w-4xl mx-auto h-[calc(100vh_-_56px)] flex flex-col justify-center items-center gap-4 p-4'>
      <div className='flex-1 w-full flex flex-col gap-4'>
        {suggestions.map((suggestion, index) => (
          <Card key={index}>
            <CardContent className='flex justify-between items-start gap-4 p-4'>
              <p>{suggestion}</p>
              <Button
                variant='ghost'
                onClick={() => handleCopy(index, suggestion)}
                disabled={copiedItems.includes(index)}
              >
                {copiedItems.includes(index) ? <LuCheck /> : <LuCopy />}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <form
        className='w-full flex items-start gap-2'
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <form.Field
          name='prompt'
          validators={{
            onChange: z
              .string()
              .min(1, { message: "Must be at least 1 character." })
              .max(2000, { message: "Must be no more than 2000 characters." }),
          }}
        >
          {(field) => (
            <div className='w-full flex flex-col gap-1'>
              <Textarea
                className='w-full resize-none'
                name={field.name}
                value={field.state.value}
                placeholder='Type your message here.'
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={mutation.isPending}
              />
              {field.state.meta.errors ? (
                <em role='alert' className='text-xs'>
                  {field.state.meta.errors.join(", ")}
                </em>
              ) : null}
            </div>
          )}
        </form.Field>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isTouched, state.isSubmitting]}
        >
          {([canSubmit, isTouched, isSubmitting]) => (
            <Button type='submit' disabled={!canSubmit || !isTouched || mutation.isPending}>
              {isSubmitting || mutation.isPending ? (
                <LuLoader2 className='animate-spin' />
              ) : (
                <LuSend />
              )}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </div>
  )
}
