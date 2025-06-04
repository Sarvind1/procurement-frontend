import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Upload, Download, FileText, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { downloadFile } from '@/lib/utils'

export const ImportExportPage: React.FC = () => {
  const [importType, setImportType] = React.useState('products')
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type !== 'text/csv') {
        toast.error('Please upload a CSV file')
        return
      }
      setSelectedFile(file)
    }
  }

  const handleImport = async () => {
    if (!selectedFile) {
      toast.error('Please select a file to import')
      return
    }

    // Here you would implement the actual import logic
    toast.success(`Importing ${importType} from ${selectedFile.name}...`)
  }

  const handleExport = (type: string) => {
    // Here you would fetch the data and create CSV
    const sampleData = `sku,name,price,cost,quantity,min_quantity
PROD-001,Sample Product,99.99,49.99,100,10`
    
    downloadFile(sampleData, `${type}_export.csv`, 'text/csv')
    toast.success(`${type} exported successfully`)
  }

  const importOptions = [
    { value: 'products', label: 'Products' },
    { value: 'inventory', label: 'Inventory Movements' },
    { value: 'purchase_orders', label: 'Purchase Orders' },
    { value: 'suppliers', label: 'Suppliers' },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Import/Export</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <h2 className="text-lg font-semibold mb-4">Import Data</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Import Type</label>
              <select
                className="w-full p-2 border rounded"
                value={importType}
                onChange={(e) => setImportType(e.target.value)}
              >
                {importOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">File</label>
              <Input
                type="file"
                accept=".csv,.xlsx"
                onChange={handleFileChange}
              />
            </div>
            <button
              className="w-full bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleImport}
              disabled={!selectedFile}
            >
              Import
            </button>
          </div>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold mb-4">Export Data</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Export Type</label>
              <select
                className="w-full p-2 border rounded"
                value={importType}
                onChange={(e) => setImportType(e.target.value)}
              >
                {importOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Format</label>
              <select
                className="w-full p-2 border rounded"
                value={importType}
                onChange={(e) => setImportType(e.target.value)}
              >
                <option value="csv">CSV</option>
                <option value="xlsx">Excel</option>
              </select>
            </div>
            <button
              className="w-full bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => handleExport(importType)}
            >
              Export
            </button>
          </div>
        </Card>
      </div>
      <Card>
        <h2 className="text-lg font-semibold mb-4">Import History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">File</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Records</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 text-center" colSpan={5}>
                  No import history found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}