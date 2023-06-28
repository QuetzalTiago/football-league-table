import React from "react";

const Footer = ({ version }) => {
  return (
    <footer className="footer custom-footer">
      <div className="api-version">
        <strong>{`API Version: ${version}`}</strong>
      </div>
    </footer>
  );
};

export default Footer;
