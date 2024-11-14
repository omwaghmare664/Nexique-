import React from "react";

function NotFound() {
  return (
    <>
      <div className="error">404</div>
      <br />
      <br />
      <span className="info">File not found</span>
      <img
        src="https://www.seekpng.com/png/detail/825-8254341_404-error-not-found.png"
        className="static"
      />
    </>
  );
}

export default NotFound;
