import { supabase } from '../config/supabaseClient';
import { Request, Response } from 'express';

export const getPdflist = async (req: Request, res: Response) => {
  const { page = 1, per_page = 12 } = req.query; // Default to page 1 and 12 items per page if not provided

  const offset = (Number(page) - 1) * Number(per_page); // Calculate the offset for pagination

  try {
    // Fetch data with pagination from Supabase
    const { data, error, count } = await supabase
      .from('pdflist')
      .select('*', { count: 'exact' }) // Add count to get the total number of items
      .range(offset, offset + Number(per_page) - 1); // Apply pagination range

    if (error) throw error;

    res.status(200).json({
      data,
      totalCount: count, // Include the total count in the response
    }); // Send paginated data along with the total count
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Controller untuk menambah data infografis
export const addPdflist = async (req: Request, res: Response) => {
  const { pdf_url, pdf_judul, pdf_kategori, pdf_cover, pdf_publisher } = req.body; // Mengambil data yang dikirimkan

  try {
    // Menyisipkan data ke tabel dokumens
    const { data, error } = await supabase
      .from('pdflist')
      .insert([
        { pdf_url, pdf_judul, pdf_kategori, pdf_cover, pdf_publisher } // Menambahkan dokumen ke Supabase
      ]);

    if (error) throw error;

    res.status(201).json({ message: 'pdf berhasil ditambahkan', data: data }); // Mengirimkan response sukses
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
