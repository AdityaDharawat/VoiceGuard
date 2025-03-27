import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUpload, FiMic, FiDownload, FiRefreshCw, FiMail, FiShare2, FiActivity, FiUser, FiMapPin, FiSmartphone, FiGlobe } from 'react-icons/fi';

interface AnalysisFeature {
  name: string;
  value: number;
}

interface AnalysisResults {
  isDeepfake: boolean;
  confidence: number;
  features: AnalysisFeature[];
}

interface SourceDetails {
  name: string;
  ipAddress: string;
  phoneNumber: string;
  location: string;
  timestamp: string;
}

const Detection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [showSourceIdentification, setShowSourceIdentification] = useState(false);
  const [sourceDetails, setSourceDetails] = useState<SourceDetails | null>(null);
  const [isIdentifying, setIsIdentifying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      analyzeFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      analyzeFile(e.dataTransfer.files[0]);
    }
  };

  const analyzeFile = async (file: File) => {
    setIsAnalyzing(true);
    
    try {
      // Simulate API call
      const formData = new FormData();
      formData.append("file", file);
      
      // In a real implementation, you would use:
      // const response = await fetch("http://localhost:5000/analyze-audio", {
      //   method: "POST",
      //   body: formData,
      // });
      // const data = await response.json();

      // Simulated response
      await new Promise(resolve => setTimeout(resolve, 2000));
      const data: AnalysisResults = {
        isDeepfake: Math.random() > 0.7,
        confidence: Math.floor(Math.random() * 20) + 80,
        features: [
          { name: "Spectral Consistency", value: Math.floor(Math.random() * 20) + 80 },
          { name: "Micro-timing Analysis", value: Math.floor(Math.random() * 20) + 80 },
          { name: "Vocal Biomarkers", value: Math.floor(Math.random() * 20) + 80 },
          { name: "Synthetic Artifacts", value: Math.floor(Math.random() * 20) + 80 }
        ]
      };

      setResults(data);
    } catch (error) {
      console.error("Error analyzing file:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const startRecording = async () => {
    setIsRecording(true);
    
    try {
      // Simulate recording API call
      // In a real implementation:
      // const response = await fetch("http://localhost:5000/record-audio", { method: "POST" });
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulated recording result
      const mockFile = new File([""], "recording.wav", { type: "audio/wav" });
      setFile(mockFile);
      await analyzeFile(mockFile);
    } catch (error) {
      console.error("Error during recording:", error);
    } finally {
      setIsRecording(false);
    }
  };

  const resetAnalysis = () => {
    setFile(null);
    setResults(null);
  };

  const downloadReport = async () => {
    if (!results) return;
    
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 500));
      alert("Report downloaded successfully (simulated)");
    } catch (error) {
      console.error("Error downloading report:", error);
    }
  };

  const shareReport = async (method: "email" | "whatsapp") => {
    if (!results) return;

    const recipient = prompt(`Enter recipient ${method === "email" ? "email" : "WhatsApp number"}:`);
    if (!recipient) return;

    try {
      // Simulate sharing
      await new Promise(resolve => setTimeout(resolve, 500));
      alert(`Report shared via ${method} to ${recipient} (simulated)`);
    } catch (error) {
      console.error(`Error sharing via ${method}:`, error);
    }
  };

  const generateMockSourceDetails = (): SourceDetails => {
    const randomNumbers = () => Math.floor(Math.random() * 256);
    return {
      name: `John Doe ${Math.floor(Math.random() * 1000)}`,
      ipAddress: `${randomNumbers()}.${randomNumbers()}.${randomNumbers()}.${randomNumbers()}`,
      phoneNumber: `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      location: `${['New York', 'Los Angeles', 'Chicago', 'San Francisco', 'Miami'][Math.floor(Math.random() * 5)]}, USA`,
      timestamp: new Date().toLocaleString()
    };
  };

  const handleSourceIdentification = async () => {
    if (!results || !results.isDeepfake) return;

    setShowSourceIdentification(true);
    setIsIdentifying(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2500));
      const details = generateMockSourceDetails();
      setSourceDetails(details);
    } catch (error) {
      console.error("Error identifying source:", error);
    } finally {
      setIsIdentifying(false);
    }
  };

  const closeSourceIdentification = () => {
    setShowSourceIdentification(false);
    setSourceDetails(null);
  };

  return (
    <div className="container mx-auto px-4 pt-28 py-12">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl md:text-4xl font-bold mb-8 dark:text-white"
      >
        Voice Authenticity Analysis
      </motion.h1>

      <AnimatePresence mode="wait">
        {!file && !results && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 mb-8 border border-gray-100 dark:border-gray-700"
          >
            <div 
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-12 text-center cursor-pointer hover:border-blue-500 transition-all duration-300"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <FiUpload className="mx-auto w-12 h-12 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Upload Voice Sample</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">Drag & drop an audio file here, or click to browse</p>
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                Select File
              </button>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="audio/*"
                className="hidden" 
              />
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-4">Or record directly</p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className={`relative w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-lg ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-blue-600 hover:bg-blue-700'} transition-all duration-300 text-white`}
                onClick={startRecording}
                disabled={isRecording}
              >
                <FiMic className="w-8 h-8" />
                {isRecording && (
                  <motion.div 
                    className="absolute inset-0 rounded-full border-4 border-red-500 opacity-0"
                    animate={{ 
                      scale: [1, 1.5],
                      opacity: [0.7, 0]
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  />
                )}
              </motion.button>
            </div>
          </motion.div>
        )}

        {isAnalyzing && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 mb-8 border border-gray-100 dark:border-gray-700 text-center"
          >
            <div className="mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="relative w-24 h-24 mx-auto mb-4"
              >
                <div className="absolute inset-0 rounded-full bg-blue-100 dark:bg-blue-900 opacity-75"></div>
                <div className="absolute inset-2 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center">
                  <FiActivity className="w-12 h-12 text-blue-600 dark:text-blue-300" />
                </div>
              </motion.div>
              <h3 className="text-2xl font-semibold mb-2 dark:text-white">Analyzing Voice Sample</h3>
              <p className="text-gray-500 dark:text-gray-400">Our AI is examining spectral patterns and vocal biomarkers...</p>
            </div>

            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5">
              <motion.div 
                className="bg-blue-600 h-2.5 rounded-full" 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        )}

        {results && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 mb-8 border border-gray-100 dark:border-gray-700"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h3 className="text-2xl font-semibold dark:text-white">Analysis Results</h3>
                <p className="text-gray-500 dark:text-gray-400">Detailed authenticity assessment</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetAnalysis}
                className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-medium mt-4 md:mt-0 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <FiRefreshCw className="mr-2" /> Analyze Another
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`p-6 rounded-xl mb-8 ${results.isDeepfake ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' : 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'} border`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold dark:text-white">
                    {results.isDeepfake ? 'Potential Deepfake Detected' : 'Authentic Voice Sample'}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Confidence: {results.confidence}%
                  </p>
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-medium ${results.isDeepfake ? 'bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100' : 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100'}`}>
                  {results.isDeepfake ? 'High Risk' : 'Low Risk'}
                </div>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {results.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium dark:text-gray-300">{feature.name}</span>
                    <span className="text-sm font-semibold dark:text-white">{feature.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <motion.div 
                      className={`h-2 rounded-full ${feature.value > 85 ? 'bg-green-500' : feature.value > 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${feature.value}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
              <h4 className="text-lg font-semibold mb-4 dark:text-white">Recommended Actions</h4>
              <div className="space-y-3">
                <p className="text-gray-600 dark:text-gray-300">
                  {results.isDeepfake ? (
                    <>
                      <span className="font-medium">Warning:</span> This voice sample shows strong indicators of synthetic manipulation. 
                      We recommend verifying the source and requesting additional authentication.
                    </>
                  ) : (
                    <>
                      This voice sample appears authentic with high confidence. 
                      No additional verification is recommended at this time.
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={downloadReport}
                className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all"
              >
                <FiDownload className="mr-2" /> Download Full Report
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => shareReport("email")}
                className="flex items-center px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium transition-all"
              >
                <FiMail className="mr-2" /> Share via Email
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => shareReport("whatsapp")}
                className="flex items-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all"
              >
                <FiShare2 className="mr-2" /> Share via WhatsApp
              </motion.button>
            </div>

            {results.isDeepfake && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSourceIdentification}
                className="flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all mt-4"
              >
                Identify Source
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSourceIdentification && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-8 relative"
            >
              {isIdentifying ? (
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="relative w-24 h-24 mx-auto mb-6"
                  >
                    <div className="absolute inset-0 rounded-full bg-blue-100 dark:bg-blue-900 opacity-75"></div>
                    <div className="absolute inset-2 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center">
                      <FiGlobe className="w-12 h-12 text-blue-600 dark:text-blue-300" />
                    </div>
                  </motion.div>
                  <h3 className="text-2xl font-semibold mb-2 dark:text-white">Identifying Source</h3>
                  <p className="text-gray-500 dark:text-gray-400">Tracing origin of synthetic voice...</p>
                </div>
              ) : sourceDetails ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="absolute top-4 right-4">
                    <button 
                      onClick={closeSourceIdentification}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                  <h3 className="text-2xl font-bold mb-6 dark:text-white">Source Identification</h3>
                  <div className="space-y-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                    <div className="flex items-center space-x-4">
                      <FiUser className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-300">Name</p>
                        <p className="font-semibold dark:text-white">{sourceDetails.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <FiGlobe className="w-6 h-6 text-green-600 dark:text-green-300" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-300">IP Address</p>
                        <p className="font-semibold dark:text-white">{sourceDetails.ipAddress}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <FiSmartphone className="w-6 h-6 text-purple-600 dark:text-purple-300" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-300">Phone Number</p>
                        <p className="font-semibold dark:text-white">{sourceDetails.phoneNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <FiMapPin className="w-6 h-6 text-red-600 dark:text-red-300" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-300">Location</p>
                        <p className="font-semibold dark:text-white">{sourceDetails.location}</p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 text-right mt-2">
                      {sourceDetails.timestamp}
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Detection;