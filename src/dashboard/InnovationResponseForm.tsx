import React from 'react';

type InnovationIdeaFormProps = {
    formData?: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleApproval: (field: string) => void;
    handleComment: (field: string, comment: string) => void;
    handleResponseChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    nextStep: () => void;
};


const InnovationResponseForm: React.FC<InnovationIdeaFormProps> = ({ formData = {}, handleChange, handleApproval, handleComment, nextStep }) => {
    const getBgColor = (status?: string) => (status === "Draft" ? "bg-red-200" : "bg-white");

    const renderApprovalSection = (field: string) => (
        <div className="flex items-center justify-between mt-2">
            <input 
                type="checkbox" 
                className="w-6 h-6 cursor-pointer" 
                onChange={() => handleApproval(field)}
                checked={formData?.status === "Approved"}
            />
            <textarea 
                placeholder="Tanggapan..." 
                className="border border-gray-300 p-2 rounded w-2/3"
                rows={4}
                onBlur={(e) => handleComment(field, e.target.value)}
            />
        </div>
    );

    return (
        <div>
            {["latarBelakang", "ideInovasi", "tujuanInovasi", "targetPerubahan", "stakeholderInovasi", "sumberDayaInovasi", "penerimaManfaat", "kebaruan", "deskripsiSingkat", "keterangan"].map((field) => (
                <div key={field} className="border border-black rounded-lg mt-4 p-4">
                    <div className="bg-blue-600 p-2 text-center text-white font-bold rounded-t-lg">
                        {field.toUpperCase().replace(/_/g, " ")}
                    </div>
                    <textarea
                        className={`w-full p-2 mt-2 border border-gray-300 rounded-b-lg ${getBgColor(formData?.status === "Approved" ? "Approved" : formData?.status)}`}
                        placeholder={`Tuliskan ${field.replace(/_/g, " ")}`}
                        name={field}
                        value={formData?.[field] || ""}
                        onChange={handleChange}
                        rows={4}
                    />
                    {renderApprovalSection(field)}
                </div>
            ))}
            <div className="flex justify-end mt-4">
                <button 
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all" 
                    onClick={nextStep}
                >
                    Kembalikan 
                </button>
            </div>
        </div>
    );
};

export default InnovationResponseForm;

