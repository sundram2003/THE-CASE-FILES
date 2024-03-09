import React from "react";

function Footer() {
  return (
    <div>
      {/* Your existing content here */}

      <footer
        className="bg-gray-900 p-2 text-white text-center"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
        }}
      >
        {/* Footer content goes here */}
        <p>&copy; 2024 CredLock. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Footer;
