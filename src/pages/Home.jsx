import Section from '../components/Section';
import Navbar from '../components/Navbar';
import HeroSection from '../components/Header';
import Me from '../components/Me';
import About from '../components/About';
import Cards from '../components/Cards';
import Testimonial from '../components/Testimonials';
// This is a placeholder for your DarkRoundedButton component.
// In a real application, you would ensure the correct path and content for DarkRoundedButton.

/**
 * AnimatedLink Component
 * Wraps text to apply letter-by-letter animation on hover.
 */


// Main App component
const App = () => {
  return (
    <div className="min-h-screen bg-[#160b17] text-white">
      <Navbar />
      <main className="max-w-[1440px] mx-auto px-6 pt-28">
        <HeroSection
          imageUrl="https://images.unsplash.com/photo-1517830847971-8848d6139ed2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="Crafted Works, Bold Results"
          subtitle="Showcasing creative projects that deliver impact and inspire growth."
          imageAlt="People working in office with large windows and wooden walls"
        />
        <Section />
        <Me />
        <About />
        <Testimonial />
        <Cards />
        {/* <Pricing /> */}
        {/* You can add more sections here */}
        <section className="py-20 px-4 text-center text-gray-800">
          <h2 className="text-3xl font-bold mb-4 text-white">More Facilities are coming soon !</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            This is where you will get every thing automated without having any overhead.
          </p>
        </section>
      </main>
    </div>
  );
};

export default App;
