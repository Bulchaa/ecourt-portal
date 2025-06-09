import { Scale } from 'lucide-react';
import type React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2 p-4">
      <Scale className="h-8 w-8 text-primary" />
      <h1 className="text-xl font-bold font-headline text-primary">E-Court Portal</h1>
    </div>
  );
};

export default Logo;
