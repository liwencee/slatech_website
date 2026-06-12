"use client";

/**
 * Floating WhatsApp button — always-on backup contact.
 *
 * Sits bottom-LEFT so it never overlaps the Tawk.to live-chat bubble
 * (which renders bottom-right). Opens a WhatsApp chat to the Slatech
 * line with a friendly pre-filled message.
 */
const WHATSAPP_NUMBER = "2348076172456";
const PREFILL =
  "Hello Slatech Solutions! 👋 I'd like to know more about your services.";

export function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PREFILL)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 left-5 z-50 flex items-center gap-3"
    >
      {/* Tooltip label — shows on hover (desktop) */}
      <span className="hidden sm:block max-w-0 overflow-hidden whitespace-nowrap rounded-full bg-white px-0 py-2 text-sm font-semibold text-gray-800 opacity-0 shadow-lg transition-all duration-300 group-hover:max-w-xs group-hover:px-4 group-hover:opacity-100">
        Chat on WhatsApp
      </span>

      {/* Button */}
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-green-600/30 transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
        {/* Pulse ring */}
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-40" />
        <svg
          viewBox="0 0 32 32"
          className="relative h-8 w-8 fill-white"
          aria-hidden="true"
        >
          <path d="M16.004 2.667c-7.36 0-13.333 5.973-13.333 13.333 0 2.347.613 4.64 1.776 6.661L2.667 29.333l6.84-1.792a13.27 13.27 0 0 0 6.497 1.654h.005c7.355 0 13.333-5.973 13.333-13.333 0-3.563-1.387-6.911-3.91-9.434a13.24 13.24 0 0 0-9.433-3.761Zm0 24.405h-.004a11.06 11.06 0 0 1-5.638-1.544l-.404-.24-4.06 1.064 1.083-3.957-.263-.406a11.03 11.03 0 0 1-1.692-5.889c0-6.117 4.977-11.094 11.099-11.094 2.964 0 5.749 1.155 7.844 3.252a11.02 11.02 0 0 1 3.25 7.847c0 6.118-4.977 11.094-11.098 11.094Zm6.088-8.31c-.333-.167-1.974-.974-2.28-1.085-.305-.111-.528-.167-.75.167-.223.333-.861 1.085-1.056 1.308-.195.222-.389.25-.722.083-.333-.167-1.408-.519-2.682-1.655-.991-.884-1.66-1.977-1.855-2.31-.194-.334-.02-.514.146-.68.15-.149.333-.389.5-.584.166-.194.222-.333.333-.555.111-.223.056-.417-.028-.584-.083-.167-.75-1.808-1.027-2.475-.27-.65-.546-.562-.75-.572l-.639-.011a1.23 1.23 0 0 0-.889.417c-.305.333-1.166 1.139-1.166 2.78 0 1.64 1.194 3.225 1.36 3.448.167.222 2.35 3.588 5.694 5.031.796.344 1.417.55 1.9.704.799.254 1.526.218 2.101.132.641-.096 1.974-.807 2.252-1.586.277-.78.277-1.448.194-1.587-.083-.139-.305-.222-.638-.389Z" />
        </svg>
      </span>
    </a>
  );
}
