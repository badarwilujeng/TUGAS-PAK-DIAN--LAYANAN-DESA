import { Response } from 'express';
import { layananService } from '../services/layananService';
import { AuthenticatedRequest, Role } from '../types';
import { authService } from '../services/authService';

// Create a new service request (penduduk can apply for themselves)
export const createLayanan = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { jenis_surat, keperluan, penduduk_id } = req.body;

    let actualPendudukId: number;
    if (req.user?.role === Role.PENDUK) {
      // Penduduk can only create for themselves
      const user = await authService.findById(req.user!.id);
      if (!user || !user.penduduk_id) {
        return res.status(400).json({ success: false, error: 'Your account is not linked to a penduduk record' });
      }
      actualPendudukId = user.penduduk_id;
    } else {
      // Admin must specify penduduk_id
      if (!penduduk_id) {
        return res.status(400).json({ success: false, error: 'Penduduk ID is required' });
      }
      actualPendudukId = penduduk_id;
    }

    const layanan = await layananService.create({
      penduduk_id: actualPendudukId,
      jenis_surat,
      keperluan,
    });

    res.status(201).json({ success: true, data: layanan });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all layanan (admin gets all with penduduk data; penduduk gets only their own)
export const getAllLayanan = async (req: AuthenticatedRequest, res: Response) => {
  try {
    let layanan;
    if (req.user?.role === Role.PENDUK) {
      const user = await authService.findById(req.user!.id);
      if (!user || !user.penduduk_id) {
        return res.status(400).json({ success: false, error: 'Penduduk data not linked' });
      }
      layanan = await layananService.findAllByPendudukId(user.penduduk_id);
    } else {
      layanan = await layananService.findAll();
    }
    res.json({ success: true, data: layanan });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get single layanan
export const getLayananById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const layanan = await layananService.findById(parseInt(id, 10));

    if (!layanan) {
      return res.status(404).json({ success: false, error: 'Layanan not found' });
    }

    // Authorization: admin can view any; penduduk can only view their own
    if (req.user?.role === Role.PENDUK) {
      const user = await authService.findById(req.user!.id);
      if (!user || user.penduduk_id !== layanan.penduduk_id) {
        return res.status(403).json({ success: false, error: 'You can only view your own services' });
      }
    }

    res.json({ success: true, data: layanan });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update layanan status (admin only)
export const updateLayanan = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status, catatan_admin } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, error: 'Status is required' });
    }

    const layanan = await layananService.updateStatus(parseInt(id, 10), status, catatan_admin);

    if (!layanan) {
      return res.status(404).json({ success: false, error: 'Layanan not found' });
    }

    res.json({ success: true, data: layanan });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete layanan (admin only)
export const deleteLayanan = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const success = await layananService.delete(parseInt(id, 10));

    if (!success) {
      return res.status(404).json({ success: false, error: 'Layanan not found' });
    }

    res.json({ success: true, message: 'Layanan deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Generate PDF for layanan (admin or owner)
export const generatePDF = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const layanan = await layananService.findById(parseInt(id, 10));

    if (!layanan) {
      return res.status(404).json({ success: false, error: 'Layanan not found' });
    }

    // Authorization: admin or owner
    if (req.user?.role === Role.PENDUK) {
      const user = await authService.findById(req.user!.id);
      if (!user || user.penduduk_id !== layanan.penduduk_id) {
        return res.status(403).json({ success: false, error: 'You can only generate PDF for your own services' });
      }
    }

    const pdfBuffer = await layananService.generatePDF(parseInt(id, 10));

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=surat_${id}.pdf`,
      'Content-Length': pdfBuffer.length,
    });

    res.send(pdfBuffer);
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
