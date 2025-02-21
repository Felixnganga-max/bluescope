import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronRight, Zap, Award, Target } from "lucide-react";
import images from "../assets/assets.js";

const BusinessShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    } else if (!isInView && hasAnimated) {
      setHasAnimated(false);
    }
  }, [isInView, hasAnimated]);

  const services = [
    {
      title: "Offset & Digital Printing",
      icon: <Zap className="text-blue-500 w-5 h-5" />,
      description: "High-quality print solutions for any project size",
    },
    {
      title: "Promotional Items",
      icon: <Award className="text-blue-500 w-5 h-5" />,
      description: "Custom merchandise that amplifies your brand message",
    },
    {
      title: "Outdoor & Indoor Branding",
      icon: <Target className="text-blue-500 w-5 h-5" />,
      description: "Eye-catching signage that makes a lasting impression",
    },
  ];

  return (
    <section
      ref={ref}
      className="w-full bg-gradient-to-br from-blue-50 via-white to-blue-100 py-20 overflow-hidden relative"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-blue-200/30 blur-3xl"
          animate={
            isInView
              ? {
                  scale: [1, 1.2, 1],
                  x: [0, 20, 0],
                  y: [0, -20, 0],
                }
              : {}
          }
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-purple-200/20 blur-3xl"
          animate={
            isInView
              ? {
                  scale: [1, 1.1, 1],
                  x: [0, -10, 0],
                  y: [0, 10, 0],
                }
              : {}
          }
          transition={{ duration: 18, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center relative z-10">
        {/* Left side content */}
        <motion.div
          className="md:w-1/2 mb-12 md:mb-0 pr-0 md:pr-12"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
              Premium Printing Services
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-800 leading-tight">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Does your brand need
            </motion.span>
            <motion.span
              className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              more visibility?
            </motion.span>
          </h2>

          <motion.p
            className="text-gray-600 mb-10 text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            We help businesses stand out in today's competitive market with
            premium quality print and design solutions that capture attention
            and create lasting impressions.
          </motion.p>

          <div className="flex flex-col space-y-6 mb-10">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: -30 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
                }
                transition={{ duration: 0.5, delay: 0.7 + index * 0.2 }}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 mr-4 mt-1">
                  {service.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          >
            <motion.button
              className="flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              Get a Quote
              <ChevronRight className="ml-2 h-5 w-5" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right side image */}
        <motion.div
          className="md:w-1/2 relative h-96 md:h-120 w-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          <div className="absolute inset-0 rounded-xl shadow-2xl overflow-hidden bg-gradient-to-r from-blue-150 to-purple-100">
            {/* Main image container with parallax effect */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center overflow-hidden"
              animate={isInView ? { y: [-5, 5, -5] } : {}}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <img
                src={images.showcase}
                alt="Brand visibility showcase"
                className="object-cover w-full h-full rounded"
              />

              {/* Animated overlay elements */}
              <motion.div
                className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-blue-500/10 to-transparent"
                animate={isInView ? { opacity: [0.2, 0.4, 0.2] } : {}}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />

              {/* Floating design elements */}
              <motion.div
                className="absolute top-6 right-6 w-20 h-20 rounded-full border-4 border-white opacity-60"
                animate={
                  isInView
                    ? {
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                      }
                    : {}
                }
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <motion.div
                className="absolute bottom-10 left-10 w-16 h-16 bg-blue-300/30 backdrop-blur-sm rounded-lg"
                animate={
                  isInView
                    ? {
                        y: [0, -15, 0],
                        rotate: [0, 15, 0],
                      }
                    : {}
                }
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />

              {/* New design elements */}
              <motion.div
                className="absolute top-1/4 left-6 w-4 h-20 bg-gradient-to-b from-yellow-300/40 to-orange-300/40 rounded-full"
                animate={
                  isInView
                    ? {
                        height: [20, 40, 20],
                        y: [0, 10, 0],
                      }
                    : {}
                }
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <motion.div
                className="absolute bottom-1/4 right-8 w-12 h-12 bg-gradient-to-r from-green-300/30 to-blue-300/30 rounded-md rotate-45"
                animate={
                  isInView
                    ? {
                        rotate: [45, 90, 45],
                        scale: [1, 1.1, 1],
                      }
                    : {}
                }
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </motion.div>
          </div>

          {/* Decorative dots pattern */}
          <div className="absolute -right-6 -bottom-6 w-24 h-24 grid grid-cols-3 grid-rows-3 gap-2">
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-blue-400"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.6 } : { opacity: 0 }}
                transition={{ delay: 1 + i * 0.1, duration: 0.4 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BusinessShowcase;
