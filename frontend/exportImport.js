// EXPORT IMPORT FUNCTIONALITY

// frontend/exportImport.js

// Export/Import utility for task data management
const exportImport = {
  
  // Export tasks to JSON file
  exportToJSON(tasks, filename = 'tasks-export.json') {
    try {
      const dataStr = JSON.stringify(tasks, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      
      return { success: true, message: 'Tasks exported successfully' };
    } catch (error) {
      console.error('Error exporting tasks:', error);
      return { success: false, message: 'Failed to export tasks' };
    }
  },
  
  // Export tasks to CSV file
  exportToCSV(tasks, filename = 'tasks-export.csv') {
    try {
      // CSV headers
      const headers = ['Title', 'Status', 'Created At', 'Updated At'];
      
      // Convert tasks to CSV rows
      const rows = tasks.map(task => [
        this.escapeCsvValue(task.title),
        task.status,
        new Date(task.createdAt).toLocaleString(),
        new Date(task.updatedAt).toLocaleString()
      ]);
      
      // Combine headers and rows
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n');
      
      const dataBlob = new Blob([csvContent], { type: 'text/csv' });
      
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      
      return { success: true, message: 'Tasks exported to CSV successfully' };
    } catch (error) {
      console.error('Error exporting to CSV:', error);
      return { success: false, message: 'Failed to export to CSV' };
    }
  },
  
  // Export tasks to plain text file
  exportToText(tasks, filename = 'tasks-export.txt') {
    try {
      const textContent = tasks.map((task, index) => {
        return `${index + 1}. ${task.title}
   Status: ${task.status}
   Created: ${new Date(task.createdAt).toLocaleString()}
   Updated: ${new Date(task.updatedAt).toLocaleString()}
`;
      }).join('\n');
      
      const dataBlob = new Blob([textContent], { type: 'text/plain' });
      
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      
      return { success: true, message: 'Tasks exported to text successfully' };
    } catch (error) {
      console.error('Error exporting to text:', error);
      return { success: false, message: 'Failed to export to text' };
    }
  },
  
  // Import tasks from JSON file
  async importFromJSON(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const importedTasks = JSON.parse(e.target.result);
          
          // Validate imported data
          if (!Array.isArray(importedTasks)) {
            reject({ success: false, message: 'Invalid file format: Expected an array of tasks' });
            return;
          }
          
          // Validate each task
          const validTasks = importedTasks.filter(task => {
            return task.title && 
                   typeof task.title === 'string' && 
                   task.title.trim().length > 0 &&
                   ['pending', 'completed'].includes(task.status);
          });
          
          if (validTasks.length === 0) {
            reject({ success: false, message: 'No valid tasks found in file' });
            return;
          }
          
          resolve({ 
            success: true, 
            tasks: validTasks,
            message: `Successfully imported ${validTasks.length} task${validTasks.length !== 1 ? 's' : ''}`
          });
          
        } catch (error) {
          console.error('Error parsing JSON:', error);
          reject({ success: false, message: 'Failed to parse JSON file' });
        }
      };
      
      reader.onerror = () => {
        reject({ success: false, message: 'Failed to read file' });
      };
      
      reader.readAsText(file);
    });
  },
  
  // Import tasks from CSV file
  async importFromCSV(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const csvContent = e.target.result;
          const lines = csvContent.split('\n').filter(line => line.trim());
          
          if (lines.length < 2) {
            reject({ success: false, message: 'CSV file is empty or invalid' });
            return;
          }
          
          // Skip header row
          const dataLines = lines.slice(1);
          
          const tasks = [];
          
          dataLines.forEach(line => {
            const values = this.parseCsvLine(line);
            
            if (values.length >= 2) {
              const title = values[0].trim();
              const status = values[1].trim().toLowerCase();
              
              if (title && ['pending', 'completed'].includes(status)) {
                tasks.push({
                  title,
                  status,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString()
                });
              }
            }
          });
          
          if (tasks.length === 0) {
            reject({ success: false, message: 'No valid tasks found in CSV' });
            return;
          }
          
          resolve({ 
            success: true, 
            tasks,
            message: `Successfully imported ${tasks.length} task${tasks.length !== 1 ? 's' : ''} from CSV`
          });
          
        } catch (error) {
          console.error('Error parsing CSV:', error);
          reject({ success: false, message: 'Failed to parse CSV file' });
        }
      };
      
      reader.onerror = () => {
        reject({ success: false, message: 'Failed to read file' });
      };
      
      reader.readAsText(file);
    });
  },
  
  // Escape CSV values (handle commas and quotes)
  escapeCsvValue(value) {
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  },
  
  // Parse CSV line (handle quoted values)
  parseCsvLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current);
    return result;
  },
  
  // Generate filename with timestamp
  generateFilename(prefix, extension) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    return `${prefix}-${timestamp}.${extension}`;
  }
};

export default exportImport;