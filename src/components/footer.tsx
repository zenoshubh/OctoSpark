"use client";

import { Github, Twitter, Linkedin, Mail, Heart, Coffee } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-900/50 backdrop-blur-xl border-t border-gray-800/50">
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 text-xs sm:text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5 relative">
                <Image
                  src="/OctoSpark_Final.png"
                  alt="OctoSpark Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-center sm:text-left">
                © {currentYear} OCTOSPARK.
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <span>Made with</span>
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 fill-current" />
              <span>for the developer community.</span>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-3 sm:space-x-4">
            <Link
              href="https://github.com/zenoshubh"
              className="w-9 h-9 sm:w-8 sm:h-8 bg-gray-800/50 hover:bg-gray-700/50 rounded-md flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 active:scale-95"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4 sm:w-4 sm:h-4" />
            </Link>
            <Link
              href="https://x.com/zenoshubh"
              className="w-9 h-9 sm:w-8 sm:h-8 bg-gray-800/50 hover:bg-gray-700/50 rounded-md flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 active:scale-95"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="w-4 h-4 sm:w-4 sm:h-4" />
            </Link>
            <Link
              href="https://linkedin.com/in/zenoshubh"
              className="w-9 h-9 sm:w-8 sm:h-8 bg-gray-800/50 hover:bg-gray-700/50 rounded-md flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 active:scale-95"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-4 h-4 sm:w-4 sm:h-4" />
            </Link>
            <Link
              href="mailto:zenoshubh@gmail.com"
              className="w-9 h-9 sm:w-8 sm:h-8 bg-gray-800/50 hover:bg-gray-700/50 rounded-md flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 active:scale-95"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail className="w-4 h-4 sm:w-4 sm:h-4" />
            </Link>
            <Link
              href="https://buymeacoffee.com/zenoshubh"
              className="w-9 h-9 sm:w-8 sm:h-8 bg-gray-800/50 hover:bg-gray-700/50 rounded-md flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 active:scale-95"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Coffee className="w-4 h-4 sm:w-4 sm:h-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
