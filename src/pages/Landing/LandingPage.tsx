import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  CheckCircle, 
  ArrowUpRight,
  Users,
  DollarSign,
  ArrowUp,
  Layers
} from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white py-4 border-b border-neutral-200">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary-600">1x3</span>
            <span className="text-2xl font-bold text-neutral-800">Matrix</span>
          </Link>
          
          <div className="flex items-center">
            <Link to="/login" className="px-4 py-2 text-neutral-600 hover:text-primary-600">
              Login
            </Link>
            <Link to="/register" className="button button-primary ml-4">
              Register
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                  Turn $3 into $49,152 with Our Powerful 1x3 Matrix System
                </h1>
                <p className="text-lg md:text-xl text-white text-opacity-90 mb-8">
                  A team-driven forced matrix program where your downline's success becomes your success through strategic pass-ups and a global pool system.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/register" 
                    className="button bg-white text-primary-700 hover:bg-neutral-100 flex items-center"
                  >
                    Get Started Now
                    <ChevronRight size={18} className="ml-1" />
                  </Link>
                  <a 
                    href="#how-it-works" 
                    className="button bg-transparent border border-white text-white hover:bg-white hover:bg-opacity-10"
                  >
                    Learn How It Works
                  </a>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 w-full max-w-md">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold mb-2">Matrix Level Progression</h3>
                    <p className="text-white text-opacity-80">From $3 to $49,152 in 15 levels</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white bg-opacity-20 rounded-md">
                      <div>
                        <div className="font-medium">Starter Level</div>
                        <div className="text-sm text-white text-opacity-80">Entry Point</div>
                      </div>
                      <div className="text-xl font-bold">$3</div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-white bg-opacity-20 rounded-md">
                      <div>
                        <div className="font-medium">Level 5</div>
                        <div className="text-sm text-white text-opacity-80">Intermediate</div>
                      </div>
                      <div className="text-xl font-bold">$48</div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-white bg-opacity-20 rounded-md">
                      <div>
                        <div className="font-medium">Level 10</div>
                        <div className="text-sm text-white text-opacity-80">Advanced</div>
                      </div>
                      <div className="text-xl font-bold">$1,536</div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-white bg-opacity-20 rounded-md">
                      <div>
                        <div className="font-medium">Level 15</div>
                        <div className="text-sm text-white text-opacity-80">Crown Level</div>
                      </div>
                      <div className="text-xl font-bold">$49,152</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">How It Works</h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Our 1x3 forced matrix system is designed to maximize your earnings through a simple, yet powerful structure. Here's how it works:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="card text-center p-8">
                <div className="w-16 h-16 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-4">
                  <DollarSign size={24} />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  Start with Just $3
                </h3>
                <p className="text-neutral-600">
                  Begin your journey with a small $3 investment to purchase your first position in the 1x3 matrix.
                </p>
              </div>
              
              <div className="card text-center p-8">
                <div className="w-16 h-16 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-4">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  Fill Your Matrix
                </h3>
                <p className="text-neutral-600">
                  Your matrix requires 3 members to fill. When complete, you earn $3 in profit plus your initial $3 back.
                </p>
              </div>
              
              <div className="card text-center p-8">
                <div className="w-16 h-16 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-4">
                  <ArrowUp size={24} />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  Receive Pass-Ups
                </h3>
                <p className="text-neutral-600">
                  The 3rd position filled in your downline's matrix passes up to you, creating additional income streams.
                </p>
              </div>
              
              <div className="card text-center p-8">
                <div className="w-16 h-16 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-4">
                  <Layers size={24} />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  Progress Through Levels
                </h3>
                <p className="text-neutral-600">
                  Use your earnings to purchase higher-level matrices, with each level doubling in value up to $49,152.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  The Power of the 1x3 Force Matrix
                </h2>
                <p className="text-lg text-neutral-600 mb-6">
                  Our unique system leverages the power of team building and pass-ups to create exponential growth potential for all members.
                </p>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-success mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-neutral-900">Global PIF Pool</h4>
                      <p className="text-neutral-600">
                        Our Pay-It-Forward pool brings new members into your downline, helping matrices cycle faster.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-success mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-neutral-900">Strategic Pass-Ups</h4>
                      <p className="text-neutral-600">
                        The 3rd position in each matrix is passed up to your sponsor, creating consistent income for everyone.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-success mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-neutral-900">15 Matrix Levels</h4>
                      <p className="text-neutral-600">
                        Progress through 15 levels of increasing value, from $3 all the way to $49,152.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-success mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-neutral-900">Self-Sustaining System</h4>
                      <p className="text-neutral-600">
                        After your initial $3 investment, the system can fund itself through reinvestment of earnings.
                      </p>
                    </div>
                  </li>
                </ul>
                
                <Link to="/register" className="button button-primary flex items-center inline-flex">
                  Join Now
                  <ArrowUpRight size={18} className="ml-1" />
                </Link>
              </div>
              
              <div className="lg:w-1/2">
                <div className="bg-neutral-50 rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
                    Matrix Level Progression
                  </h3>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-neutral-100">
                          <th className="py-3 px-4 text-left text-neutral-600">Level</th>
                          <th className="py-3 px-4 text-left text-neutral-600">Matrix Cost</th>
                          <th className="py-3 px-4 text-left text-neutral-600">Profit</th>
                          <th className="py-3 px-4 text-left text-neutral-600">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-200">
                        <tr>
                          <td className="py-3 px-4 text-neutral-900">Level 1</td>
                          <td className="py-3 px-4 text-neutral-900">$3</td>
                          <td className="py-3 px-4 text-success">$3</td>
                          <td className="py-3 px-4 text-neutral-900">$6</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-neutral-900">Level 2</td>
                          <td className="py-3 px-4 text-neutral-900">$6</td>
                          <td className="py-3 px-4 text-success">$6</td>
                          <td className="py-3 px-4 text-neutral-900">$12</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-neutral-900">Level 3</td>
                          <td className="py-3 px-4 text-neutral-900">$12</td>
                          <td className="py-3 px-4 text-success">$12</td>
                          <td className="py-3 px-4 text-neutral-900">$24</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-neutral-900">Level 4</td>
                          <td className="py-3 px-4 text-neutral-900">$24</td>
                          <td className="py-3 px-4 text-success">$24</td>
                          <td className="py-3 px-4 text-neutral-900">$48</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-neutral-900">Level 5</td>
                          <td className="py-3 px-4 text-neutral-900">$48</td>
                          <td className="py-3 px-4 text-success">$48</td>
                          <td className="py-3 px-4 text-neutral-900">$96</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-neutral-900 font-semibold">...</td>
                          <td className="py-3 px-4 text-neutral-900 font-semibold">...</td>
                          <td className="py-3 px-4 text-success font-semibold">...</td>
                          <td className="py-3 px-4 text-neutral-900 font-semibold">...</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-neutral-900 font-semibold">Level 15</td>
                          <td className="py-3 px-4 text-neutral-900 font-semibold">$49,152</td>
                          <td className="py-3 px-4 text-success font-semibold">$49,152</td>
                          <td className="py-3 px-4 text-neutral-900 font-semibold">$98,304</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-primary-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your 1x3 Matrix Journey?</h2>
            <p className="text-xl text-white text-opacity-90 mb-8 max-w-3xl mx-auto">
              Join our community today and start turning your initial $3 investment into thousands through our powerful team-based system.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/register" 
                className="button bg-white text-primary-700 hover:bg-neutral-100"
              >
                Register Now
              </Link>
              <Link 
                to="/login" 
                className="button bg-transparent border border-white text-white hover:bg-white hover:bg-opacity-10"
              >
                Login
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-neutral-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <Link to="/" className="flex items-center mb-4">
                <span className="text-2xl font-bold text-primary-400">1x3</span>
                <span className="text-2xl font-bold text-white">Matrix</span>
              </Link>
              <p className="text-neutral-400">
                The ultimate team-based 1x3 forced matrix system for exponential earnings.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-neutral-400 hover:text-white">Home</Link>
                </li>
                <li>
                  <a href="#how-it-works" className="text-neutral-400 hover:text-white">How It Works</a>
                </li>
                <li>
                  <Link to="/register" className="text-neutral-400 hover:text-white">Register</Link>
                </li>
                <li>
                  <Link to="/login" className="text-neutral-400 hover:text-white">Login</Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-neutral-400 hover:text-white">Terms of Service</a>
                </li>
                <li>
                  <a href="#" className="text-neutral-400 hover:text-white">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="text-neutral-400 hover:text-white">Refund Policy</a>
                </li>
                <li>
                  <a href="#" className="text-neutral-400 hover:text-white">Disclaimers</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2">
                <li className="text-neutral-400">
                  support@1x3matrix.com
                </li>
                <li className="text-neutral-400">
                  Hours: Monday-Friday 9am-5pm EST
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-neutral-800 text-center text-neutral-500 text-sm">
            <p>© 2025 1x3 Matrix. All rights reserved.</p>
            <p className="mt-2">
              Results may vary. The 1x3 Matrix program requires consistent effort and team building. 
              The depicted earnings are not guaranteed and depend on various factors.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;