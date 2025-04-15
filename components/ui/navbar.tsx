// import Link from "next/link";
// import Image from "next/image";

// export default function Navbar() {
//   return (
//     <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between p-4 bg-white shadow-md">
//       {/* Left - Menu & Logo */}
//       <div className="flex items-center gap-2">
//         {/* Hamburger Menu */}
//         <button className="p-2 text-gray-600 hover:text-gray-900">
//           ☰ {/* Hamburger Menu Icon */}
//         </button>

//         {/* Logo inside a circular container */}
//         <Link href="/">
//           <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 overflow-hidden">
//             <Image
//               src="/logo.svg" // Ensure the logo is in the /public folder
//               alt="Logo"
//               width={30}
//               height={30}
//               className="object-contain"
//             />
//           </div>
//         </Link>
//       </div>

//       {/* Center - Search Bar */}
//       <div className="flex flex-grow mx-4 max-w-xl">
//         <input
//           type="text"
//           placeholder="Search products and stores"
//           className="w-full px-4 py-2 border rounded-full bg-gray-100"
//         />
//       </div>

//       {/* Right - Authentication Buttons */}
//       <div className="flex items-center gap-4">
//         <Link href="/auth/login">
//           <button className="px-4 py-2 text-gray-700 hover:text-black">Log in</button>
//         </Link>
//         <Link href="/auth/register">
//           <button className="px-4 py-2 text-white bg-green-600 rounded-full hover:bg-green-700">
//             Sign up
//           </button>
//         </Link>
//       </div>
//     </nav>
//   );
// }
