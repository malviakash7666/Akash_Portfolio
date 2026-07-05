
import About from '../../components/About'
import Contact from '../../components/Contact'
import Experience from '../../components/Experience'
import Hero from '../../components/Hero'
import Navbar from '../../components/Navbar'
import Projects from '../../components/Projects'
import Skills from '../../components/Skills'


const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </div>
  )
}

export default Home