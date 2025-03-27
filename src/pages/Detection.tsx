import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUpload, FiMic, FiRefreshCw, FiActivity, FiLink, FiVideo } from 'react-icons/fi';

interface AnalysisFeature {
  name: string;
  value: number;
}

interface AnalysisResults {
  isDeepfake: boolean;
  confidence: number;
  features: AnalysisFeature[];
  sourceType: 'audio' | 'video';
}

const Detection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
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

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl.trim()) return;
    
    // Simulate analyzing from URL
    analyzeFromUrl(videoUrl);
  };

  const analyzeFile = async (file: File) => {
    setIsAnalyzing(true);
    
    try {
      // Simulate API call
      const formData = new FormData();
      formData.append("file", file);
      
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
        ],
        sourceType: file.type.startsWith('video/') ? 'video' : 'audio'
      };

      setResults(data);
    } catch (error) {
      console.error("Error analyzing file:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeFromUrl = async (url: string) => {
    setIsAnalyzing(true);
    
    try {
      // Simulate API call for URL analysis using the provided URL
      console.log(`Analyzing video from URL: ${url}`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      const data: AnalysisResults = {
        isDeepfake: Math.random() > 0.7,
        confidence: Math.floor(Math.random() * 20) + 80,
        features: [
          { name: "Visual Artifacts", value: Math.floor(Math.random() * 20) + 80 },
          { name: "Facial Movement", value: Math.floor(Math.random() * 20) + 80 },
          { name: "Lip Sync Accuracy", value: Math.floor(Math.random() * 20) + 80 },
          { name: "Frame Consistency", value: Math.floor(Math.random() * 20) + 80 }
        ],
        sourceType: 'video'
      };

      setResults(data);
    } catch (error) {
      console.error("Error analyzing URL:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  function resetAnalysis(): void {
    setFile(null);
    setVideoUrl('');
    setResults(null);
    setIsAnalyzing(false);
    setActiveTab('upload');
  }

  const startRecording = () => {
    setIsRecording(true);
    // Simulate recording process
    setTimeout(() => {
      setIsRecording(false);
      alert('Recording completed!');
    }, 5000); // Simulate a 5-second recording
  };

  return (
    <div className="container mx-auto px-4 pt-28 py-12">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl md:text-4xl font-bold mb-8 dark:text-white"
      >
        Deepfake Detection
      </motion.h1>

      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          onClick={() => setActiveTab('upload')}
          className={`px-4 py-2 font-medium text-sm flex items-center ${activeTab === 'upload' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500' : 'text-gray-500 dark:text-gray-400'}`}
        >
          <FiUpload className="mr-2" /> Upload File
        </button>
        <button
          onClick={() => setActiveTab('url')}
          className={`px-4 py-2 font-medium text-sm flex items-center ${activeTab === 'url' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500' : 'text-gray-500 dark:text-gray-400'}`}
        >
          <FiLink className="mr-2" /> Video URL
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!file && !results && !isAnalyzing && activeTab === 'upload' && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 mb-8 border border-gray-100 dark:border-gray-700"
          >
            {/* Existing file upload UI */}
            <div 
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-12 text-center cursor-pointer hover:border-blue-500 transition-all duration-300"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <FiUpload className="mx-auto w-12 h-12 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Upload Media File</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">Drag & drop an audio/video file here, or click to browse</p>
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                Select File
              </button>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="audio/*,video/*"
                className="hidden" 
              />
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-4">Or record audio directly</p>
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

        {!file && !results && !isAnalyzing && activeTab === 'url' && (
          <motion.div
            key="url"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 mb-8 border border-gray-100 dark:border-gray-700"
          >
            <form onSubmit={handleUrlSubmit}>
              <div className="mb-6">
                <label htmlFor="videoUrl" className="block text-sm font-medium mb-2 dark:text-gray-300">
                  Video URL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiVideo className="text-gray-400" />
                  </div>
                  <input
                    type="url"
                    id="videoUrl"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="pl-10 w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="https://example.com/video.mp4"
                    required
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Supports YouTube, Vimeo, and direct video links
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <FiActivity className="mr-2" /> Analyze Video
              </motion.button>
            </form>
          </motion.div>
        )}

        {/* Keep existing isAnalyzing and results sections */}
        {isAnalyzing && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 mb-8 border border-gray-100 dark:border-gray-700 text-center"
          >
            <h3 className="text-xl font-semibold dark:text-white mb-4">Analyzing...</h3>
            <p className="text-gray-500 dark:text-gray-400">Please wait while we process your file.</p>
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
                <p className="text-gray-500 dark:text-gray-400">
                  {results.sourceType === 'video' ? 'Video analysis' : 'Audio analysis'}
                </p>
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

            {/* Update results display based on source type */}
            {results.sourceType === 'video' && (
              <div className="mb-6 bg-black rounded-xl overflow-hidden">
                {/* Video preview placeholder */}
                <div className="aspect-w-16 aspect-h-9 flex items-center justify-center bg-gray-800 text-white p-12">
                  <FiVideo className="w-16 h-16 text-gray-400" />
                  <p className="ml-4">Video Preview</p>
                </div>
              </div>
            )}

            {/* Rest of the results UI remains the same */}
            {/* ... */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Detection;