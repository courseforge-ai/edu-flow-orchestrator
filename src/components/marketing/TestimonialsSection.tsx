
import { motion } from "framer-motion";
import { QuoteIcon } from "lucide-react";

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
  delay: number;
}

function Testimonial({ quote, author, role, avatar, delay }: TestimonialProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
    >
      <div className="mb-6">
        <QuoteIcon className="h-8 w-8 text-primary/30" />
      </div>
      <p className="text-lg text-gray-700 mb-6">{quote}</p>
      <div className="flex items-center">
        <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden mr-4">
          {avatar ? (
            <img src={avatar} alt={author} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold text-lg">
              {author.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h4 className="font-semibold">{author}</h4>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "This platform transformed how I deliver content, making my courses more interactive and connected. My students are more engaged than ever.",
      author: "Jane D.",
      role: "Course Creator",
      delay: 0.1
    },
    {
      quote: "Integrating various tools was a breeze, allowing me to focus on teaching rather than tech. The workflow builder is incredibly intuitive.",
      author: "Mark S.",
      role: "Educator",
      delay: 0.2
    },
    {
      quote: "The real-time events feature has revolutionized how I interact with students. I can respond promptly and keep everyone on track.",
      author: "Sarah L.",
      role: "Online Instructor",
      delay: 0.3
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            What Educators Are Saying
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Discover how instructors are transforming their teaching with our platform
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
