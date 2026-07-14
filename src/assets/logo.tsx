// export function Logo({
//   className = "h-10 w-10",
// }: {
//   className?: string;
// }) {
//   return (
//     <svg
//       viewBox="170 100 120 120"
//       xmlns="http://www.w3.org/2000/svg"
//       className={className}
//       fill="none"
//     >
//       <defs>
//         <linearGradient
//           id="pulse-gradient"
//           x1="0%"
//           y1="0%"
//           x2="100%"
//           y2="100%"
//         >
//           <stop offset="0%" stopColor="#5B9BFF" />
//           <stop offset="100%" stopColor="#2B4C8C" />
//         </linearGradient>
//       </defs>

//       <rect
//         x="170"
//         y="100"
//         width="120"
//         height="120"
//         rx="28"
//         fill="url(#pulse-gradient)"
//       />

//       <path
//         d="M188 160L210 160L222 128L234 160L252 160"
//         stroke="#F4F7FD"
//         strokeWidth={7}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />

//       <circle
//         cx="264"
//         cy="160"
//         r="7"
//         fill="#F4F7FD"
//       />
//     </svg>
//   );
// }


export function Logo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient
          id="pulse-gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#5B9BFF" />
          <stop offset="100%" stopColor="#2B4C8C" />
        </linearGradient>
      </defs>

      <rect
        width="120"
        height="120"
        rx="28"
        fill="url(#pulse-gradient)"
      />

      <path
        d="M18 60H40L52 28L64 60H82"
        fill="none"
        stroke="#F4F7FD"
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle
        cx="94"
        cy="60"
        r="7"
        fill="#F4F7FD"
      />
    </svg>
  );
}