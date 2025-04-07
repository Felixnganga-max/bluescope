import React, { useEffect, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Printer,
  Package,
  Calendar,
  Award,
  Users,
  Star,
  Bookmark,
  Layers,
  Image,
  FileText,
  PenTool,
} from "lucide-react";

export default function AboutUs() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation for the stars
  const StarField = () => {
    const stars = Array(50)
      .fill(0)
      .map((_, i) => {
        const size = Math.random() * 4 + 1;
        const speed = Math.random() * 50 + 10;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 20;

        return (
          <div
            key={i}
            className="absolute rounded-full bg-blue-400"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              top: `${top}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkle ${speed}s ease-in-out infinite`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      });

    return <div className="absolute inset-0 overflow-hidden">{stars}</div>;
  };

  // Printing element animation component
  const PrintingElements = () => {
    const elements = [
      { icon: <Printer size={24} />, delay: 0 },
      { icon: <FileText size={24} />, delay: 2 },
      { icon: <PenTool size={24} />, delay: 4 },
      { icon: <Image size={24} />, delay: 6 },
      { icon: <Layers size={24} />, delay: 8 },
    ];

    return (
      <div className="absolute -top-20 -left-20 w-40 h-40">
        {elements.map((el, i) => (
          <div
            key={i}
            className="absolute text-blue-400 opacity-20"
            style={{
              animation: `float 10s ease-in-out infinite, rotate 20s linear infinite`,
              animationDelay: `${el.delay}s`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            {el.icon}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="mt-20 bg-gray-900 text-gray-200 min-h-screen relative overflow-hidden">
      <style jsx global>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.1;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        .printing-element {
          animation: float 8s infinite ease-in-out;
        }
      `}</style>

      {/* Background stars */}
      <div className="fixed inset-0 bg-gray-900">
        <StarField />
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-blue-900 to-gray-900 text-white py-20 overflow-hidden">
        <PrintingElements />
        <div className="container mx-auto px-4 relative z-10">
          <div className="animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-blue-300">
              About Bluescope
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl">
              Your trusted printing partner in Nairobi since 2017, delivering
              quality print solutions with unmatched expertise and care.
            </p>
          </div>

          {/* Rotating star */}
          <div
            className="absolute top-10 right-10 text-blue-400 opacity-60"
            style={{ animation: "rotate 20s linear infinite" }}
          >
            <Star size={40} />
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto px-4 py-16 relative">
        <div
          className="absolute -left-8 -bottom-8 text-blue-500 opacity-20"
          style={{ animation: "rotate 30s linear infinite" }}
        >
          <Star size={80} />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 relative">
            <div className="bg-gray-800 h-96 rounded-lg overflow-hidden shadow-lg relative">
              <img
                src="https://cdnjs.cloudflare.com/ajax/libs/simple-icons/4.25.0/simpleicons.svg"
                alt="Printing press illustration"
                className="w-full h-full object-cover opacity-20 absolute"
              />
              <img
                src="/api/placeholder/600/400"
                alt="Bluescope printing facility"
                className="rounded-lg shadow-xl relative z-10"
              />

              {/* Printing elements overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Printer size={120} className="text-blue-400 opacity-10" />
              </div>
            </div>
          </div>

          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-blue-300 mb-6">Our Story</h2>
            <div className="flex items-start gap-3 mb-6 hover:bg-gray-800 p-4 rounded-lg transition-all duration-300">
              <Calendar className="text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-xl text-blue-200">
                  Founded in 2017
                </h3>
                <p className="text-gray-300">
                  Bluescope started with a simple mission: to provide
                  high-quality printing services to businesses and individuals
                  in Nairobi and beyond. What began as a small shop has grown
                  into a comprehensive printing solutions provider.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 mb-6 hover:bg-gray-800 p-4 rounded-lg transition-all duration-300">
              <Award className="text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-xl text-blue-200">
                  Excellence in Every Print
                </h3>
                <p className="text-gray-300">
                  Our dedication to precision and quality has earned us the
                  trust of hundreds of clients. We've built our reputation on
                  attention to detail and consistent delivery of exceptional
                  products.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 hover:bg-gray-800 p-4 rounded-lg transition-all duration-300">
              <Users className="text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-xl text-blue-200">
                  Customer-Centric Approach
                </h3>
                <p className="text-gray-300">
                  We believe in building lasting relationships with our clients
                  through personalized service and understanding their unique
                  needs. Your vision is our priority.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-gray-800 py-16 relative">
        <div className="absolute right-0 top-0 w-40 h-40">
          <div
            className="absolute right-20 top-10 text-blue-500 opacity-20"
            style={{ animation: "rotate 25s linear infinite" }}
          >
            <Star size={60} />
          </div>
        </div>

        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-300 mb-12 text-center">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Printer size={40} />,
                title: "Stationery Printing",
                desc: "Business cards, letterheads, envelopes, and all your essential office supplies printed with precision and professional finish.",
              },
              {
                icon: <Package size={40} />,
                title: "Packaging Solutions",
                desc: "Custom branded bags, boxes, and packaging materials designed to make your products stand out and enhance your brand image.",
              },
              {
                icon: <Image size={40} />,
                title: "Marketing Materials",
                desc: "Brochures, flyers, banners, and promotional materials that effectively communicate your message and drive your business forward.",
              },
              {
                icon: <FileText size={40} />,
                title: "Document Printing",
                desc: "High-quality document printing services for reports, manuals, booklets and presentations with various binding options.",
              },
              {
                icon: <Layers size={40} />,
                title: "Large Format Printing",
                desc: "Stunning banners, posters, signs, and displays that make a big impact for your events and promotions.",
              },
              {
                icon: <PenTool size={40} />,
                title: "Design Services",
                desc: "Professional graphic design solutions to help you create beautiful and effective printed materials.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-gray-900 p-8 rounded-lg shadow-xl hover:shadow-blue-900/20 hover:bg-gray-800 transition-all duration-300 border border-blue-900/20"
                style={{
                  animation: "fadeIn 0.5s ease-out forwards",
                  animationDelay: `${0.1 * index}s`,
                }}
              >
                <div className="text-blue-400 mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-blue-200">
                  {service.title}
                </h3>
                <p className="text-gray-300">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="container mx-auto px-4 py-16 relative">
        <div
          className="absolute left-10 top-10 text-blue-500 opacity-20"
          style={{ animation: "rotate 20s linear infinite" }}
        >
          <Star size={50} />
        </div>

        <h2 className="text-3xl font-bold text-blue-300 mb-12 text-center">
          Why Choose Bluescope
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Award />,
              title: "Quality Assurance",
              desc: "Every project undergoes rigorous quality checks to ensure perfection.",
            },
            {
              icon: <Calendar />,
              title: "Timely Delivery",
              desc: "We value your time and consistently meet deadlines without compromising quality.",
            },
            {
              icon: <Package />,
              title: "Custom Solutions",
              desc: "Tailored printing services to meet your specific requirements and vision.",
            },
            {
              icon: <Users />,
              title: "Exceptional Support",
              desc: "Our team is always ready to assist and guide you through the printing process.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="text-center p-8 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300"
              style={{
                animation: "fadeIn 0.5s ease-out forwards",
                animationDelay: `${0.1 * index}s`,
              }}
            >
              <div className="bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-blue-400">
                <div className="text-blue-300">{item.icon}</div>
              </div>
              <h3 className="font-bold text-lg mb-2 text-blue-200">
                {item.title}
              </h3>
              <p className="text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-t from-blue-900 to-gray-900 py-16 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -right-10 top-10 text-blue-500 opacity-20"
            style={{ animation: "rotate 30s linear infinite" }}
          >
            <Star size={70} />
          </div>
          <div
            className="absolute left-10 bottom-10 text-blue-500 opacity-20"
            style={{ animation: "rotate 20s linear infinite reverse" }}
          >
            <Star size={40} />
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold mb-12 text-center text-blue-200">
            Contact Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center bg-gray-800 p-8 rounded-lg hover:bg-gray-700 transition-all duration-300">
              <Phone size={32} className="mb-4 text-blue-400" />
              <h3 className="text-xl font-bold mb-3 text-blue-200">
                Phone Numbers
              </h3>
              <p className="text-center">+254 726 705 694</p>
              <p className="text-center">+254 732 917 203</p>
              <p className="text-center">+254 714 952 506</p>
            </div>
            <div className="flex flex-col items-center bg-gray-800 p-8 rounded-lg hover:bg-gray-700 transition-all duration-300">
              <Mail size={32} className="mb-4 text-blue-400" />
              <h3 className="text-xl font-bold mb-3 text-blue-200">Email</h3>
              <p className="text-center">info@bluescope.co.ke</p>
              <p className="text-center">sales@bluescope.co.ke</p>
              <p className="text-center">support@bluescope.co.ke</p>
            </div>
            <div className="flex flex-col items-center bg-gray-800 p-8 rounded-lg hover:bg-gray-700 transition-all duration-300">
              <MapPin size={32} className="mb-4 text-blue-400" />
              <h3 className="text-xl font-bold mb-3 text-blue-200">Location</h3>
              <p className="text-center">Nairobi, Kenya</p>
              <p className="text-center">Ngara</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-gray-400 py-8 border-t border-blue-900/20">
        <div className="container mx-auto px-4 text-center">
          <p>
            © {new Date().getFullYear()} Bluescope Printing Solutions. All
            rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
