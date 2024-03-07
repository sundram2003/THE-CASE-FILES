// import "./App.css";
// import "./index.css";
// function App() {
//   return (
//     <h1 className="text-3xl text-blue-950 font-bold underline">CredLock</h1>
//   );
// }

// export default App;


// import React from 'react';
// import "./App.css";
// import "./index.css";

// function App() {
//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Top Navigation Bar */}
//       <nav className="flex justify-between items-center bg-gray-900 p-4">
//         {/* Logo or Website Name */}
//         <h1 className="text-xl text-white font-bold">CredLock</h1>

//         {/* Navigation Buttons */}
//         <div className="flex space-x-4">
//           <button className="text-white hover:text-blue-500">Button 1</button>
//           <button className="text-white hover:text-blue-500">Button 2</button>
//           <button className="text-white hover:text-blue-500">Button 3</button>
//         </div>

//         {/* Search Bar */}
//         <div>
//           <input type="text" placeholder="Search..." className="px-2 py-1 rounded-lg border-none focus:outline-none" />
//           <button className="bg-blue-500 text-white px-2 py-1 rounded-lg ml-2">Search</button>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="flex-1 container mx-auto mt-4">
//         {/* Your main content goes here */}
//         <h1 className="text-3xl text-blue-950 font-bold underline">Welcome to CredLock</h1>
//         {/* Example content */}
//         <p>This is your homepage content.</p>
//       </div>

//       {/* Footer Navigation Bar */}
//       <footer className="bg-gray-900 p-4 text-white text-center">
//         {/* Footer content goes here */}
//         <p>&copy; 2024 CredLock. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

// export default App;
import React from 'react';
import "./App.css";
import "./index.css";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation Bar */}
      <nav className="flex justify-between items-center bg-gray-900 p-4">
        {/* Logo */}
        <img src="path_to_your_logo.png" alt="Logo" className="w-10 h-10" />

        {/* Navigation Buttons */}
        <div className="flex space-x-4">
          <button className="text-white hover:text-blue-500">Button 1</button>
          <button className="text-white hover:text-blue-500">Button 2</button>
          <button className="text-white hover:text-blue-500">Button 3</button>
        </div>

        {/* Search Bar */}
        <div>
          <input type="text" placeholder="Search..." className="px-2 py-1 rounded-lg border-none focus:outline-none" />
          <button className="bg-blue-500 text-white px-2 py-1 rounded-lg ml-2">Search</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 container mx-auto mt-4">
        {/* Your main content goes here */}
        <h1 className="text-3xl text-blue-950 font-bold underline">Welcome to CredLock</h1>
        {/* Example content */}
        <p>This is your homepage content.</p>
      </div>

      {/* Footer Navigation Bar */}
      <footer className="bg-gray-900 p-4 text-white text-center">
        {/* Footer content goes here */}
        <p>&copy; 2024 CredLock. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
