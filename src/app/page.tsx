import { SuggestionContent } from "@/app/components/suggestion-content"
import { SuggestionForm } from "@/app/components/suggestion-form"

export default function Home() {
  return (
    <div className='h-dvh'>
      <div className='h-full flex flex-col gap-4 pt-14 pb-4'>
        <SuggestionContent />
        <SuggestionForm />
      </div>
    </div>
  )
}
