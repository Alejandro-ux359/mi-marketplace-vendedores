import FileUploadIcon from "@mui/icons-material/FileUpload";

export default function UploadFilesMockup() {
  // 🔹 Mock: cambiar a true cuando quieras simular archivos
  const hasFiles = false;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-semibold">Upload Files</h1>
        <p className="text-gray-500 text-sm">
          Upload your user-downloadable files.
        </p>
      </div>

      {/* Dropzone */}
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center hover:border-gray-400 transition cursor-pointer">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 text-gray-500">
            <FileUploadIcon fontSize="medium" />
          </div>
          <p className="text-sm font-medium">
            Drop your files here or browse
          </p>
          <p className="text-xs text-gray-400">
            Max file size up to 1 GB
          </p>
        </div>
      </div>

      {/* Upload list - SOLO SI HAY ARCHIVOS */}
      {hasFiles && (
        <div className="space-y-3">
          <div className="text-sm font-medium text-gray-600">
            Uploads
          </div>

          {/* Item */}
          <div className="flex items-center justify-between border rounded-lg p-3">
            <div>
              <p className="text-sm font-medium">
                Product Catalog.pdf
              </p>
              <p className="text-xs text-gray-400">20 MB</p>
            </div>
            <button className="text-gray-400 hover:text-red-500">
              🗑
            </button>
          </div>

          {/* Item con progreso */}
          <div className="border rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">
                  Blender Project File.zip
                </p>
                <p className="text-xs text-gray-400">
                  150 MB of 300 MB
                </p>
              </div>
              <button className="text-gray-400 hover:text-red-500">
                ✕
              </button>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-black h-1.5 rounded-full w-1/2"></div>
            </div>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-between pt-4">
        <button className="px-6 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition">
          Back
        </button>
        <button className="px-6 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition">
          Next
        </button>
      </div>
    </div>
  );
}