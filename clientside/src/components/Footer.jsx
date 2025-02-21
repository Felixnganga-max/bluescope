import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  MapPin,
  Phone,
  ArrowUp,
} from "lucide-react";
import images from "../assets/assets";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-gradient-to-b from-blue-100 to-blue-200 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300"></div>
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-blue-300/20 blur-xl"></div>
      <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-blue-300/20 blur-xl"></div>

      <div className="max-w-6xl mx-auto px-4 pt-16 pb-8 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Company Info */}
          <div className="flex flex-col">
            <div className="flex items-center mb-4">
              <img
                src={images.logo}
                alt="Company Logo"
                className="h-10 w-auto mr-2"
              />
              <h3 className="text-blue-800 text-xl font-bold">PrintDesign</h3>
            </div>
            <p className="text-blue-700/80 mb-6">
              Your premier partner for professional printing and design
              solutions that make your brand stand out from the competition.
            </p>
            <div className="flex space-x-4 mt-auto">
              <a
                href="#"
                className="h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-colors duration-300"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-colors duration-300"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-colors duration-300"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col">
            <h3 className="text-blue-800 font-bold mb-6 text-lg">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                "Home",
                "Services",
                "Portfolio",
                "About Us",
                "FAQ",
                "Pricing",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-blue-700/80 hover:text-blue-800 transition-colors duration-300 flex items-center"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="flex flex-col">
            <h3 className="text-blue-800 font-bold mb-6 text-lg">
              Our Services
            </h3>
            <ul className="space-y-3">
              {[
                "Offset Printing",
                "Digital Printing",
                "Promotional Items",
                "Outdoor Signage",
                "Indoor Branding",
                "Design Services",
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#"
                    className="text-blue-700/80 hover:text-blue-800 transition-colors duration-300 flex items-center"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2"></span>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="flex flex-col">
            <h3 className="text-blue-800 font-bold mb-6 text-lg">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-blue-600 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                <span className="text-blue-700/80">
                  123 Print Avenue, Design District
                  <br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="text-blue-600 w-5 h-5 mr-3 flex-shrink-0" />
                <span className="text-blue-700/80">(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-blue-600 w-5 h-5 mr-3 flex-shrink-0" />
                <a
                  href="mailto:info@printdesign.com"
                  className="text-blue-700/80 hover:text-blue-800 transition-colors duration-300"
                >
                  info@printdesign.com
                </a>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-white/60 rounded-lg shadow-sm">
              <h4 className="text-blue-800 font-medium mb-2 text-sm">
                Business Hours
              </h4>
              <p className="text-blue-700/80 text-sm">
                Monday - Friday: 9AM - 6PM
                <br />
                Saturday: 10AM - 4PM
                <br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="bg-blue-600/10 p-6 rounded-xl mb-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
            <div className="md:col-span-2">
              <h3 className="text-blue-800 font-bold mb-2 text-lg">
                Stay Updated
              </h3>
              <p className="text-blue-700/80 text-sm">
                Subscribe to our newsletter for the latest printing trends,
                special offers, and exclusive discounts.
              </p>
            </div>
            <div className="md:col-span-3">
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-3 rounded-lg border border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent mb-6"></div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-700/80 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} PrintDesign. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <a
              href="#"
              className="text-blue-700/80 hover:text-blue-900 text-sm transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-blue-700/80 hover:text-blue-900 text-sm transition-colors duration-300"
            >
              Terms of Service
            </a>
            <button
              onClick={scrollToTop}
              className="h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-colors duration-300 shadow-md"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
