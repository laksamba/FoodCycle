import React, { useState, useEffect, type JSX } from 'react';
import { 
  Leaf, 
  Heart, 
  Users, 
  Store, 
  ShoppingCart, 
  Bell, 
  Star,
  ArrowRight,
  Play,
  Check,
  MapPin,
  Clock,
  TrendingUp,
  Shield,
  Smartphone,
  type LucideIcon
} from 'lucide-react';

// Type definitions
interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

interface Stat {
  number: string;
  label: string;
  icon: LucideIcon;
}

interface NavigationProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

// Navigation Link Component
const NavLink: React.FC<NavigationProps> = ({ href, children, className = "" }) => (
  <a 
    href={href} 
    className={`text-gray-700 hover:text-emerald-600 transition-colors ${className}`}
  >
    {children}
  </a>
);

// Button Component
const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  onClick, 
  className = "" 
}) => {
  const baseStyles = "font-semibold rounded-full transition-all flex items-center justify-center space-x-2";
  const variantStyles = {
    primary: "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-xl",
    secondary: "border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50"
  };
  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export default function FoodCyclePage(): JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [activeFeature, setActiveFeature] = useState<number>(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features: Feature[] = [
    {
      icon: Store,
      title: "For Businesses",
      description: "List surplus food, set discounts, or mark donations. Turn waste into value.",
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: ShoppingCart,
      title: "For Consumers",
      description: "Browse and purchase quality food at discounted prices. Save money, save the planet.",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: Heart,
      title: "For NGOs",
      description: "Receive donation alerts and coordinate pickups to help those in need.",
      color: "from-pink-500 to-rose-600"
    }
  ];

  const stats: Stat[] = [
    { number: "50%", label: "Food Waste Reduced", icon: TrendingUp },
    { number: "1000+", label: "Partner Businesses", icon: Store },
    { number: "25K+", label: "Active Users", icon: Users },
    { number: "500K+", label: "Meals Saved", icon: Heart }
  ];

  const benefits: string[] = [
    "Real-time food listings with smart filters",
    "Integrated payment system (eSewa, Khalti)",
    "Instant notifications for donations",
    "Comprehensive admin analytics",
    "Food safety compliance",
    "Community impact tracking"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                FoodCycle
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#how-it-works">How It Works</NavLink>
              <NavLink href="#impact">Impact</NavLink>
              <Button size="md">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Star className="w-4 h-4" />
                <span>Reducing Food Waste in Nepal</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Turn Food Waste Into
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent block">
                  Community Impact
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Connect restaurants, grocery stores, and consumers to redistribute surplus food through discounts or donations. Join the movement to reduce food insecurity in Nepal.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="group"
                  onClick={() => console.log('Start Saving Food clicked')}
                >
                  <span>Start Saving Food</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  variant="secondary" 
                  size="lg"
                  onClick={() => console.log('Watch Demo clicked')}
                >
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </Button>
              </div>
            </div>
            
            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-3xl transform rotate-3"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                  <div className="grid grid-cols-2 gap-6">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <stat.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built for Every
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Stakeholder</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're a business looking to reduce waste, a consumer seeking deals, or an NGO helping communities, FoodCycle has you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature: Feature, index: number) => (
              <div 
                key={index}
                className="group cursor-pointer"
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className={`bg-gradient-to-br ${feature.color} rounded-3xl p-8 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${activeFeature === index ? 'scale-105 shadow-2xl' : ''}`}>
                  <feature.icon className="w-12 h-12 mb-6" />
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-lg opacity-90 leading-relaxed">{feature.description}</p>
                  
                  <div className="mt-6 flex items-center text-white/80 group-hover:text-white transition-colors">
                    <span className="mr-2">Learn more</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How FoodCycle Works</h2>
            <p className="text-xl text-gray-600">Simple steps to make a big difference</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {benefits.map((benefit: string, index: number) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg text-gray-700 group-hover:text-emerald-600 transition-colors">{benefit}</span>
                </div>
              ))}
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 bg-emerald-50 rounded-xl">
                    <MapPin className="w-8 h-8 text-emerald-600" />
                    <div>
                      <div className="font-semibold text-gray-900">Nearby Restaurant</div>
                      <div className="text-sm text-gray-600">Fresh pasta - 50% off</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl">
                    <Clock className="w-8 h-8 text-blue-600" />
                    <div>
                      <div className="font-semibold text-gray-900">Expires in 2 hours</div>
                      <div className="text-sm text-gray-600">Perfect for dinner tonight</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-pink-50 rounded-xl">
                    <Bell className="w-8 h-8 text-pink-600" />
                    <div>
                      <div className="font-semibold text-gray-900">Donation Alert</div>
                      <div className="text-sm text-gray-600">Local NGO notified</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-16 bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Impact in Nepal</h2>
            <p className="text-xl opacity-90">Together, we're building a more sustainable future</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat: Stat, index: number) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of businesses, consumers, and NGOs already using FoodCycle to reduce waste and help communities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => console.log('Download App clicked')}
            >
              <Smartphone className="w-5 h-5" />
              <span>Download App</span>
            </Button>
            
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => console.log('Register Business clicked')}
            >
              <Shield className="w-5 h-5" />
              <span>Register Business</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">FoodCycle</span>
            </div>
            
            <div className="text-gray-400 text-center md:text-right">
              <p>© 2025 FoodCycle. Reducing food waste, one meal at a time.</p>
              <p className="text-sm mt-2">Built with ❤️ for Nepal</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}