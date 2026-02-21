import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  Target, 
  Users, 
  Award,
  TrendingUp,
  Shield,
  Heart,
  Zap
} from 'lucide-react';

const About = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To revolutionize logistics by making shipping accessible, affordable, and reliable for businesses of all sizes across India.'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'We put our customers at the heart of everything we do, ensuring their success is our success.'
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'Building lasting relationships through transparency, reliability, and secure handling of every shipment.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Constantly evolving our platform with cutting-edge technology to deliver the best shipping experience.'
    }
  ];

  const achievements = [
    { icon: Package, value: '10,000+', label: 'Shipments Delivered' },
    { icon: Users, value: '500+', label: 'Active Customers' },
    { icon: Award, value: '99.5%', label: 'On-Time Delivery' },
    { icon: TrendingUp, value: '3+', label: 'Courier Partners' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <Package className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Flywell</span>
            </button>
            
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => navigate('/about')}
                className="text-gray-900 font-medium"
              >
                About
              </button>
              <button 
                onClick={() => navigate('/contact')}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Contact
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/login')}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About <span className="text-blue-600">Flywell</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to simplify logistics for businesses across India. 
            From startups to enterprises, we provide the tools and partnerships needed to ship smarter.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Story</h2>
          <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
            <p>
              Flywell was born from a simple observation: shipping in India was complicated, 
              expensive, and fragmented. Businesses had to juggle multiple courier partners, 
              deal with inconsistent pricing, and struggle with poor tracking systems.
            </p>
            <p>
              We set out to change that. By building a unified platform that connects businesses 
              with multiple courier partners, we've made shipping as simple as a few clicks. 
              Our technology handles the complexity, so you can focus on growing your business.
            </p>
            <p>
              Today, we're proud to serve hundreds of businesses across India, delivering thousands 
              of shipments every month. But we're just getting started. Our vision is to become 
              India's most trusted logistics platform, empowering businesses of all sizes to reach 
              customers anywhere in the country.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Our Values</h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">Our Achievements</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{achievement.value}</div>
                  <div className="text-gray-600">{achievement.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join Us on This Journey
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Be part of India's logistics revolution
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 font-medium text-lg shadow-xl"
          >
            Get Started Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-8 h-8 text-blue-500" />
                <span className="text-2xl font-bold text-white">Flywell</span>
              </div>
              <p className="text-gray-400">
                Your trusted logistics partner for seamless shipping solutions.
              </p>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => navigate('/about')} className="hover:text-white transition-colors">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/contact')} className="hover:text-white transition-colors">
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Services</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Domestic Shipping</a></li>
                <li><a href="#" className="hover:text-white transition-colors">International Shipping</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Bulk Orders</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Flywell Logistics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
