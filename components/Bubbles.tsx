import { motion } from "framer-motion";

const Bubble = ({ size, left, delay }: { size: number; left: string; delay: number }) => (
    <motion.div
      className="absolute bottom-0 rounded-full bg-emerald-800 opacity-30"
      style={{
        width: size,
        height: size,
        left,
      }}
      initial={{ y: '100%' }}
      animate={{
        y: '-100vh',
        transition: {
          duration: 10 + Math.random() * 5,
          repeat: Infinity,
          delay,
          ease: 'linear',
        },
      }}
    />
  );
  
  const Bubbles = () => (
    <>
      <Bubble size={20} left="10%" delay={0} />
      <Bubble size={15} left="20%" delay={2} />
      <Bubble size={25} left="30%" delay={1} />
      <Bubble size={18} left="40%" delay={3} />
      <Bubble size={22} left="50%" delay={0.5} />
      <Bubble size={16} left="60%" delay={2.5} />
      <Bubble size={28} left="70%" delay={1.5} />
      <Bubble size={14} left="80%" delay={3.5} />
      <Bubble size={24} left="90%" delay={0.8} />
    </>
  );

  export default Bubbles;