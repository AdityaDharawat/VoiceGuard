import { createContext, useContext, useState } from 'react';

interface ScanResult {
  id: number;
  date: string;
  name: string;
  result: boolean;
  confidence: number;
}

interface DetectionContextType {
  recentScans: ScanResult[];
  addScanResult: (result: Omit<ScanResult, 'id'>) => void;
}

const DetectionContext = createContext<DetectionContextType>({
  recentScans: [],
  addScanResult: () => {},
});

export const useDetection = () => useContext(DetectionContext);

export const DetectionProvider = ({ children }: { children: React.ReactNode }) => {
  const [recentScans, setRecentScans] = useState<ScanResult[]>([]);

  const addScanResult = (result: Omit<ScanResult, 'id'>) => {
    const newScan: ScanResult = {
      id: Date.now(),
      ...result,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
    };
    setRecentScans(prev => [newScan, ...prev].slice(0, 50)); // Keep last 50 scans
  };

  return (
    <DetectionContext.Provider value={{ recentScans, addScanResult }}>
      {children}
    </DetectionContext.Provider>
  );
};
