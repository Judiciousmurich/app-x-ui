'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingCart, Menu, X, ChefHat, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useUser } from '@/context/UserContext';
import Image from 'next/image';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state } = useCart();
  const { user, isAdmin, logout } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/plans', label: 'Plans' },
    { path: '/meals', label: 'Menu' },
  ];

  const handleDashboard = () => {
    if (isAdmin) {
      router.push('/admin');
    } else if (user) {
      router.push('/dashboard');
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            {/* <ChefHat className="h-8 w-8 text-primary-600 group-hover:text-primary-700 transition-colors" /> */}
            <Image
              src="/logo.png" // update with your actual logo path inside public/
              alt="Foodies Kitchen Logo"
              width={40}
              height={40}
              className="rounded-full" // optional styling
            />
            <span className="text-xl font-bold text-gray-800">Foodies Kitchen</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`font-medium transition-colors hover:text-primary-600 ${pathname === link.path
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-700'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart */}
            <Link
              href="/checkout"
              className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {state.totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-medium animate-bounce-gentle">
                  {state.totalItems}
                </span>
              )}
            </Link>

            {/* User Actions */}
            {user ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleDashboard}
                  className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>{isAdmin ? 'Admin' : 'Dashboard'}</span>
                </button>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/auth/login"
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block font-medium transition-colors hover:text-primary-600 ${pathname === link.path
                  ? 'text-primary-600'
                  : 'text-gray-700'
                  }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-gray-200 pt-4">
              <Link
                href="/checkout"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors mb-3"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Cart ({state.totalItems})</span>
              </Link>

              {user ? (
                <div className="space-y-2">
                  <button
                    onClick={handleDashboard}
                    className="w-full text-left bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    {isAdmin ? 'Admin Dashboard' : 'My Dashboard'}
                  </button>
                  <button
                    onClick={() => { logout(); setIsMenuOpen(false); }}
                    className="w-full text-left text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    href="/auth/login"
                    className="w-full text-left text-gray-700 hover:text-primary-600 transition-colors block"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors block text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;