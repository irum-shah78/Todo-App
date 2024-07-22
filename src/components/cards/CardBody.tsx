// import React from 'react';

// const CardBody: React.FC = ({ children }) => (
//   <div className="card-body">
//     {children}
//   </div>
// );

// export default CardBody;


import React, { ReactNode } from 'react';

interface CardBodyProps {
  children: ReactNode; // ReactNode can be any valid React node
}

const CardBody: React.FC<CardBodyProps> = ({ children }) => (
  <div className="card-body">
    {children}
  </div>
);

export default CardBody;
