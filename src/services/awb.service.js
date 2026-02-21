import api from '../config/api';

/**
 * AWB Service - Handles AWB-related API calls
 */
class AWBService {
  /**
   * Fetch AWB numbers
   */
  async fetchAWBNumbers(count, deliveryPartner = 'nimbuspost') {
    const response = await api.post('/awb/fetch', {
      count,
      deliveryPartner
    });
    return response.data;
  }

  /**
   * Download AWB numbers as CSV
   */
  async downloadAWBCSV(count, deliveryPartner = 'nimbuspost') {
    const response = await api.get('/awb/download', {
      params: { count, deliveryPartner },
      responseType: 'blob'
    });
    
    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `awb-numbers-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    
    return true;
  }
}

export default new AWBService();
