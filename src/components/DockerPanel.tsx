import React from 'react';
import { Container } from 'lucide-react';

const DockerPanel = () => {
  return (
    <div className="p-4 text-white">
      <div className="flex items-center gap-2 mb-4">
        <Container className="w-6 h-6 text-blue-400" />
        <h2 className="text-lg font-bold">Docker</h2>
      </div>
      <div className="bg-[#2d2d2d] border border-[#3c3c3c] rounded-lg p-3">
        <p className="text-sm text-[#cccccc]">Docker extension is active.</p>
        <p className="text-xs text-[#6e7681] mt-2">
          This panel is dynamically loaded because the Docker extension is installed.
          Future features like container lists, image management, etc., would be displayed here.
        </p>
      </div>
    </div>
  );
};

export default DockerPanel;
