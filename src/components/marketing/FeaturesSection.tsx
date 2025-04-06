
import { LucideIcon, Puzzle, Workflow, Zap, Shield } from "lucide-react";
import { motion } from "framer-motion";

interface FeatureProps {
  title: string;
  description: string;
  icon: LucideIcon;
  delay: number;
}

function Feature({ icon: Icon, title, description, delay }: FeatureProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-300"
    >
      <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
        <Icon className="h-7 w-7 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </motion.div>
  );
}

export function FeaturesSection() {
  const features = [
    {
      title: "Seamless Integrations",
      description: "Effortlessly connect your favorite tools like Canvas, Slack, and Google Drive to streamline your workflow.",
      icon: Puzzle,
      delay: 0.1
    },
    {
      title: "Visual Workflow Builder",
      description: "Design custom learning pathways with our intuitive drag-and-drop interface, no coding required.",
      icon: Workflow,
      delay: 0.2
    },
    {
      title: "Real-Time Event Processing",
      description: "Ensure timely interactions with learners through our event-driven architecture.",
      icon: Zap,
      delay: 0.3
    },
    {
      title: "Scalable & Secure",
      description: "Built on robust serverless technologies, our platform grows with you while keeping data safe.",
      icon: Shield,
      delay: 0.4
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Why Choose Our Integration Platform?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Unlock the full potential of your educational content with powerful tools designed for modern learning
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-semibold mb-8">Supported Integrations</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {["Canvas", "Blackboard", "Moodle", "Google Classroom", "Slack", "Microsoft Teams", 
              "Zoom", "Google Calendar", "Kahoot", "Stripe", "Google Drive", "Notion"].map((item) => (
              <div key={item} className="bg-white py-2 px-4 rounded-full shadow-sm border border-gray-100">
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
