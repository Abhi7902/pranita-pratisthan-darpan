
export const downloadCSV = (data: any[], filename: string) => {
  if (!data.length) {
    alert('No data to export');
    return;
  }

  // Get all unique keys from all objects
  const keys = Array.from(new Set(data.flatMap(obj => Object.keys(obj))));
  
  // Create CSV header
  const csvHeader = keys.join(',');
  
  // Create CSV rows
  const csvRows = data.map(obj => 
    keys.map(key => {
      const value = obj[key];
      // Handle null, undefined, dates, and strings with commas
      if (value === null || value === undefined) return '';
      if (value instanceof Date) return value.toLocaleDateString();
      if (typeof value === 'string' && value.includes(',')) return `"${value}"`;
      return value;
    }).join(',')
  );
  
  // Combine header and rows
  const csvContent = [csvHeader, ...csvRows].join('\n');
  
  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
