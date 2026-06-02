import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import StarryBackground from './StarryBackground'
import ScrollToTop from './ScrollToTop'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Starfield canvas background */}
      <StarryBackground />

      {/* Ambient glow orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/3 rounded-full blur-3xl" />
      </div>

      <ScrollToTop />
      <Navbar />
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
