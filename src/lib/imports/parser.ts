export function parseCSV(content: string) {
  const lines = content.split('\n').map(l => l.trim()).filter(Boolean);
  if (lines.length < 2) return [];
  
  const headers = lines[0].split(',').map(h => h.trim());
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return headers.reduce((obj, header, i) => {
      obj[header] = values[i]?.trim();
      return obj;
    }, {} as any);
  });
}\n