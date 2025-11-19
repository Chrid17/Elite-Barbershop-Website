import { motion } from 'motion/react';
import { ImageWithFallback } from './components/figma/ImageWithFallback.js';
import { Button } from './components/ui/button.js';
import { Card, CardContent } from './components/ui/card.js';
import { Scissors, Clock, Star, Phone, MapPin, Mail, Menu, X, Award, Users, ThumbsUp, Instagram, Facebook, Twitter } from 'lucide-react';
import { useState } from 'react';
import { BookingDialog } from './components/BookingDialog.js';
import { GalleryLightbox } from './components/GalleryLightbox.js';
import { BeforeAfterSlider } from './components/BeforeAfterSlider.js';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const services = [
    {
      icon: <Scissors className="w-8 h-8" />,
      title: "Classic Haircut",
      description: "Timeless cuts tailored to your style",
      price: "$35"
    },
    {
      icon: <Scissors className="w-8 h-8" />,
      title: "Beard Trim",
      description: "Precision grooming for the perfect look",
      price: "$25"
    },
    {
      icon: <Scissors className="w-8 h-8" />,
      title: "Hot Towel Shave",
      description: "Traditional straight razor experience",
      price: "$40"
    },
    {
      icon: <Scissors className="w-8 h-8" />,
      title: "Hair & Beard Combo",
      description: "Complete grooming package",
      price: "$55"
    },
    {
      icon: <Scissors className="w-8 h-8" />,
      title: "Kids Haircut",
      description: "Special care for our younger clients",
      price: "$25"
    },
    {
      icon: <Scissors className="w-8 h-8" />,
      title: "Deluxe Treatment",
      description: "Full service with massage and styling",
      price: "$75"
    }
  ];

  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1547648946-2b1fd7eab923?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXIlMjBjdXR0aW5nJTIwaGFpcnxlbnwxfHx8fDE3NjM0Mzk1NTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Barber cutting hair"
    },
    {
      src: "https://images.unsplash.com/photo-1647462742033-f4e39fa481b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBiYXJiZXIlMjB0b29sc3xlbnwxfHx8fDE3NjM0NjAwNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Professional barber tools"
    },
    {
      src: "https://images.unsplash.com/photo-1759134198561-e2041049419c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiYXJiZXJzaG9wfGVufDF8fHx8MTc2MzQzMTc3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Modern barbershop interior"
    },
    {
      src: "https://images.unsplash.com/photo-1610475680335-dafab5475150?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXJzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNjMzOTc0ODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Classic barbershop"
    },
    {
      src: "https://images.unsplash.com/photo-1619233543112-fe382ff3693d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjM0NjAwNzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Professional barber at work"
    },
    {
      src: "https://images.unsplash.com/photo-1759134248487-e8baaf31e33e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFyZCUyMHRyYW5zZm9ybWF0aW9ufGVufDF8fHx8MTc2MzQ2MDQ2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Beard grooming service"
    }
  ];

  const team = [
    {
      name: "Marcus Johnson",
      role: "Master Barber",
      image: "https://images.unsplash.com/photo-1619233543112-fe382ff3693d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjM0NjAwNzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      experience: "15+ years"
    },
    {
      name: "David Lee",
      role: "Senior Barber",
      image: "https://images.unsplash.com/photo-1547648946-2b1fd7eab923?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXIlMjBjdXR0aW5nJTIwaGFpcnxlbnwxfHx8fDE3NjM0Mzk1NTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      experience: "10+ years"
    },
    {
      name: "James Carter",
      role: "Barber & Stylist",
      image: "https://images.unsplash.com/photo-1647462742033-f4e39fa481b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBiYXJiZXIlMjB0b29sc3xlbnwxfHx8fDE3NjM0NjAwNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      experience: "8+ years"
    }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-900/95 backdrop-blur-sm border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Scissors className="w-6 h-6 text-amber-500" />
              <span className="text-amber-500">Elite Cuts</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('home')} className="hover:text-amber-500 transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection('services')} className="hover:text-amber-500 transition-colors">
                Services
              </button>
              <button onClick={() => scrollToSection('transformations')} className="hover:text-amber-500 transition-colors">
                Transformations
              </button>
              <button onClick={() => scrollToSection('gallery')} className="hover:text-amber-500 transition-colors">
                Gallery
              </button>
              <button onClick={() => scrollToSection('team')} className="hover:text-amber-500 transition-colors">
                Team
              </button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-amber-500 transition-colors">
                Contact
              </button>
              <Button onClick={() => setBookingOpen(true)} className="bg-amber-500 hover:bg-amber-600 text-neutral-900">
                Book Now
              </Button>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-neutral-800 border-t border-neutral-700">
            <div className="px-4 py-3 space-y-3">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left hover:text-amber-500 transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection('services')} className="block w-full text-left hover:text-amber-500 transition-colors">
                Services
              </button>
              <button onClick={() => scrollToSection('transformations')} className="block w-full text-left hover:text-amber-500 transition-colors">
                Transformations
              </button>
              <button onClick={() => scrollToSection('gallery')} className="block w-full text-left hover:text-amber-500 transition-colors">
                Gallery
              </button>
              <button onClick={() => scrollToSection('team')} className="block w-full text-left hover:text-amber-500 transition-colors">
                Team
              </button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left hover:text-amber-500 transition-colors">
                Contact
              </button>
              <Button onClick={() => setBookingOpen(true)} className="w-full bg-amber-500 hover:bg-amber-600 text-neutral-900">
                Book Now
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1610475680335-dafab5475150?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXJzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYzMzk3NDg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Barbershop Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/70 via-neutral-900/50 to-neutral-900"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-amber-500"></div>
              <Scissors className="w-8 h-8 text-amber-500" />
              <div className="h-px w-12 bg-amber-500"></div>
            </div>
            <h1 className="text-5xl md:text-7xl mb-6 text-white drop-shadow-lg">Elite Cuts Barbershop</h1>
            <p className="text-xl md:text-2xl text-neutral-300 mb-8 drop-shadow-md">
              Where Tradition Meets Modern Style
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => setBookingOpen(true)}
                className="bg-amber-500 hover:bg-amber-600 text-neutral-900 px-8 py-6"
              >
                Book Appointment
              </Button>
              <Button 
                onClick={() => scrollToSection('services')}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-neutral-900 px-8 py-6"
              >
                View Services
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 mb-4">
                <Users className="w-8 h-8 text-amber-500" />
              </div>
              <div className="text-4xl mb-2">5000+</div>
              <p className="text-neutral-400">Happy Clients</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 mb-4">
                <Award className="w-8 h-8 text-amber-500" />
              </div>
              <div className="text-4xl mb-2">15+</div>
              <p className="text-neutral-400">Years Experience</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 mb-4">
                <Star className="w-8 h-8 text-amber-500" />
              </div>
              <div className="text-4xl mb-2">4.9</div>
              <p className="text-neutral-400">Average Rating</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 mb-4">
                <ThumbsUp className="w-8 h-8 text-amber-500" />
              </div>
              <div className="text-4xl mb-2">100%</div>
              <p className="text-neutral-400">Satisfaction</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4">Our Services</h2>
            <p className="text-xl text-neutral-400">Premium grooming services tailored for you</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-neutral-800 border-neutral-700 hover:border-amber-500 transition-colors h-full">
                  <CardContent className="p-6">
                    <div className="text-amber-500 mb-4">{service.icon}</div>
                    <h3 className="mb-2 text-white">{service.title}</h3>
                    <p className="text-neutral-400 mb-4">{service.description}</p>
                    <div className="text-2xl text-amber-500">{service.price}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Transformations Section */}
      <section id="transformations" className="py-20 bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4">Transformations</h2>
            <p className="text-xl text-neutral-400">See the difference our expertise makes</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <BeforeAfterSlider
                beforeImage="https://images.unsplash.com/photo-1608869776252-33ff061fabf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW4lMjBoYWlyY3V0JTIwYmVmb3JlfGVufDF8fHx8MTc2MzQ2MDQ2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                afterImage="https://images.unsplash.com/photo-1543697506-6729425f7265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW4lMjBoYWlyY3V0JTIwYWZ0ZXIlMjBzdHlsZWR8ZW58MXx8fHwxNzYzNDYwNDY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              />
              <div className="mt-4 text-center">
                <h3 className="mb-2">Classic Haircut & Style</h3>
                <p className="text-neutral-400">Modern fade with textured top</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <BeforeAfterSlider
                beforeImage="https://images.unsplash.com/photo-1759134248487-e8baaf31e33e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFyZCUyMHRyYW5zZm9ybWF0aW9ufGVufDF8fHx8MTc2MzQ2MDQ2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                afterImage="https://images.unsplash.com/photo-1619233543112-fe382ff3693d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjM0NjAwNzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              />
              <div className="mt-4 text-center">
                <h3 className="mb-2">Hair & Beard Combo</h3>
                <p className="text-neutral-400">Complete grooming transformation</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4">Our Work</h2>
            <p className="text-xl text-neutral-400">Click any image to view full size</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => openLightbox(index)}
                className="relative h-64 overflow-hidden rounded-lg group cursor-pointer"
              >
                <ImageWithFallback
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-neutral-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-2xl mb-2">🔍</div>
                    <div>View Full Size</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4">Meet Our Team</h2>
            <p className="text-xl text-neutral-400">Experienced professionals dedicated to your style</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-neutral-900 border-neutral-700 overflow-hidden hover:border-amber-500 transition-colors">
                  <div className="relative h-80">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent"></div>
                  </div>
                  <CardContent className="p-6 -mt-20 relative z-10">
                    <h3 className="mb-1 text-white">{member.name}</h3>
                    <p className="text-amber-500 mb-2">{member.role}</p>
                    <p className="text-neutral-400">{member.experience} experience</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4">What Clients Say</h2>
            <p className="text-xl text-neutral-400">Real reviews from real people</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-neutral-800 border-neutral-700 h-full">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-neutral-300 mb-4">
                    "Best barbershop in town! Marcus always knows exactly what I want. The atmosphere is amazing and the attention to detail is unmatched."
                  </p>
                  <div>
                    <div className="text-white">John Martinez</div>
                    <div className="text-sm text-neutral-400">Regular Client</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="bg-neutral-800 border-neutral-700 h-full">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-neutral-300 mb-4">
                    "I've been coming here for 3 years and never disappointed. Professional service, skilled barbers, and always leave looking sharp."
                  </p>
                  <div>
                    <div className="text-white">Michael Chen</div>
                    <div className="text-sm text-neutral-400">Loyal Customer</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-neutral-800 border-neutral-700 h-full">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-neutral-300 mb-4">
                    "The hot towel shave is an experience! David is a true craftsman. Highly recommend Elite Cuts to anyone looking for quality."
                  </p>
                  <div>
                    <div className="text-white">Robert Williams</div>
                    <div className="text-sm text-neutral-400">Happy Client</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4">Visit Us</h2>
            <p className="text-xl text-neutral-400">Book your appointment today</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <div className="text-neutral-400 mb-1">Address</div>
                    <p>123 Main Street<br />Downtown, NY 10001</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <div className="text-neutral-400 mb-1">Phone</div>
                    <p>(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <div className="text-neutral-400 mb-1">Email</div>
                    <p>info@elitecuts.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <div className="text-neutral-400 mb-1">Hours</div>
                    <p>Monday - Friday: 9am - 8pm<br />
                       Saturday: 9am - 6pm<br />
                       Sunday: 10am - 5pm</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-neutral-900 p-8 rounded-lg">
              <h3 className="mb-4">Quick Booking</h3>
              <p className="text-neutral-400 mb-6">For full booking with time slots, use the button below</p>
              <Button 
                onClick={() => setBookingOpen(true)}
                className="w-full bg-amber-500 hover:bg-amber-600 text-neutral-900 mb-6"
              >
                Open Full Booking System
              </Button>
              
              <div className="border-t border-neutral-800 pt-6">
                <h4 className="mb-4">Or send us a message</h4>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2">Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 rounded bg-neutral-800 border border-neutral-700 focus:border-amber-500 focus:outline-none"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-2 rounded bg-neutral-800 border border-neutral-700 focus:border-amber-500 focus:outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Message</label>
                    <textarea 
                      rows={4}
                      className="w-full px-4 py-2 rounded bg-neutral-800 border border-neutral-700 focus:border-amber-500 focus:outline-none resize-none"
                      placeholder="Your message..."
                    />
                  </div>
                  <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-neutral-900">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 border-t border-neutral-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Scissors className="w-6 h-6 text-amber-500" />
              <span className="text-xl text-amber-500">Elite Cuts</span>
            </div>
            <p className="text-neutral-400 mb-6">
              Premium barbershop services in the heart of downtown
            </p>
            <div className="flex items-center justify-center gap-6 mb-6">
              <a href="#" className="text-neutral-400 hover:text-amber-500 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-amber-500 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-amber-500 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
            <p className="text-neutral-500 text-sm">
              © 2025 Elite Cuts Barbershop. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Booking Dialog */}
      <BookingDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        services={services}
      />

      {/* Gallery Lightbox */}
      <GalleryLightbox
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        initialIndex={lightboxIndex}
        images={galleryImages}
      />
    </div>
  );
}
