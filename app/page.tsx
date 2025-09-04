import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Truck, ChefHat, Globe, Star, Quote } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: <ChefHat className="h-8 w-8 text-primary-600" />,
      title: 'Chef-Curated Meals',
      description: 'Expertly crafted recipes by professional chefs using the freshest ingredients'
    },
    {
      icon: <Truck className="h-8 w-8 text-secondary-600" />,
      title: 'Nationwide Delivery',
      description: 'Fresh meals delivered to your doorstep across Kenya with our reliable network'
    },
    {
      icon: <Globe className="h-8 w-8 text-accent-600" />,
      title: 'Flexible Subscriptions',
      description: 'Pause, skip, or modify your plan anytime. Complete control over your meal journey'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Kimani',
      text: 'The variety and quality of meals from Foodies Kitchen is outstanding. My family looks forward to dinner every night!',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5
    },
    {
      name: 'Michael Ochieng',
      text: 'As a busy professional, Foodies Kitchen has been a lifesaver. Healthy, delicious meals without the planning hassle.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5
    },
    {
      name: 'Grace Wanjiku',
      text: 'The corporate catering service transformed our office lunch experience. Everyone loves the diverse, nutritious options.',
      image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        
        <div className="relative z-10 text-center text-white px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Fresh, Flavorful Meals
            <br />
            <span className="text-primary-400">Delivered to You</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience Kenya's finest meal subscription service with chef-curated dishes, 
            premium ingredients, and flexible delivery options.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/plans"
              className="group bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              View Plans
              <ArrowRight className="inline ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/meals"
              className="group bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white/30 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Explore Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Why Choose Foodies Kitchen?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just delivering meals – we're bringing culinary excellence to your table 
              with every carefully crafted dish.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group text-center p-8 rounded-2xl hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-cream-50 to-white border border-cream-200"
              >
                <div className="mb-6 flex justify-center">
                  <div className="p-4 bg-white rounded-2xl shadow-md group-hover:shadow-lg transition-shadow">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-cream-50 to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied food lovers across Kenya
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="mb-6">
                  <Quote className="h-6 w-6 text-primary-400 mb-4" />
                  <p className="text-gray-700 leading-relaxed mb-4">"{testimonial.text}"</p>
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">Verified Customer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Dining Experience?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start your culinary journey today with our flexible subscription plans
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/plans"
              className="group bg-white text-primary-600 hover:bg-cream-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Get Started Now
              <ArrowRight className="inline ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/meals"
              className="group border-2 border-white/30 hover:border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
            >
              Browse Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className=" py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ChefHat className="h-6 w-6 text-primary-400" />
                <span className="text-lg font-bold">Foodies Kitchen</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Kenya's premier meal subscription service, delivering culinary excellence to your doorstep.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2">
                <Link href="/about" className="block text-gray-400 hover:text-white transition-colors">About Us</Link>
                <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors">Contact</Link>
                <Link href="/careers" className="block text-gray-400 hover:text-white transition-colors">Careers</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <Link href="/faq" className="block text-gray-400 hover:text-white transition-colors">FAQ</Link>
                <Link href="/help" className="block text-gray-400 hover:text-white transition-colors">Help Center</Link>
                <Link href="/privacy" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Facebook</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Instagram</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Twitter</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Foodies Kitchen. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;