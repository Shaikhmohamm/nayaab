import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 border-t text-sm">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10 flex flex-col gap-6 md:grid md:grid-cols-4 md:gap-10">
        
        {/* Company Info */}
        <div className="text-center md:text-left">
          <h3 className="text-base font-bold mb-2">Nayaab Enterprises</h3>
          <p className="text-xs leading-relaxed">
            Quality products delivered to your doorstep.
          </p>
        </div>

        {/* Company Links */}
        <div className="text-center md:text-left">
          <h4 className="text-base font-semibold mb-2">Company</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-blue-600 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Blog</a></li>
          </ul>
        </div>

        {/* Support Links */}
        <div className="text-center md:text-left">
          <h4 className="text-base font-semibold mb-2">Support</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-blue-600 transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Returns</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="text-center md:text-left">
          <h4 className="text-base font-semibold mb-2">Follow Us</h4>
          <div className="flex justify-center md:justify-start gap-3">
            <a href="#" className="border rounded-full p-1.5 hover:bg-blue-600 hover:text-white transition-colors">
              <FaFacebook />
            </a>
            <a href="#" className="border rounded-full p-1.5 hover:bg-blue-600 hover:text-white transition-colors">
              <FaTwitter />
            </a>
            <a href="#" className="border rounded-full p-1.5 hover:bg-blue-600 hover:text-white transition-colors">
              <FaInstagram />
            </a>
            <a href="#" className="border rounded-full p-1.5 hover:bg-blue-600 hover:text-white transition-colors">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t mt-6 pt-4 text-center text-xs text-gray-500 px-4">
        &copy; {new Date().getFullYear()} Nayaab Enterprises. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
