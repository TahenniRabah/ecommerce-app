import React from "react";
import { Link } from "react-router-dom";
export default function NavBar() {
  return (
    <nav className="fixed z-10 top-0 w-full py-2 flex gap-8 justify-center text-white bg-gray-600">
      <Link className="px-2" to="/">
        Accueil
      </Link>
      <Link className="px-3" to="/Cart">
        Panier
      </Link>
      <Link className="px-3" to="/Login">
        Se Connecter
      </Link>
      <Link className="px-3" to="/Register">
        s'enregistrer
      </Link>
    </nav>
  );
}
