// Spinner.tsx
import React from 'react';

const Spinner: React.FC = () => (
  <div className="loader"></div>
);

// Add some CSS to style the spinner
const styles = `
  .loader {
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top: 4px solid white;
    width: 24px;
    height: 24px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Inject the styles into the component
const SpinnerWithStyle: React.FC = () => (
  <>
    <style>{styles}</style>
    <Spinner />
  </>
);

export default SpinnerWithStyle;
