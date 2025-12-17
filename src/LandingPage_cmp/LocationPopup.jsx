import { useState } from "react";

export default function LocationPopup() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ====== TEXT THAT OPENS POPUP ====== */}
      <span
  onClick={() => setOpen(true)}
  className="cursor-pointer text-[#278659] font-medium relative group flex items-center gap-1"
>
  {/* Custom Pin Icon */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
    />
  </svg>

  Malacca, Malaysia

  {/* Hover underline */}
  <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-[#278659] transition-all duration-300 group-hover:w-full"></span>
</span>


      {/* ====== POPUP OVERLAY ====== */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[70%] h-[70%] relative">

            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute right-2 top-2 text-white bg-[#278659] hover:bg-[#11452E] px-2 py-1 rounded"
            >
              Close
            </button>

            {/* Google Map Embed */}
            <iframe
              className="w-full h-full rounded-b-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127536.69933667635!2d102.15528915138999!3d2.209323950000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d1ee21b8a3c459%3A0x1d9d8658c1a8f2c4!2sMalacca!5e0!3m2!1sen!2smy!4v1700000000000"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}
