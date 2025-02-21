import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Award,
  Clock,
  Users,
  BookOpen,
  Heart,
  Target,
  Sparkles,
  Map,
  ChevronRight,
  ArrowRight,
  Printer,
  Leaf,
  Shield,
  Globe,
  Star,
} from "lucide-react";

// Sample images - replace with your actual imports
const companyImages = {
  founder: "https://via.placeholder.com/600x800",
  team: "https://via.placeholder.com/800x500",
  facility: "https://via.placeholder.com/800x600",
  historyTimeline: "https://via.placeholder.com/900x400",
  craftsman: "https://via.placeholder.com/600x800",
  sustainability: "https://via.placeholder.com/800x500",
};

const AboutUs = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0.6, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.1], [30, 0]);

  // Section visibility hooks
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

  // Animation variants
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

  // Company stats
  const companyStats = [
    { value: "30+", label: "Years of Excellence", icon: <Clock size={24} /> },
    { value: "15,000+", label: "Satisfied Clients", icon: <Users size={24} /> },
    { value: "48", label: "Industry Awards", icon: <Award size={24} /> },
    { value: "100%", label: "Sustainable Materials", icon: <Leaf size={24} /> },
  ];

  // Company values
  const companyValues = [
    {
      title: "Craftsmanship",
      description:
        "We believe in the timeless value of meticulous attention to detail and skilled artistry in everything we produce.",
      icon: <Sparkles size={24} />,
    },
    {
      title: "Integrity",
      description:
        "Transparent practices and honest communication form the foundation of our client relationships and business operations.",
      icon: <Heart size={24} />,
    },
    {
      title: "Innovation",
      description:
        "We continuously explore new techniques and technologies to advance the art and science of premium printing.",
      icon: <Printer size={24} />,
    },
    {
      title: "Sustainability",
      description:
        "Our commitment to environmental responsibility drives us to implement eco-friendly practices throughout our production process.",
      icon: <Leaf size={24} />,
    },
  ];

  // Team leadership
  const leadershipTeam = [
    {
      name: "Eleanor Blackwood",
      title: "Founder & Creative Director",
      bio: "With over 25 years of experience in luxury print design, Eleanor established our company with a vision to combine traditional craftsmanship with innovative technologies.",
      image: "https://via.placeholder.com/400x400",
    },
    {
      name: "Marcus Chen",
      title: "Chief Production Officer",
      bio: "A master printer with background in fine arts, Marcus oversees our production facilities and ensures the highest quality standards across all projects.",
      image: "https://via.placeholder.com/400x400",
    },
    {
      name: "Sophia Hernandez",
      title: "Design Director",
      bio: "Award-winning designer specializing in brand identity, Sophia leads our creative team in developing distinctive visual solutions for our clients.",
      image: "https://via.placeholder.com/400x400",
    },
  ];

  // History milestones
  const historyMilestones = [
    {
      year: "1993",
      title: "Founding Vision",
      description:
        "Established with a commitment to exceptional printing craftsmanship and personalized service.",
    },
    {
      year: "2002",
      title: "Digital Innovation",
      description:
        "Pioneered the integration of traditional printing techniques with emerging digital technologies.",
    },
    {
      year: "2010",
      title: "Sustainability Initiative",
      description:
        "Implemented comprehensive eco-friendly practices and achieved carbon-neutral certification.",
    },
    {
      year: "2015",
      title: "Global Expansion",
      description:
        "Extended our premium printing services internationally while maintaining our artisanal approach.",
    },
    {
      year: "2023",
      title: "Technology Evolution",
      description:
        "Integrated advanced AI color matching and sustainable material innovations into our production process.",
    },
  ];

  // Partners and certifications
  const partnerLogos = [
    "https://via.placeholder.com/200x80",
    "https://via.placeholder.com/200x80",
    "https://via.placeholder.com/200x80",
    "https://via.placeholder.com/200x80",
    "https://via.placeholder.com/200x80",
    "https://via.placeholder.com/200x80",
  ];

  const certifications = [
    {
      name: "FSC Certified",
      logo: "https://via.placeholder.com/100x100",
      description:
        "Forest Stewardship Council certification for responsible forest management.",
    },
    {
      name: "ISO 14001",
      logo: "https://via.placeholder.com/100x100",
      description:
        "International standard for effective environmental management systems.",
    },
    {
      name: "Carbon Neutral",
      logo: "https://via.placeholder.com/100x100",
      description:
        "Certified carbon neutral operations through reduction and offset initiatives.",
    },
    {
      name: "G7 Master Qualification",
      logo: "https://via.placeholder.com/100x100",
      description:
        "Leading industry standard for print color calibration and consistency.",
    },
  ];

  // Client testimonials
  const clientTestimonials = [
    {
      quote:
        "Their attention to detail and commitment to quality transformed our brand materials. The tactile experience of our new catalogs has significantly improved customer engagement.",
      name: "Victoria Manning",
      title: "Creative Director, Luxe Living Interiors",
      image: "https://via.placeholder.com/80x80",
    },
    {
      quote:
        "PrintCraft Premium understood our vision immediately. Their innovative approach to our limited edition packaging created a memorable unboxing experience that our customers rave about.",
      name: "Jonathan Blake",
      title: "CEO, Artisan Chocolatiers",
      image: "https://via.placeholder.com/80x80",
    },
    {
      quote:
        "Working with their team was seamless from concept to delivery. Their sustainable printing options aligned perfectly with our brand values while exceeding our quality expectations.",
      name: "Amara Singh",
      title: "Sustainability Officer, EcoLuxe Cosmetics",
      image: "https://via.placeholder.com/80x80",
    },
  ];

  // Sections refs
  const [storyRef, storyInView] = useInView({ threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ threshold: 0.1 });
  const [valuesRef, valuesInView] = useInView({ threshold: 0.1 });
  const [leadershipRef, leadershipInView] = useInView({ threshold: 0.1 });
  const [historyRef, historyInView] = useInView({ threshold: 0.1 });
  const [craftRef, craftInView] = useInView({ threshold: 0.1 });
  const [sustainabilityRef, sustainabilityInView] = useInView({
    threshold: 0.1,
  });
  const [partnersRef, partnersInView] = useInView({ threshold: 0.1 });
  const [testimonialsRef, testimonialsInView] = useInView({ threshold: 0.1 });
  const [ctaRef, ctaInView] = useInView({ threshold: 0.1 });

  // Our services
  const printingServices = [
    {
      title: "Luxury Packaging",
      description:
        "Elevate your product presentation with custom boxes, sleeves, and inserts featuring premium finishes.",
      icon: <Gift size={24} />,
    },
    {
      title: "Brand Collateral",
      description:
        "From business cards to letterheads, create cohesive brand materials that make a lasting impression.",
      icon: <Briefcase size={24} />,
    },
    {
      title: "Publication Design",
      description:
        "Transform your content into beautiful catalogs, lookbooks, and magazines with expert layout and printing.",
      icon: <BookOpen size={24} />,
    },
    {
      title: "Large Format",
      description:
        "Make a statement with high-quality banners, signage, and display materials for events and retail environments.",
      icon: <Maximize size={24} />,
    },
    {
      title: "Specialty Finishing",
      description:
        "Enhance your print materials with embossing, foil stamping, die-cutting, and custom coatings.",
      icon: <Wand2 size={24} />,
    },
    {
      title: "Art Reproduction",
      description:
        "Preserve the integrity of fine art with museum-quality giclée printing and archival materials.",
      icon: <Palette size={24} />,
    },
  ];

  return (
    <div
      ref={containerRef}
      className="w-full bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Hero Section with Parallax */}
      <div className="relative h-[70vh] bg-indigo-900 overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0 bg-black/50">
          <img
            src={companyImages.facility}
            alt="Our printing facility"
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-40 left-20 w-64 h-64 rounded-full bg-indigo-500/20 blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-center items-center text-center text-white px-4">
          <motion.div style={{ opacity: headerOpacity, y: headerY }}>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-block px-4 py-1 mb-6 text-sm font-medium bg-white/10 backdrop-blur-sm rounded-full"
            >
              Our Legacy of Excellence
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6"
            >
              Crafting Print Excellence <br />
              <span className="text-indigo-300">Since 1993</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-2xl mx-auto text-lg md:text-xl text-gray-200 mb-8"
            >
              We blend timeless craftsmanship with innovative technology to
              create print experiences that elevate brands beyond the ordinary.
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 15L3 8L4.4 6.55L10 12.15L15.6 6.55L17 8L10 15Z"
                fill="white"
              />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Our Story Section */}
      <motion.section
        ref={storyRef}
        initial="hidden"
        animate={storyInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-20 w-11/12 max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeInUp}>
            <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
              Our Story
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              A Dedication to the Art of Print
            </h2>
            <div className="mt-4 w-24 h-1 bg-indigo-600"></div>

            <div className="mt-8 space-y-6 text-gray-700">
              <p className="leading-relaxed">
                Founded in 1993 by Eleanor Blackwood, our company began with a
                singular vision: to create print materials that would stand as
                works of art in their own right. With a background in
                traditional letterpress printing and a passion for design,
                Eleanor established a boutique studio dedicated to craftsmanship
                and attention to detail.
              </p>
              <p className="leading-relaxed">
                What started as a small atelier with a single vintage press has
                evolved into a comprehensive print and design house, blending
                time-honored techniques with cutting-edge technology. Throughout
                this evolution, we have maintained our founding philosophy that
                exceptional printing is not merely about reproduction, but about
                creating tangible expressions of brand identity.
              </p>
              <p className="leading-relaxed">
                Today, we serve clients across industries who share our
                appreciation for quality and craftsmanship. From luxury
                retailers to cultural institutions, we partner with
                organizations that understand the power of premium print
                materials to create meaningful connections with their audiences.
              </p>
            </div>

            <div className="mt-8">
              <a
                href="#leadership"
                className="inline-flex items-center text-indigo-600 font-medium group"
              >
                <span>Meet our leadership team</span>
                <ChevronRight
                  size={16}
                  className="ml-1 group-hover:ml-2 transition-all"
                />
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="relative">
            <div className="absolute inset-0 bg-indigo-100 rounded-3xl transform rotate-3"></div>
            <img
              src={companyImages.founder}
              alt="Company founder"
              className="relative z-10 rounded-3xl shadow-xl w-full h-full object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg z-20">
              <p className="text-gray-800 font-medium italic">
                "We don't just print materials—we craft experiences that engage
                all the senses."
              </p>
              <p className="mt-2 text-indigo-600 font-semibold">
                — Eleanor Blackwood, Founder
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Company Stats Section */}
      <motion.section
        ref={statsRef}
        initial="hidden"
        animate={statsInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-16 bg-indigo-900 text-white"
      >
        <div className="w-11/12 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyStats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex flex-col items-center text-center p-8"
              >
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
                <p className="text-indigo-200">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Our Values Section */}
      <motion.section
        ref={valuesRef}
        initial="hidden"
        animate={valuesInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-20 w-11/12 max-w-6xl mx-auto"
      >
        <div className="text-center mb-16">
          <motion.span
            variants={fadeInUp}
            className="text-sm font-semibold text-indigo-600 uppercase tracking-wider"
          >
            Our Philosophy
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="mt-2 text-3xl md:text-4xl font-bold text-gray-900"
          >
            Guiding Principles
          </motion.h2>
          <motion.div
            variants={fadeInUp}
            className="mt-4 w-24 h-1 bg-indigo-600 mx-auto"
          ></motion.div>
          <motion.p
            variants={fadeInUp}
            className="mt-6 text-gray-600 max-w-3xl mx-auto"
          >
            These core values inform every decision we make and guide our
            approach to client partnerships, design solutions, and print
            production.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {companyValues.map((value, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white p-8 rounded-xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <div className="text-indigo-600">{value.icon}</div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Our Services Section */}
      <motion.section
        id="services"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
        className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50"
      >
        <div className="w-11/12 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              variants={fadeInUp}
              className="text-sm font-semibold text-indigo-600 uppercase tracking-wider"
            >
              What We Offer
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="mt-2 text-3xl md:text-4xl font-bold text-gray-900"
            >
              Premium Print Services
            </motion.h2>
            <motion.div
              variants={fadeInUp}
              className="mt-4 w-24 h-1 bg-indigo-600 mx-auto"
            ></motion.div>
            <motion.p
              variants={fadeInUp}
              className="mt-6 text-gray-600 max-w-3xl mx-auto"
            >
              We offer comprehensive print solutions tailored to elevate your
              brand through exceptional quality and innovative techniques.
            </motion.p>
          </div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {printingServices.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  <div className="text-indigo-600 group-hover:text-white transition-all duration-300">
                    {service.icon}
                  </div>
                </div>
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
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-12 text-center">
            <a
              href="/services"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all duration-200"
            >
              <span>View our full service catalog</span>
              <ArrowRight size={16} className="ml-2" />
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Leadership Team Section */}
      <motion.section
        id="leadership"
        ref={leadershipRef}
        initial="hidden"
        animate={leadershipInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-20 bg-gray-50"
      >
        <div className="w-11/12 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              variants={fadeInUp}
              className="text-sm font-semibold text-indigo-600 uppercase tracking-wider"
            >
              Our Team
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="mt-2 text-3xl md:text-4xl font-bold text-gray-900"
            >
              Visionary Leadership
            </motion.h2>
            <motion.div
              variants={fadeInUp}
              className="mt-4 w-24 h-1 bg-indigo-600 mx-auto"
            ></motion.div>
            <motion.p
              variants={fadeInUp}
              className="mt-6 text-gray-600 max-w-3xl mx-auto"
            >
              Our executive team brings together decades of experience in print
              production, design, and business leadership.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadershipTeam.map((leader, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-xl overflow-hidden shadow-lg group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800">
                    {leader.name}
                  </h3>
                  <p className="text-indigo-600 mb-4">{leader.title}</p>
                  <p className="text-gray-600">{leader.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeInUp} className="mt-16 text-center">
            <p className="text-gray-600 mb-6">
              Our talented team extends beyond our leadership to include master
              printers, skilled designers, material specialists, and dedicated
              client managers.
            </p>
            <img
              src={companyImages.team}
              alt="Our team"
              className="w-full rounded-xl shadow-xl"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Our History Section */}
      <motion.section
        ref={historyRef}
        initial="hidden"
        animate={historyInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-20 w-11/12 max-w-6xl mx-auto"
      >
        <div className="text-center mb-16">
          <motion.span
            variants={fadeInUp}
            className="text-sm font-semibold text-indigo-600 uppercase tracking-wider"
          >
            Our Journey
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="mt-2 text-3xl md:text-4xl font-bold text-gray-900"
          >
            Three Decades of Excellence
          </motion.h2>
          <motion.div
            variants={fadeInUp}
            className="mt-4 w-24 h-1 bg-indigo-600 mx-auto"
          ></motion.div>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-indigo-200 transform -translate-x-1/2 hidden md:block"></div>

          {/* Timeline events */}
          {historyMilestones.map((milestone, index) => (
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
                  <span className="inline-block px-3 py-1 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-full mb-4">
                    {milestone.year}
                  </span>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
              <div className="hidden md:flex md:w-1/2 items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-indigo-600 z-10"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Craftsmanship Section */}
      <motion.section
        ref={craftRef}
        initial="hidden"
        animate={craftInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-20 bg-gray-900 text-white"
      >
        <div className="w-11/12 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeInUp} className="order-2 lg:order-1">
              <img
                src={companyImages.craftsman}
                alt="Master craftsman at work"
                className="rounded-3xl shadow-2xl"
              />
            </motion.div>

            <motion.div variants={fadeInUp} className="order-1 lg:order-2">
              <span className="text-sm font-semibold text-indigo-300 uppercase tracking-wider">
                Our Expertise
              </span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold leading-tight mb-6">
                The Art of Print Craftsmanship
              </h2>

              <div className="space-y-6">
                <p className="leading-relaxed text-gray-300">
                  At the heart of our approach is a deep appreciation for the
                  craft of printing. Our team includes master printers who have
                  honed their skills over decades, combining traditional
                  techniques with modern innovation.
                </p>

                {/* <div className="space-y-4">
                  {[
                    "Custom color matching with proprietary technology",
                    "Hand-finished details including embossing and foil stamping",
                    "Specialized paper selection from sustainable sources",
                    "Quality control at every stage of production"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center mt-1 mr-3">
                        <svg className="w-4 h-4 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-300">{item}</p>
                    </div>
                  ))}
                </div> */}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Sustainability Section */}
      <motion.section
        ref={sustainabilityRef}
        initial="hidden"
        animate={sustainabilityInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-20 bg-gradient-to-br from-indigo-50 to-white"
      >
        <div className="w-11/12 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              variants={fadeInUp}
              className="text-sm font-semibold text-indigo-600 uppercase tracking-wider"
            >
              Our Commitment
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="mt-2 text-3xl md:text-4xl font-bold text-gray-900"
            >
              Sustainable Printing Practices
            </motion.h2>
            <motion.div
              variants={fadeInUp}
              className="mt-4 w-24 h-1 bg-indigo-600 mx-auto"
            ></motion.div>
            <motion.p
              variants={fadeInUp}
              className="mt-6 text-gray-600 max-w-3xl mx-auto"
            >
              We are dedicated to minimizing our environmental impact through
              innovative practices and responsible material sourcing.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Eco-Friendly Materials",
                description:
                  "We use FSC-certified papers and vegetable-based inks to ensure our materials are sustainable and non-toxic.",
                icon: <Leaf size={24} />,
              },
              {
                title: "Energy Efficiency",
                description:
                  "Our facilities are powered by renewable energy, and we continuously optimize our processes to reduce energy consumption.",
                icon: <Globe size={24} />,
              },
              {
                title: "Waste Reduction",
                description:
                  "Through precise planning and recycling initiatives, we minimize waste at every stage of production.",
                icon: <Shield size={24} />,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white p-8 rounded-xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                  <div className="text-indigo-600">{item.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeInUp} className="mt-16 text-center">
            <img
              src={companyImages.sustainability}
              alt="Sustainability efforts"
              className="w-full rounded-xl shadow-xl"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Partners and Certifications Section */}
      <motion.section
        ref={partnersRef}
        initial="hidden"
        animate={partnersInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-20 bg-gray-50"
      >
        <div className="w-11/12 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              variants={fadeInUp}
              className="text-sm font-semibold text-indigo-600 uppercase tracking-wider"
            >
              Our Network
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="mt-2 text-3xl md:text-4xl font-bold text-gray-900"
            >
              Trusted Partners and Certifications
            </motion.h2>
            <motion.div
              variants={fadeInUp}
              className="mt-4 w-24 h-1 bg-indigo-600 mx-auto"
            ></motion.div>
            <motion.p
              variants={fadeInUp}
              className="mt-6 text-gray-600 max-w-3xl mx-auto"
            >
              We collaborate with industry leaders and maintain the highest
              standards of quality and sustainability.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {partnerLogos.map((logo, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex items-center justify-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <img src={logo} alt="Partner logo" className="w-full h-auto" />
              </motion.div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white p-8 rounded-xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={cert.logo}
                  alt={cert.name}
                  className="w-16 h-16 mb-6"
                />
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {cert.name}
                </h3>
                <p className="text-gray-600">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        ref={testimonialsRef}
        initial="hidden"
        animate={testimonialsInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-20 bg-indigo-900 text-white"
      >
        <div className="w-11/12 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              variants={fadeInUp}
              className="text-sm font-semibold text-indigo-300 uppercase tracking-wider"
            >
              Client Voices
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="mt-2 text-3xl md:text-4xl font-bold"
            >
              What Our Clients Say
            </motion.h2>
            <motion.div
              variants={fadeInUp}
              className="mt-4 w-24 h-1 bg-indigo-300 mx-auto"
            ></motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {clientTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white/10 p-8 rounded-xl backdrop-blur-sm"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-bold">{testimonial.name}</h3>
                    <p className="text-indigo-200">{testimonial.title}</p>
                  </div>
                </div>
                <p className="text-gray-200 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        ref={ctaRef}
        initial="hidden"
        animate={ctaInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-20 bg-gradient-to-br from-indigo-600 to-purple-600 text-white"
      >
        <div className="w-11/12 max-w-6xl mx-auto text-center">
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Ready to Elevate Your Brand?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg mb-8 max-w-2xl mx-auto"
          >
            Let's create something extraordinary together. Contact us today to
            discuss your next project.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-all duration-200"
            >
              <span>Get in Touch</span>
              <ArrowRight size={20} className="ml-2" />
            </a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutUs;
