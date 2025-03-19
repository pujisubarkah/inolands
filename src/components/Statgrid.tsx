import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaUsers, FaBook, FaRocket, FaProjectDiagram, FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlineGroups, MdOutlineSupervisorAccount } from "react-icons/md";
import { BsCalendar2Date, BsNewspaper } from "react-icons/bs";
import { TbWorld } from "react-icons/tb";

const stats = [
  { value: 10, suffix: "+", label: "TAHUN", icon: <BsCalendar2Date size={30} />, size: "small" },
  { value: 13339, suffix: "+", label: "TOTAL IDE INOVASI", icon: <MdOutlineGroups size={30} />, size: "medium" },
  { value: 9625, suffix: "+", label: "JUMLAH IDE YANG DILAUNCHING", icon: <FaRocket size={30} />, size: "small" },
  { value: 120, suffix: "+", label: "JUMLAH LOKUS", icon: <FaUsers size={30} />, size: "medium" },
  { value: 89, suffix: "+", label: "JUMLAH KAB YANG DIFASILITASI", icon: <FaBook size={30} />, size: "small" },
  { value: 30, suffix: "+", label: "JUMLAH KOTA YANG DIFASILITASI", icon: <TbWorld size={30} />, size: "small" },
  { value: 2, suffix: "+", label: "JUMLAH NGO YANG DILIBATKAN", icon: <MdOutlineSupervisorAccount size={30} />, size: "small" },
  { value: 30, suffix: "+", label: "JUMLAH FASILITATOR", icon: <FaProjectDiagram size={30} />, size: "small" },
  { value: 120, suffix: "+", label: "JUMLAH PERANGKAT DAERAH", icon: <BsNewspaper size={30} />, size: "small" },
  { value: 22.500, suffix: "+", label: "JUMLAH ASN/MASYARAKAT DIFASILITASI", icon: <BsNewspaper size={30} />, size: "small" },
  { value: 929, suffix: "+", label: "JUMLAH ALUMNI WCI", icon: <MdOutlineGroups size={30} />, size: "medium" },
  { value: 20, suffix: "+", label: "JUMLAH LOKUS WCI", icon: <FaChalkboardTeacher size={30} />, size: "medium" },
];

const colors = ["bg-blue-900", "bg-blue-700", "bg-blue-500", "bg-blue-400", "bg-blue-600"];

interface AnimatedCounterProps {
  value: number;
  suffix: string;
}

const AnimatedCounter = ({ value, suffix }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000; // Durasi animasi dalam ms
    const interval = 30; // Waktu jeda antar perubahan angka
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
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {count}
      {suffix}
    </motion.span>
  );
};

const StatsGrid = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 flex">
      {/* Judul di kiri */}
      <div className="w-1/4 flex items-start justify-center bg-white rounded-xl p-6 shadow-lg relative">
        {/* Garis vertikal dua warna biru */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
        <div className="absolute left-1.5 top-0 bottom-0 w-1 bg-blue-700"></div>

        <h3 className="text-xl font-bold text-gray-700 mt-4 ml-4">LABINOV dalam Angka</h3>
      </div>

      {/* Grid Stats */}
      <div className="w-3/4 grid gap-4 auto-rows-fr grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${colors[index % colors.length]} text-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center justify-center ${stat.size === "medium" ? "col-span-2" : "col-span-1"}`}
          >
            <p className="text-4xl font-bold">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="text-sm uppercase">{stat.label}</p>
            <div className="mt-3">{stat.icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsGrid;
