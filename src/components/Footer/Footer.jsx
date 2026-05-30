import { Link } from 'react-router-dom';

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const TikTokIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 gap-8">

          {/* Column 1 — Logo + Socials */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="text-lg font-bold tracking-widest uppercase text-gray-900 no-underline">
              Tachles
            </Link>
            <p className="text-sm text-gray-500">
              Comics & clothes for those who live the story.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Instagram" className="p-2 rounded-md border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-400 transition-colors">
                <InstagramIcon />
              </a>
              <a href="#" aria-label="Twitter / X" className="p-2 rounded-md border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-400 transition-colors">
                <TwitterIcon />
              </a>
              <a href="#" aria-label="TikTok" className="p-2 rounded-md border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-400 transition-colors">
                <TikTokIcon />
              </a>
              <a href="#" aria-label="YouTube" className="p-2 rounded-md border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-400 transition-colors">
                <YoutubeIcon />
              </a>
            </div>
          </div>

          {/* Column 2 — Legal */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-400">
              Legal
            </p>
            <nav className="flex flex-col gap-2">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors no-underline">Terms & Conditions</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors no-underline">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors no-underline">Cookie Policy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors no-underline">Return Policy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors no-underline">Accessibility</a>
            </nav>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Tachles. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
