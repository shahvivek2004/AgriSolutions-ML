import React from 'react';

const Card = ({ children, className }) => {
  return (
    <div className={`rounded-lg shadow-lg p-6 ${className}`}>
      {children}
    </div>
  );
};

const CardHeader = ({ children }) => {
  return (
    <div className="mb-4 border-b pb-2 font-bold text-lg">
      {children}
    </div>
  );
};

const CardTitle = ({ children }) => {
  return <div className="text-2xl font-bold mb-2">{children}</div>;
};

const CardContent = ({ children }) => {
  return <div>{children}</div>;
};

export { Card, CardHeader, CardTitle, CardContent };