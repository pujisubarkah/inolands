// components/InnovationIdeaForm.tsx
import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

type InnovationIdeaFormProps = {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    nextStep: () => void; // Function untuk melanjutkan ke step berikutnya
  };

const InnovationIdeaForm: React.FC<InnovationIdeaFormProps> = ({ formData, handleChange, nextStep }) => {
const formRef = useRef<HTMLDivElement>(null);
const getBgColor = (status: string) => (status === "Draft" ? "bg-red-200" : "bg-white");

const generatePDF = () => {
    if (formRef.current) {
      html2canvas(formRef.current, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 190;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
        pdf.save("InnovationForm.pdf");
      });
    }
  };

  return (
    <div>
      {/* Latar Belakang */}
      <div className="border border-black rounded-lg mt-4">
        <div className="bg-blue-600 p-2 text-center rounded-t-lg">
          <strong className="text-white text-lg">LATAR BELAKANG <br /></strong>
          <span style={{ fontWeight: 'normal', fontSize: '14px', color: 'white' }}>
            (Masalah yang dihadapi atau kondisi yang ingin diperbaiki)
          </span>
        </div>
        <textarea
            className={`w-full p-2 mt-4 border border-gray-300 rounded-b-lg ${getBgColor(formData.status)}`}
            placeholder="Tuliskan Latar Belakang"
            name="latarBelakang"
            value={formData.latarBelakang}
            onChange={handleChange}
            rows={4}
            />
      </div>

      {/* Ide Inovasi Terpilih */}
      <div className="border border-black rounded-lg mt-4">
        <div className="bg-blue-600 p-2 text-center rounded-t-lg">
          <strong className="text-white text-lg">IDE INOVASI TERPILIH <br /></strong>
        </div>
        <textarea
          className={`w-full p-2 mt-4 border border-gray-300 rounded-b-lg ${getBgColor(formData.status)}`}
          placeholder="Tuliskan Ide Inovasi"
          name="ideInovasi"
          value={formData.ideInovasi}
          onChange={handleChange}
          rows={4}
        />
      </div>

      <div className="border border-black rounded-lg mt-4 grid grid-cols-2 gap-4">
  {/* Tujuan Inovasi */}
  <div className="w-full">
    <div className="bg-blue-600 p-2 text-center text-white font-bold rounded-t-lg">
      TUJUAN INOVASI
    </div>
    <textarea
      className={`w-full p-2 mt-4 border border-gray-300 rounded-b-lg ${getBgColor(formData.status)}`}
      placeholder="Tuliskan Tujuan Inovasi"
      name="tujuanInovasi"
      value={formData.tujuanInovasi}
      onChange={handleChange}
      rows={4}
    />
  </div>

  {/* Target Perubahan */}
  <div className="w-full">
    <div className="bg-blue-600 p-2 text-center text-white font-bold rounded-t-lg">
      TARGET PERUBAHAN
    </div>
    <textarea
      className={`w-full p-2 mt-4 border border-gray-300 rounded-b-lg ${getBgColor(formData.status)}`}
      placeholder="Tuliskan Target Perubahan"
      name="targetPerubahan"
      value={formData.targetPerubahan}
      onChange={handleChange}
      rows={4}
    />
</div>

<div className="border border-black rounded-lg mt-4 grid grid-cols-4 gap-4">
  {/* Stakeholder Inovasi */}
  <div className="w-full">
    <div className="bg-blue-600 p-2 text-center text-white font-bold rounded-t-lg">
      STAKEHOLDER INOVASI
    </div>
    <textarea
      className={`w-full p-2 mt-4 border border-gray-300 rounded-b-lg ${getBgColor(formData.status)}`}
      placeholder="Tuliskan Stakeholder Inovasi"
      name="stakeholderInovasi"
      value={formData.stakeholderInovasi}
      onChange={handleChange}
      rows={4}
    />
  </div>

  {/* Sumber Daya Inovasi */}
  <div className="w-full">
    <div className="bg-blue-600 p-2 text-center text-white font-bold rounded-t-lg">
      SUMBER DAYA INOVASI
    </div>
    <textarea
      className={`w-full p-2 mt-4 border border-gray-300 rounded-b-lg ${getBgColor(formData.status)}`}
      placeholder="Tuliskan Sumber Daya Inovasi"
      name="sumberDayaInovasi"
      value={formData.sumberDayaInovasi}
      onChange={handleChange}
      rows={4}
    />
  </div>

  {/* Penerima Manfaat */}
  <div className="w-full">
    <div className="bg-blue-600 p-2 text-center text-white font-bold rounded-t-lg">
      PENERIMA MANFAAT
    </div>
    <textarea
      className={`w-full p-2 mt-4 border border-gray-300 rounded-b-lg ${getBgColor(formData.status)}`}
      placeholder="Tuliskan Penerima Manfaat"
      name="penerimaManfaat"
      value={formData.penerimaManfaat}
      onChange={handleChange}
      rows={4}
    />
  </div>

  {/* Kebaruan */}
  <div className="w-full">
    <div className="bg-blue-600 p-2 text-center text-white font-bold rounded-t-lg">
      KEBARUAN
    </div>
    <textarea
      className={`w-full p-2 mt-4 border border-gray-300 rounded-b-lg ${getBgColor(formData.status)}`}
      placeholder="Tuliskan Kebaruan"
      name="kebaruan"
      value={formData.kebaruan}
      onChange={handleChange}
      rows={4}
    />
  </div>
</div>

 {/* Deskripsi Singkat Inovasi*/}
 <div className="border border-black rounded-lg mt-4">
        <div className="bg-blue-600 p-2 text-center rounded-t-lg">
          <strong className="text-white text-lg">DESKRIPSI SINGKAT INOVASI <br /></strong>
        </div>
        <textarea
          className={`w-full p-2 mt-4 border border-gray-300 rounded-b-lg ${getBgColor(formData.status)}`}
          placeholder="Penjelasan ringkas mengenai cara kerja dan teknis pelaksanaan inovasi"
          name="ideInovasi"
          value={formData.ideInovasi}
          onChange={handleChange}
          rows={4}
        />
      </div>

{/* Deskripsi Singkat Inovasi*/}
<div className="border border-black rounded-lg mt-4">
        <div className="bg-blue-600 p-2 text-center rounded-t-lg">
          <strong className="text-white text-lg">DESKRIPSI SINGKAT INOVASI <br /></strong>
        </div>
        <textarea
          className={`w-full p-2 mt-4 border border-gray-300 rounded-b-lg ${getBgColor(formData.status)}`}
          placeholder="Penjelasan ringkas mengenai cara kerja dan teknis pelaksanaan inovasi"
          name="ideInovasi"
          value={formData.ideInovasi}
          onChange={handleChange}
          rows={4}
        />
      </div>

      {/* Keterangan */}
      <div className="border border-black rounded-lg mt-4">
        <div className="bg-blue-600 p-2 text-center rounded-t-lg">
          <strong className="text-white text-lg">KETERANGAN <br /></strong>
        </div>
        <textarea
          className={`w-full p-2 mt-4 border border-gray-300 rounded-b-lg ${getBgColor(formData.status)}`}
          placeholder={`Waktu Pelaksanaan  / Rencana waktu pelaksanaan:\nUsulan inovasi: (ide baru, replikasi, atau pengembangan)`}
          name="ideInovasi"
          value={formData.ideInovasi}
          onChange={handleChange}
          rows={4}
        />
      </div>
 {/* Tombol Kirim */}
 <div className="flex justify-end mt-4">
        <button 
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all" 
          onClick={nextStep}
        >
          Kirim & Lanjut
        </button>
        <button 
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all ml-2" 
          onClick={generatePDF}
        >
          Download PDF
        </button>
      </div>
    </div>
  
    </div>
  );
};

export default InnovationIdeaForm;