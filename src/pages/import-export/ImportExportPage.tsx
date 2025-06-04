import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Upload, Download, FileText, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { downloadFile } from '@/lib/utils'

export function ImportExportPage() {
  const [importType, setImportType] = useState('products')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

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
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Import/Export</h1>
        <p className="mt-1 text-sm text-gray-500">
          Import data from CSV files or export your data
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Import Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Upload className="h-5 w-5 text-gray-400 mr-2" />
              <CardTitle>Import Data</CardTitle>
            </div>
            <CardDescription>
              Upload CSV files to import data into the system
            </CardDescription>
          </CardHeader>
          <div className="p-6 pt-0 space-y-4">
            <Select
              label="Import Type"
              value={importType}
              onChange={(e) => setImportType(e.target.value)}
              options={importOptions}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select File
              </label>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-medium
                  file:bg-primary-50 file:text-primary-700
                  hover:file:bg-primary-100"
              />
              {selectedFile && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Import Guidelines
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <ul className="list-disc list-inside space-y-1">
                      <li>File must be in CSV format</li>
                      <li>First row should contain column headers</li>
                      <li>Download templates for correct format</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={handleImport}
              disabled={!selectedFile}
              className="w-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              Import {importType}
            </Button>
          </div>
        </Card>

        {/* Export Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Download className="h-5 w-5 text-gray-400 mr-2" />
              <CardTitle>Export Data</CardTitle>
            </div>
            <CardDescription>
              Download your data in CSV format
            </CardDescription>
          </CardHeader>
          <div className="p-6 pt-0 space-y-4">
            {importOptions.map((option) => (
              <div
                key={option.value}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium">{option.label}</p>
                    <p className="text-sm text-gray-500">
                      Export all {option.label.toLowerCase()} data
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExport(option.value)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Templates Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>CSV Templates</CardTitle>
          <CardDescription>
            Download template files with correct format for importing
          </CardDescription>
        </CardHeader>
        <div className="p-6 pt-0">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {importOptions.map((option) => (
              <Button
                key={option.value}
                variant="outline"
                onClick={() => handleExport(`${option.value}_template`)}
              >
                <FileText className="h-4 w-4 mr-2" />
                {option.label} Template
              </Button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}