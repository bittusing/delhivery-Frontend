import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  TrendingUp, 
  Shield, 
  Zap, 
  Globe, 
  Users, 
  MapPin, 
  CheckCircle,
  ArrowRight,
  Truck,
  Clock,
  DollarSign,
  BarChart3
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast Delivery',
      description: 'Same-day and next-day delivery options across major cities'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'End-to-end tracking with insurance coverage for your shipments'
    },
    {
      icon: DollarSign,
      title: 'Best Rates',
      description: 'Competitive pricing with no hidden charges'
    },
    {
      icon: Globe,
      title: 'Pan-India Coverage',
      description: '25,000+ pincodes covered across India'
    },
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Track performance with detailed insights and reports'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all your queries'
    }
  ];

  const stats = [
    { icon: Package, value: '10,000+', label: 'Orders Delivered' },
    { icon: Users, value: '500+', label: 'Happy Customers' },
    { icon: Truck, value: '3+', label: 'Courier Partners' },
    { icon: MapPin, value: '25,000+', label: 'Pincodes Covered' }
  ];

  const services = [
    {
      title: 'Domestic Shipping',
      description: 'Fast and reliable shipping across India with multiple courier partners',
      features: ['COD Available', 'Real-time Tracking', 'Insurance Coverage']
    },
    {
      title: 'International Shipping',
      description: 'Ship globally with competitive rates and customs support',
      features: ['200+ Countries', 'Customs Clearance', 'Door-to-Door Delivery']
    },
    {
      title: 'Bulk Orders',
      description: 'Special rates for high-volume shippers with dedicated support',
      features: ['Volume Discounts', 'Priority Support', 'Custom Solutions']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Package className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Flywell</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#services" className="text-gray-600 hover:text-gray-900 transition-colors">Services</a>
              <button 
                onClick={() => navigate('/about')}
                className="text-gray-600 hover:text-gray-900 transition-colors"
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
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Ship Smarter,
              <span className="text-blue-600"> Deliver Faster</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Your all-in-one logistics platform for seamless shipping across India and beyond.
              Connect with multiple courier partners and manage everything from one dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/signup')}
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 font-medium text-lg flex items-center justify-center gap-2 shadow-lg"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-4 bg-white text-gray-900 rounded-lg hover:bg-gray-50 transition-all border-2 border-gray-200 font-medium text-lg"
              >
                Contact Sales
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Ship Successfully
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to make shipping simple, fast, and reliable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className="p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all group"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                    <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive shipping solutions tailored to your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Shipping?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of businesses already shipping smarter with Flywell
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 font-medium text-lg shadow-xl"
          >
            Start Shipping Today
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

export default LandingPage;
