import Link from "next/link"
import { Mail, Phone, MessageCircle } from "lucide-react"

export default function MinimalFooter() {
  return (
    <footer className="border-t py-12 bg-gray-50">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Contact Information */}
        <div id="contact" className="mb-8">
          <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">Contact Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Email</p>
                <a 
                  href="mailto:edustechenterprise@gmail.com" 
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  edustechenterprise@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Fax</p>
                <a 
                  href="tel:+233270006157" 
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  +233 27000 6157
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">WhatsApp</p>
                <a 
                  href="https://wa.me/233270006157" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  +233 27000 6157
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-sm text-gray-600">© 2025 EDUSTECH ENTERPRISE. All rights reserved.</p>
          <nav className="flex items-center gap-4">
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-black transition-colors">Privacy</Link>
            <Link href="/terms" className="text-sm text-gray-600 hover:text-black transition-colors">Terms</Link>
            <Link href="#contact" className="text-sm text-gray-600 hover:text-black transition-colors">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
