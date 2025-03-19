import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaUsers, FaBook, FaRocket, FaProjectDiagram, FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlineGroups, MdOutlineSupervisorAccount } from "react-icons/md";
import { BsNewspaper } from "react-icons/bs";
import { TbWorld } from "react-icons/tb";

const stats = [
  { value: 13339, suffix: "+", label: "TOTAL IDE INOVASI", icon: <MdOutlineGroups size={30} /> },
  { value: 9625, suffix: "+", label: "IDE DILAUNCHING", icon: <FaRocket size={30} /> },
  { value: 120, suffix: "+", label: "JUMLAH LOKUS", icon: <FaUsers size={30} /> },
  { value: 89, suffix: "+", label: "KABUPATEN DIFASILITASI", icon: <FaBook size={30} /> },
  { value: 30, suffix: "+", label: "KOTA DIFASILITASI", icon: <TbWorld size={30} /> },
  { value: 2, suffix: "+", label: "NGO DILIBATKAN", icon: <MdOutlineSupervisorAccount size={30} /> },
  { value: 30, suffix: "+", label: "FASILITATOR", icon: <FaProjectDiagram size={30} /> },
  { value: 120, suffix: "+", label: "PERANGKAT DAERAH", icon: <BsNewspaper size={30} /> },
  { value: 929, suffix: "+", label: "ALUMNI WCI", icon: <MdOutlineGroups size={30} /> },
  { value: 20, suffix: "+", label: "LOKUS WCI", icon: <FaChalkboardTeacher size={30} /> },
];

const gradients = [
  "bg-gradient-to-r from-blue-900 to-blue-700",
  "bg-gradient-to-r from-blue-700 to-blue-500",
  "bg-gradient-to-r from-blue-500 to-blue-400",
  "bg-gradient-to-r from-blue-600 to-blue-300",
  "bg-gradient-to-r from-blue-800 to-blue-600",
];


interface AnimatedCounterProps {
  value: number;
  suffix: string;
}

const AnimatedCounter = ({ value, suffix }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const interval = 30;
    const step = Math.ceil(value / (duration / interval));
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      {count}{suffix}
    </motion.span>
  );
};

const StatsGrid = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 grid gap-4 auto-rows-fr grid-cols-3 md:grid-cols-4">
      
      {/* Box untuk "LABINOV dalam Angka" dalam grid yang sama */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.7 }}
        className="p-6 rounded-xl shadow-lg flex flex-col justify-start text-left bg-white text-gray-800 col-span-2"
      >
        <h3 className="text-2xl font-extrabold">LABINOV dalam Angka</h3>
        {/* Garis dekoratif */}
        <div className="w-16 h-1 bg-blue-500 mt-2"></div>
      </motion.div>

      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`p-6 rounded-xl shadow-lg flex flex-col items-center text-center justify-center 
            ${gradients[index % gradients.length]} text-white`}
        >
          <p className="text-4xl font-bold">
            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
          </p>
          <p className="text-sm uppercase">{stat.label}</p>
          <div className="mt-3">{stat.icon}</div>
        </motion.div>
      ))}
    </div>
  );
};




export default StatsGrid;


