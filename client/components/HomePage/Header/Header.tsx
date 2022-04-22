import Link from 'next/link'
import Navbar from '../Navbar/Navbar'

export default function Header() {
  return (
    <header className="z-50 fixed top-0 left-0 right-0 shadow-lg py-4 bg-[#fff]">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <h1 className="font-bold text-3xl text-baseColor"><Link passHref href="/">Logo</Link></h1>
        </div>
        <Navbar />
      </div>
    </header>
  )
}
