import Navbar from './components/Navbar'
import AnnouncementBar from './components/AnnouncementBar'
import HeroSection from './components/HeroSection'
import FeaturesBar from './components/FeaturesBar'
import TextureDivider from './components/TextureDivider'
import QuoteSection from './components/QuoteSection'
import SectionTitle from './components/SectionTitle'
import YieldSection from './components/YieldSection'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <AnnouncementBar />
      <HeroSection />
      <FeaturesBar />
      <TextureDivider />
      <QuoteSection />
      <TextureDivider />
      <SectionTitle title="Our Products" />
      <YieldSection />
    </>
  )
}

export default App
