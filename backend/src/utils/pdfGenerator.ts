import PDFDocument from 'pdfkit';
import { Layanan } from '../models';

export const generateLetterPDF = (layanan: Layanan): Buffer => {
  const doc = new PDFDocument({ margin: 50 });
  const buffers: Buffer[] = [];

  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {});

  // Header
  doc.fontSize(20).text('SURAT KETERANGAN', { align: 'center' });
  doc.moveDown();

  const nomorSurat = `SURAT/${layanan.id}/SK/${new Date().getFullYear()}`;
  doc.fontSize(12).text(`Nomor: ${nomorSurat}`, { align: 'center' });
  doc.moveDown(2);

  // Body
  doc.fontSize(12);
  doc.text('Yang bertanda tangan di bawah ini, menerangkan bahwa:');
  doc.moveDown();

  if (layanan.penduduk) {
    doc.text(`Nama         : ${layanan.penduduk.nama}`);
    doc.text(`NIK          : ${layanan.penduduk.nik}`);
    doc.text(`Alamat       : ${layanan.penduduk.alamat}`);
    doc.text(`RT/RW        : ${layanan.penduduk.rt}/${layanan.penduduk.rw}`);
    doc.text(`Dusun        : ${layanan.penduduk.dusun}`);
    doc.text(`Jenis Kelamin: ${layanan.penduduk.jenis_kelamin}`);
    doc.text(`Agama        : ${layanan.penduduk.agama}`);
  } else {
    doc.text('Data penduduk tidak tersedia');
  }

  doc.moveDown(2);
  doc.text(`Keperluan    : ${layanan.keperluan}`);
  doc.moveDown();

  const jenisSuratText = {
    'Surat Keterangan': 'Surat Keterangan',
    'Surat Kelahiran': 'Surat Keterangan Kelahiran',
    'SKU': 'Surat Keterangan Usaha (SKU)',
    'Surat Pengantar': 'Surat Pengantar',
  }[layanan.jenis_surat] || layanan.jenis_surat;

  doc.text(`Dengan ini mencantumkan ${jenisSuratText} untuk keperluan yang sebenarnya.`);
  doc.moveDown(2);

  doc.text('Demikian surat keterangan ini dibuat dengan sebenarnya.', { align: 'center' });
  doc.moveDown(3);

  const today = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  doc.text(`Bekasi, ${today}`, { align: 'right' });
  doc.moveDown();
  doc.text('Kepala Desa', { align: 'right' });
  doc.moveDown(2);
  doc.text('(____________________)', { align: 'right' });

  doc.end();

  return Buffer.concat(buffers);
};
