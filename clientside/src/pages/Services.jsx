import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import images from "../assets/assets";
import Display from "../components/Display";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  ChevronRight,
  Bookmark,
  Clock,
  ArrowUpRight,
} from "lucide-react";

// Intersection Observer hook
const useInView = (options) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = React.useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isInView];
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Services = () => {
  const navigate = useNavigate();
  const [heroRef, heroInView] = useInView({ threshold: 0.1 });
  const [mainServicesRef, mainServicesInView] = useInView({ threshold: 0.1 });
  const [additionalServicesRef, additionalServicesInView] = useInView({
    threshold: 0.1,
  });
  const [ctaRef, ctaInView] = useInView({ threshold: 0.1 });

  // Main services with enhanced descriptions
  const mainServices = [
    {
      title: "Offset & Digital Printing",
      description:
        "Exquisite print solutions with meticulous attention to detail, delivering unparalleled color fidelity and texture for discerning brands.",
      image: images.billboard,
      icon: <Clock className="text-indigo-500" size={24} />,
      feature: "Ultra-precise color matching",
    },
    {
      title: "Promotional Items",
      description:
        "Bespoke branded merchandise crafted with premium materials that elevate your corporate identity and create meaningful connections.",
      image: images.promo,
      icon: <Award className="text-indigo-500" size={24} />,
      feature: "Artisanal quality control",
    },
    {
      title: "Outdoor & Indoor Branding",
      description:
        "Sophisticated environmental graphics that transform spaces into immersive brand experiences, designed with architectural sensibility.",
      image: images.sign,
      icon: <Bookmark className="text-indigo-500" size={24} />,
      feature: "Weather-resistant finishes",
    },
  ];

  // Additional services with categorization
  const additionalServices = [
    {
      title: "Business Cards",
      description:
        "Luxurious card stock with embossing, foil stamping, and edge painting options.",
      category: "Corporate Identity",
    },
    {
      title: "Flyers & Brochures",
      description:
        "Premium paper selections with sophisticated folding and binding techniques.",
      category: "Marketing Collateral",
    },
    {
      title: "Posters & Banners",
      description:
        "Large format printing with archival inks and specialized substrates.",
      category: "Event & Exhibition",
    },
    {
      title: "Branded Packaging",
      description:
        "Custom packaging solutions with eco-friendly materials and intricate detailing.",
      category: "Retail Solutions",
    },
    {
      title: "Vehicle Wraps",
      description:
        "Precision vehicle graphics using high-performance vinyls and installation expertise.",
      category: "Mobile Advertising",
    },
    {
      title: "Stickers & Labels",
      description:
        "Custom die-cut adhesives with specialized finishes and durability treatments.",
      category: "Product Identification",
    },
    {
      title: "Corporate Stationery",
      description:
        "Cohesive letterhead, envelopes, and notecards with refined typography and watermarks.",
      category: "Corporate Identity",
    },
    {
      title: "Wedding & Event Invitations",
      description:
        "Bespoke invitation suites with handmade papers, calligraphy, and wax seals.",
      category: "Social Stationery",
    },
    {
      title: "Custom Apparel Printing",
      description:
        "Premium garment decoration with direct-to-garment printing and embroidery options.",
      category: "Promotional Wear",
    },
  ];

  const testimonials = [
    {
      quote:
        "The attention to detail in our rebranding materials exceeded our expectations. Truly exceptional craftsmanship.",
      author: "Alexandra Reynolds",
      position: "Creative Director, Lumiere Brands",
    },
    {
      quote:
        "Their printing expertise transformed our annual report into a piece of art that impressed our stakeholders.",
      author: "Jonathan Mercer",
      position: "CEO, Altitude Ventures",
    },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with Parallax Effect */}
      <motion.div
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="relative py-20 lg:py-28 overflow-hidden"
      >
        <div className="absolute inset-0 bg-indigo-900 opacity-5 pattern-diagonal-lines pattern-white pattern-bg-white pattern-size-4 pattern-opacity-20"></div>
        <div className="relative w-11/12 max-w-6xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block px-4 py-1 mb-6 text-sm font-medium text-indigo-800 bg-indigo-100 rounded-full"
          >
            Premium Printing Excellence
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight"
          >
            Elevate Your Brand with <br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Distinctive Printing
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
          >
            We craft exceptional print solutions that communicate refinement,
            authority, and attention to detail—transforming your brand presence
            with sophisticated visual storytelling.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              className="px-8 py-4 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transform hover:translate-y-[-2px] transition duration-300 flex items-center"
              onClick={() => navigate("/contact")}
            >
              <span>Schedule Consultation</span>
              <ArrowRight className="ml-2" size={18} />
            </button>
            <button
              className="px-8 py-4 bg-white text-indigo-600 border border-indigo-200 rounded-lg shadow-sm hover:bg-indigo-50 transform hover:translate-y-[-2px] transition duration-300"
              onClick={() => navigate("/portfolio")}
            >
              <span>View Portfolio</span>
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Trust Indicators */}
      <div className="bg-gray-50 py-8 border-y border-gray-200">
        <div className="w-11/12 max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {[
              "Certified Sustainable",
              "30+ Years Experience",
              "Award-Winning Design",
              "99% On-Time Delivery",
            ].map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-indigo-500 mr-3"></div>
                <span className="text-gray-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Services Section with Elegant Cards */}
      <motion.div
        ref={mainServicesRef}
        initial="hidden"
        animate={mainServicesInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-20 w-11/12 max-w-6xl mx-auto"
      >
        <div className="text-center mb-16">
          <motion.span
            variants={fadeInUp}
            className="text-sm font-semibold text-indigo-600 uppercase tracking-wider"
          >
            Our Expertise
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="mt-2 text-3xl md:text-4xl font-bold text-gray-900"
          >
            Signature Print Solutions
          </motion.h2>
          <motion.div
            variants={fadeInUp}
            className="mt-4 w-24 h-1 bg-indigo-600 mx-auto"
          ></motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {mainServices.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="group relative overflow-hidden bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/0 to-indigo-900/90 z-10 opacity-60 group-hover:opacity-70 transition-opacity duration-500"></div>

              <div className="relative h-60 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center mb-3">
                  {service.icon}
                  <span className="ml-2 text-white text-sm font-medium">
                    {service.feature}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-white/90 leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {service.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-white font-medium group"
                >
                  <span className="group-hover:mr-2 transition-all duration-300">
                    Explore Service
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="opacity-0 group-hover:opacity-100 transform -translate-x-3 group-hover:translate-x-0 transition-all duration-300"
                  />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Client Work Display */}
      <div className="w-full py-8">
        <Display />
      </div>

      {/* Testimonial Section */}
      <div className="bg-indigo-50 py-16">
        <div className="w-11/12 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-md"
              >
                <svg
                  className="text-indigo-400 w-10 h-10 mb-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-gray-700 italic mb-6">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-indigo-600 font-bold">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-500">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Services with Category Grouping */}
      <motion.div
        ref={additionalServicesRef}
        initial="hidden"
        animate={additionalServicesInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-20 w-11/12 max-w-6xl mx-auto"
      >
        <div className="text-center mb-16">
          <motion.span
            variants={fadeInUp}
            className="text-sm font-semibold text-indigo-600 uppercase tracking-wider"
          >
            Comprehensive Offerings
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="mt-2 text-3xl md:text-4xl font-bold text-gray-900"
          >
            Specialty Printing Services
          </motion.h2>
          <motion.div
            variants={fadeInUp}
            className="mt-4 w-24 h-1 bg-indigo-600 mx-auto"
          ></motion.div>
          <motion.p
            variants={fadeInUp}
            className="mt-6 text-gray-600 max-w-3xl mx-auto"
          >
            Discover our full range of premium printing and design solutions,
            each crafted with meticulous attention to detail and uncompromising
            quality.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {additionalServices.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span className="inline-block px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full mb-4">
                {service.category}
              </span>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <a
                href="#"
                className="inline-flex items-center text-indigo-600 font-medium group"
              >
                <span>Learn more</span>
                <ChevronRight
                  size={16}
                  className="ml-1 group-hover:ml-2 transition-all"
                />
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Process Section */}
      <div className="bg-gray-50 py-20">
        <div className="w-11/12 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
              Our Approach
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
              The Production Journey
            </h2>
            <div className="mt-4 w-24 h-1 bg-indigo-600 mx-auto"></div>
          </div>

          <div className="relative">
            {/* Line connecting steps */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-indigo-200 transform -translate-x-1/2 hidden md:block"></div>

            {/* Steps */}
            {[
              {
                title: "Consultation",
                description:
                  "In-depth discussion to understand your brand vision and objectives",
              },
              {
                title: "Creative Design",
                description:
                  "Expert design tailored to communicate your unique value proposition",
              },
              {
                title: "Premium Production",
                description:
                  "Meticulous printing using state-of-the-art technology and fine materials",
              },
              {
                title: "Quality Assurance",
                description:
                  "Rigorous inspection ensuring every detail meets our exacting standards",
              },
              {
                title: "Timely Delivery",
                description:
                  "White-glove service ensuring your materials arrive pristine and on schedule",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row items-center mb-12 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`md:w-1/2 flex ${
                    index % 2 === 0
                      ? "md:justify-end md:pr-12"
                      : "md:justify-start md:pl-12"
                  }`}
                >
                  <div className="bg-white p-6 rounded-xl shadow-lg max-w-md">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                      <span className="text-indigo-600 font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
                <div className="hidden md:flex md:w-1/2 items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-indigo-600 z-10"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action with Parallax Background */}
      <motion.div
        ref={ctaRef}
        initial="hidden"
        animate={ctaInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="relative py-20 lg:py-28 bg-indigo-900 overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-500 rounded-full opacity-10"></div>
          <div className="absolute top-20 right-10 w-60 h-60 bg-purple-500 rounded-full opacity-10"></div>
          <div className="absolute bottom-10 left-1/3 w-20 h-20 bg-indigo-300 rounded-full opacity-10"></div>
        </div>

        <div className="relative w-11/12 max-w-4xl mx-auto text-center text-white">
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
          >
            Ready to Transform Your Brand Presence?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-6 text-lg md:text-xl text-indigo-100 max-w-3xl mx-auto"
          >
            Schedule a personalized consultation with our design specialists to
            explore how our premium printing solutions can elevate your brand
            image.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              className="px-8 py-4 bg-white text-indigo-900 rounded-lg shadow-lg hover:bg-gray-100 transform hover:translate-y-[-2px] transition duration-300 flex items-center"
              onClick={() => navigate("/contact")}
            >
              <span className="font-medium">Schedule Your Consultation</span>
              <ArrowRight className="ml-2" size={18} />
            </button>
            <button
              className="px-8 py-4 bg-transparent text-white border border-white/30 rounded-lg hover:bg-white/10 transform hover:translate-y-[-2px] transition duration-300"
              onClick={() => navigate("/sample-kit")}
            >
              <span>Request Sample Kit</span>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Services;
