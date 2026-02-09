"use client";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { usePathname } from "next/navigation";

//#region iconos
import { MdOutlineInventory } from "react-icons/md";
import { IoStorefrontSharp } from "react-icons/io5";
import { TbSmartHome } from "react-icons/tb";
import { RiFileHistoryLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa6";

interface MenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Menu({ isOpen, setIsOpen }: MenuProps) {
  const pathname = usePathname();

  const tabs = [
    {
      id: "dashboard",
      icon: <TbSmartHome />,
      label: "Inicio",
      path: "/views/dashboard",
    },

 {
      id: "usuarios",
      icon: <FaUsers />,
      label: "Usuarios",
      path: "/views/usuarios",
    },

    {
      id: "inventario",
      icon: <MdOutlineInventory />,
      label: "Inventario",
      path: "/views/inventario",
    },

    {
      id: "almacen",
      icon: <IoStorefrontSharp />,
      label: "Almacen",
      path: "/views/almacen",
    },

    {
      id: "historial",
      icon: <RiFileHistoryLine />,
      label: "Historial",
      path: "/views/historial",
    },
  ];

  const activeTab = tabs.find((tab) => tab.path === pathname)?.id || "";

  return (
    <div
      className={`
      fixed top-0 left-0 h-screen
      bg-linear-to-br from-blue-600 via-blue-700 to-purple-600
      text-white flex flex-col justify-start py-4
      transition-all duration-400 ease-in-out
      overflow-hidden z-50
      ${isOpen ? "w-56" : "w-18"}
      hidden lg:flex
    `}
    >
      {/* Botón abrir/cerrar sidebar */}
      <div
        className="cursor-pointer text-left p-3 px-5 text-white hover:text-white/90
                  flex items-center gap-2 transition-colors duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
        {isOpen && (
          <span className="font-semibold text-lg whitespace-nowrap">
            RenshaMarket
          </span>
        )}
      </div>

      {/* Menú de navegación */}
      <nav className="flex flex-col items-start pt-10 grow">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.path}
            className={`
              flex items-center gap-4 py-3 px-5
              transition-all duration-300 w-full
              ${
                activeTab === tab.id
                  ? "bg-blue-600 rounded-[40px_0px_0px_40px]"
                  : "rounded-lg hover:bg-cyan-500/30 hover:rounded-[40px_0px_0px_40px]"
              }
            `}
          >
            <div className="text-2xl flex items-center">{tab.icon}</div>
            {isOpen && (
              <span
                className={`
                text-sm whitespace-nowrap
                transition-opacity duration-300
                ${isOpen ? "opacity-100" : "opacity-0"}
              `}
              >
                {tab.label}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto pb-4">
        <hr className="border-t-2 border-dashed border-white/50 mx-auto w-4/5 my-6" />
        <div
          className={`
          text-xs text-white/80 text-center py-1 mb-2
          transition-all duration-300 h-5
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
        >
          Versión 1.0.0
        </div>
      </div>
    </div>
  );
}
