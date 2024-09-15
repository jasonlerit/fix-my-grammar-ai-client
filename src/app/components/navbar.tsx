import { ModeToggle } from "./mode-toggle"

export const Navbar = () => {
  return (
    <header>
      <div className='container mx-auto h-14 flex justify-between items-center'>
        <span className='font-bold'>Fix My Grammar AI</span>
        <ModeToggle />
      </div>
    </header>
  )
}
