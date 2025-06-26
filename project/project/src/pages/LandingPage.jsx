import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function LandingPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <motion.div {...fadeIn} className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">AI-Powered</span>
                  <span className="block text-primary-600">Financial Insights</span>
                  <span className="block">in Seconds</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Transform complex financial statements into clear, actionable insights with our AI-powered analysis. Upload your PDF and get instant, reliable financial analysis.
                </p>

                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start gap-4">
                  <div className="rounded-md shadow">
                    <Link
                      to="/login"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
                    >
                      Get Started
                    </Link>
                  </div>
                  <div className="rounded-md shadow">
                    <Link
                      to="/signup"
                      className="w-full flex items-center justify-center px-8 py-3 border border-primary-600 text-base font-medium rounded-md text-primary-600 hover:bg-primary-100 md:py-4 md:text-lg md:px-10"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              </motion.div>
            </main>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-500">Three simple steps to get your financial insights</p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {["Upload PDF", "AI Analysis", "Get Results"].map((title, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="relative bg-white p-6 rounded-lg shadow-lg"
              >
                <div className="text-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mx-auto">
                    {index + 1}
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
                  <p className="mt-2 text-base text-gray-500">
                    {index === 0 && "Simply upload your financial statement PDF"}
                    {index === 1 && "Our AI analyzes and extracts key insights"}
                    {index === 2 && "Receive detailed insights and visualizations"}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
