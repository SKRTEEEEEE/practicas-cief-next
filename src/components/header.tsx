"use client"


import Image from "next/image";
import Link from "next/link";
import  { useState } from "react";

function Header() {
  // Gerenciar o estado para abrir e fechar o overlay
  const [isOpen, setIsOpen] = useState(false);

  // Funções para abrir e fechar o menu
  const openNav = () => setIsOpen(true);
  const closeNav = () => setIsOpen(false);

  return (
    <nav>
      <div className='logo-nav'>
        <Link href='/'>
        <Image src="/img/moto2go_clear.png" alt="Imagen de fondo sobre motos" width={100} height={100}  />
        </Link>
      </div>

      {/* Botão para abrir o overlay */}
      <span className="menu" onClick={openNav} style={{ cursor: "pointer" }}>
        &#9776;
      </span>

      {/* Overlay */}
      <div
        id="myNav"
        className="overlay"
        style={{ height: isOpen ? "100%" : "0" }}
      >
        {/* Botão para fechar o overlay */}
        <button className="closebtn" onClick={closeNav}>
          &times;
        </button>

        {/* Conteúdo do overlay */}
        <div className="overlay-content">
        <Link href="/">
            <p>home</p>
          </Link>
          <Link href="/sobre">
            <p>Sobre</p>
          </Link>
          <Link href='/cliente'>
          <p>cliente</p>
          </Link>
          <Link href="/contacto">
            <p>contacto</p>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
