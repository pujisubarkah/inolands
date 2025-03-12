import { motion } from "framer-motion";
import { FaUsers, FaBook, FaRocket, FaProjectDiagram, FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlineGroups, MdOutlineSupervisorAccount } from "react-icons/md";
import { BsCalendar2Date, BsNewspaper } from "react-icons/bs";
import { TbWorld } from "react-icons/tb";

const stats = [
  { value: 10, suffix: "+", label: "TAHUN", icon: <BsCalendar2Date size={30} />, size: "small" },
  { value: 13339, suffix: "+", label: "TOTAL IDE INOVASI", icon: <MdOutlineGroups size={30} />, size: "medium" },
  { value: 9325, suffix: "+", label: "JUMLAH IDE YANG DILAUNCHING", icon: <FaRocket size={30} />, size: "small" },
  { value: 80000, suffix: "+", label: "JUMLAH LOKUS", icon: <FaUsers size={30} />, size: "medium" },
  { value: 20, suffix: "+", label: "JUMLAH KAB YANG DIFASILITASI", icon: <FaBook size={30} />, size: "small" },
  { value: 10, suffix: "+", label: "JUMLAH KOTA YANG DIFASILITASI", icon: <TbWorld size={30} />, size: "small" },
  { value: 1500, suffix: "+", label: "JUMLAH NGO YANG DILIBATKAN", icon: <MdOutlineSupervisorAccount size={30} />, size: "small" },
  { value: 30, suffix: "+", label: "JUMLAH FASILITATOR", icon: <FaProjectDiagram size={30} />, size: "small" },
  { value: 120, suffix: "+", label: "JUMLAH PERANGKAT DAERAH", icon: <BsNewspaper size={30} />, size: "small" },
  { value: 1025, suffix: "+", label: "JUMLAH ALUMNI WCI", icon: <MdOutlineGroups size={30} />, size: "medium" },
  { value: 300, suffix: "+", label: "JUMLAH LOKUS WCI", icon: <FaChalkboardTeacher size={30} />, size: "medium" },
];

const colors = ["bg-blue-900", "bg-blue-700", "bg-blue-500", "bg-blue-400", "bg-blue-600"];

interface AnimatedCounterProps {
  value: number;
  suffix: string;
}

const AnimatedCounter = ({ value, suffix }: AnimatedCounterProps) => {
  return (
    <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, ease: "easeOut" }}>
        {value}
      </motion.span>
      {suffix}
    </motion.span>
  );
};

const StatsGrid = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 flex">
      {/* Judul di kiri */}
      <div className="w-1/4 flex items-center justify-center bg-white-200 rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-700">LABINOV dalam Angka</h3>
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
