import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import BaZi from '@/pages/chinese/BaZi'
import IChing from '@/pages/chinese/IChing'
import Zodiac from '@/pages/chinese/Zodiac'
import Tarot from '@/pages/western/Tarot'
import Horoscope from '@/pages/western/Horoscope'
import Numerology from '@/pages/western/Numerology'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/bazi" element={<BaZi />} />
          <Route path="/iching" element={<IChing />} />
          <Route path="/zodiac" element={<Zodiac />} />
          <Route path="/tarot" element={<Tarot />} />
          <Route path="/horoscope" element={<Horoscope />} />
          <Route path="/numerology" element={<Numerology />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
