import React from "react";

const LoadingIcon = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="spinner-grow" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingIcon;
