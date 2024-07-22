// import React from 'react';

// const CardHeader: React.FC = ({ children }) => (
//   <div className="card-header">
//     {children}
//   </div>
// );

// export default CardHeader;


import React, { ReactNode } from 'react';

interface CardHeaderProps {
  children: ReactNode; // ReactNode can be any valid React node
}

const CardHeader: React.FC<CardHeaderProps> = ({ children }) => (
  <div className="card-header">
    {children}
  </div>
);

export default CardHeader;
