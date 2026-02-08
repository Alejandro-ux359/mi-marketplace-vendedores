"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcStripe,
  FaCcApplePay,
} from "react-icons/fa6";
import { LiaCcAmex } from "react-icons/lia";
import { FaGooglePay } from "react-icons/fa6";
import { SiZelle } from "react-icons/si";

export default function Footer() {
  // React Icons para métodos de pago
  const paymentIcons = [
    <FaCcVisa key="visa" className="text-gray-300 dark:text-white w-14 h-8" />,
    <FaCcMastercard
      key="mc"
      className="text-gray-300 dark:text-white w-14 h-8"
    />,
    <LiaCcAmex key="amex" className="text-gray-300 dark:text-white w-14 h-8" />,
    <FaCcPaypal
      key="paypal"
      className="text-gray-300 dark:text-white w-14 h-8"
    />,
    <FaCcStripe
      key="stripe"
      className="text-gray-300 dark:text-white w-14 h-8"
    />,
    <FaCcApplePay
      key="applepay"
      className="text-gray-300 dark:text-white w-14 h-8"
    />,
    <FaGooglePay
      key="googlepay"
      className="text-gray-300 dark:text-white w-14 h-8"
    />,
    <SiZelle key="zelle" className="text-gray-300 dark:text-white w-14 h-8" />,
    // SVGs externos para Enzona y Transfermóvil
    <Image
      key="enzona"
      src="/payments/enzona.svg"
      alt="Enzona"
      width={56}
      height={32}
      className="object-contain filter grayscale opacity-80"
    />,
    <Image
      key="transfermovil"
      src="/payments/transfermovil.svg"
      alt="Transfermóvil"
      width={56}
      height={32}
      className="object-contain filter grayscale opacity-80"
    />,
     <Image
      key="criptomoneda"
      src="/payments/criptomoneda.svg"
      alt="criptomoneda"
      width={56}
      height={32}
      className="object-contain filter grayscale opacity-80"
    />,
     <Image
      key="qvapay"
      src="/payments/qvapay.svg"
      alt="qvapay"
      width={56}
      height={32}
      className="object-contain filter grayscale opacity-80"
    />,
  ];

  return (
    <footer className="bg-[#0b0f1a] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* TOP */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* BRAND */}
          <div>
            <h2 className="text-white text-xl font-semibold mb-3">
              RenshaMarket
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Marketplace global para comprar y vender productos de forma
              segura, rápida y confiable.
            </p>
          </div>

          {/* CATEGORÍAS */}
          <div>
            <h3 className="text-white font-semibold mb-3">Marketplace</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#">Explorar productos</Link>
              </li>
              <li>
                <Link href="#">Vender en Rensha</Link>
              </li>
              <li>
                <Link href="#">Ofertas</Link>
              </li>
              <li>
                <Link href="#">Categorías</Link>
              </li>
            </ul>
          </div>

          {/* SOPORTE */}
          <div>
            <h3 className="text-white font-semibold mb-3">Soporte</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#">Centro de ayuda</Link>
              </li>
              <li>
                <Link href="#">Devoluciones</Link>
              </li>
              <li>
                <Link href="#">Envíos</Link>
              </li>
              <li>
                <Link href="#">Contacto</Link>
              </li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h3 className="text-white font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#">Privacidad</Link>
              </li>
              <li>
                <Link href="#">Términos</Link>
              </li>
              <li>
                <Link href="#">Cookies</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 my-10" />

        {/* PAGOS */}
        <div className="mt-6">
          <p className="text-sm text-center text-gray-400 mb-6 tracking-wide uppercase">
            Métodos de pago seguros
          </p>

          <div className="relative overflow-hidden">
            <div className="flex gap-10 animate-payments-slider w-max">
              {[...paymentIcons, ...paymentIcons].map((icon, index) => (
                <div key={index} className="flex items-center">
                  {icon}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 my-10" />

        {/* BOTTOM */}
        <div className="mt-10 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} RenshaMarket. Todos los derechos
          reservados.
        </div>
      </div>

      {/* Estilos para animación */}
      <style jsx>{`
        @keyframes payments-slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-payments-slider {
          display: flex;
          gap: 2.5rem;
          animation: payments-slide 20s linear infinite;
        }
      `}</style>
    </footer>
  );
}
