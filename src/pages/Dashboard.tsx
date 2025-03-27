// pages/Dashboard.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { FiDownload, FiFilter, FiAlertCircle, FiCheckCircle, FiPlayCircle, FiStopCircle } from 'react-icons/fi';

Chart.register(...registerables);

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('monthly');
  const [playingScans, setPlayingScans] = useState<number[]>([]);

  const handlePlay = (id: number) => {
    setPlayingScans((prev) =>
      prev.includes(id) ? prev.filter((scanId) => scanId !== id) : [...prev, id]
    );
  };

  const WaveAnimation = () => (
    <div className="wave-container flex items-center space-x-1 h-6">
      {[1, 2, 3, 4].map((wave) => (
        <motion.div
          key={wave}
          className="wave h-full w-1 bg-blue-500 rounded-full"
          animate={{
            height: ['50%', '100%', '50%'],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: wave * 0.2,
          }}
        />
      ))}
    </div>
  );

  // Sample data
  const detectionData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Deepfake Detections',
        data: [12, 19, 15, 27, 22, 18, 25],
        borderColor: '#5E5ADB',
        backgroundColor: 'rgba(94, 90, 219, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const riskData = {
    labels: ['High Risk', 'Medium Risk', 'Low Risk'],
    datasets: [
      {
        data: [47, 33, 20],
        backgroundColor: ['#EF4444', '#F59E0B', '#10B981'],
        borderWidth: 0,
      },
    ],
  };

  const analysisData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Deepfakes',
        data: [12, 19, 15, 27, 22, 18],
        backgroundColor: '#5E5ADB',
        borderRadius: 6,
      },
      {
        label: 'Authentic',
        data: [88, 81, 85, 73, 78, 82],
        backgroundColor: '#10B981',
        borderRadius: 6,
      },
    ],
  };

  const recentScans = [
    { id: 1, date: '2024-03-15', name: 'voice_sample_1.wav', result: true, confidence: 97 },
    { id: 2, date: '2024-03-14', name: 'voice_sample_2.wav', result: false, confidence: 23 },
    { id: 3, date: '2024-03-13', name: 'voice_sample_3.wav', result: true, confidence: 92 },
    { id: 4, date: '2024-03-12', name: 'voice_sample_4.wav', result: true, confidence: 98 },
    { id: 5, date: '2024-03-11', name: 'voice_sample_5.wav', result: false, confidence: 15 },
  ];

  return (
    <div className="container mx-auto px-4 pt-28 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold dark:text-white"
        >
          Detection Analytics
        </motion.h1>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="relative">
          <select 
  value={timeRange}
  onChange={(e) => setTimeRange(e.target.value)}
  className="appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg pl-4 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
>
  <option className="text-white" value="weekly">Weekly</option>
  <option className="text-white" value="monthly">Monthly</option>
  <option className="text-white" value="quarterly">Quarterly</option>
</select>

            <FiFilter className="absolute right-3 top-2.5 text-gray-400" />
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
            <FiDownload className="mr-2" /> Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow border border-gray-100 dark:border-gray-700"
        >
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Total Scans</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">1,234</h3>
          <p className="text-sm text-green-500">+12.5% from last month</p>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow border border-gray-100 dark:border-gray-700"
        >
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Deepfakes Detected</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">89</h3>
          <p className="text-sm text-green-500">+8.2% from last month</p>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow border border-gray-100 dark:border-gray-700"
        >
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Detection Accuracy</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">98.2%/</h3>
          <p className="text-sm text-green-500">+0.3% improvement</p>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow border border-gray-100 dark:border-gray-700"
        >
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Avg. Processing Time</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">2.4s</h3>
          <p className="text-sm text-green-500">-0.8s from last month</p>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Detection Trends</h3>
          <div className="h-64">
            <Line 
              data={detectionData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  y: { beginAtZero: true, grid: { color: 'rgba(0, 0, 0, 0.05)' } },
                  x: { grid: { display: false } }
                }
              }} 
            />
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Risk Distribution</h3>
          <div className="h-64">
            <Doughnut 
              data={riskData} 
              options={{
                cutout: '70%',
                plugins: { legend: { position: 'right' } },
                maintainAspectRatio: false
              }} 
            />
          </div>
        </motion.div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 mb-8">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Detection vs Authentic</h3>
        <div className="h-64">
          <Bar 
            data={analysisData} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { position: 'top' } },
              scales: {
                x: { stacked: true, grid: { display: false } },
                y: { stacked: true, grid: { color: 'rgba(0, 0, 0, 0.05)' } }
              }
            }} 
          />
        </div>
      </div>

      {/* Recent Scans */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold dark:text-white">Recent Scans</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-100 dark:border-gray-700">
                <th className="p-4 text-sm font-medium text-gray-600 dark:text-gray-300">Date</th>
                <th className="p-4 text-sm font-medium text-gray-600 dark:text-gray-300">File Name</th>
                <th className="p-4 text-sm font-medium text-gray-600 dark:text-gray-300">Result</th>
                <th className="p-4 text-sm font-medium text-gray-600 dark:text-gray-300">Confidence</th>
                <th className="p-4 text-sm font-medium text-gray-600 dark:text-gray-300">Play</th>
              </tr>
            </thead>
            <tbody>
              {recentScans.map((scan) => (
                <tr key={scan.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="p-4 text-sm dark:text-white">{scan.date}</td>
                  <td className="p-4 text-sm dark:text-white">{scan.name}</td>
                  <td className="p-4">
                    {scan.result ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                        <FiCheckCircle className="mr-1" /> Authentic
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
                        <FiAlertCircle className="mr-1" /> Deepfake
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-sm dark:text-white">{scan.confidence}%</td>
                  <td className="p-4 flex items-center space-x-2">
                    <button
                      onClick={() => handlePlay(scan.id)}
                      className="flex items-center px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      {playingScans.includes(scan.id) ? (
                        <>
                          <FiStopCircle className="mr-1" /> Stop
                        </>
                      ) : (
                        <>
                          <FiPlayCircle className="mr-1" /> Play
                        </>
                      )}
                    </button>
                    {playingScans.includes(scan.id) && <WaveAnimation />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;