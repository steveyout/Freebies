import React from 'react';
import { 
  ShieldCheck, 
  Tv, 
  Laptop, 
  BookOpen, 
  Code, 
  Palette, 
  Sparkles, 
  Gamepad2, 
  Wrench, 
  Layers,
  Terminal,
  Cpu,
  Bot,
  Film,
  Library,
  Compass,
  Boxes,
  Home
} from 'lucide-react';

export const getCategoryIcon = (iconName: string, className = "w-4 h-4") => {
  switch (iconName) {
    case 'Home':
      return <Home className={className} />;
    case 'ShieldCheck':
      return <ShieldCheck className={className} />;
    case 'Tv':
      return <Tv className={className} />;
    case 'Film':
      return <Film className={className} />;
    case 'Laptop':
      return <Laptop className={className} />;
    case 'BookOpen':
      return <BookOpen className={className} />;
    case 'Library':
      return <Library className={className} />;
    case 'Code':
      return <Code className={className} />;
    case 'Terminal':
      return <Terminal className={className} />;
    case 'Palette':
      return <Palette className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'Bot':
      return <Bot className={className} />;
    case 'Gamepad2':
      return <Gamepad2 className={className} />;
    case 'Wrench':
      return <Wrench className={className} />;
    case 'Cpu':
      return <Cpu className={className} />;
    case 'Boxes':
      return <Boxes className={className} />;
    default:
      return <Compass className={className} />;
  }
};
