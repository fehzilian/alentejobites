import React from 'react';

// --- Buttons ---

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-md text-sm md:text-base";
  
  const variants = {
    primary: "bg-terracotta text-white hover:bg-olive border-2 border-transparent",
    secondary: "bg-transparent border-2 border-white text-white hover:bg-white hover:text-olive",
    outline: "bg-transparent border-2 border-olive text-olive hover:bg-olive hover:text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// --- Section Wrapper ---

interface SectionProps {
  className?: string;
  children: React.ReactNode;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({ className = '', children, id }) => (
  <section id={id} className={`py-20 px-4 md:px-8 ${className}`}>
    <div className="max-w-6xl mx-auto">
      {children}
    </div>
  </section>
);

// --- Typography ---

export const SectionTitle: React.FC<{ children: React.ReactNode, subtitle?: string }> = ({ children, subtitle }) => (
  <div className="text-center mb-16">
    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-olive mb-4 font-semibold">
      {children}
    </h2>
    {subtitle && (
      <p className="text-gray-500 text-lg md:text-xl italic font-serif">
        {subtitle}
      </p>
    )}
    <div className="w-24 h-1 bg-gold mx-auto mt-6 rounded-full opacity-60"></div>
  </div>
);

// --- Modal ---

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-6 text-4xl text-gray-400 hover:text-terracotta transition-colors leading-none z-10"
        >
          &times;
        </button>
        <div className="p-8 md:p-10">
          <h2 className="font-serif text-3xl text-olive mb-6 border-b pb-4 border-gold/20 pr-8">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
};

// --- Drawer (Mobile Bottom Sheet) ---

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children }) => {
  // Prevent body scroll when drawer is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.2)] transform transition-transform duration-300 max-h-[85vh] overflow-y-auto animate-slideDown">
        <div className="sticky top-0 bg-white z-10 pt-4 pb-2 flex justify-center border-b border-gray-100">
             <div className="w-12 h-1.5 bg-gray-300 rounded-full mb-2"></div>
        </div>
        <button 
             onClick={onClose}
             className="absolute top-4 right-6 text-gray-400 text-2xl"
        >
            &times;
        </button>
        <div className="p-6 pb-24">
            {children}
        </div>
      </div>
    </>
  );
};