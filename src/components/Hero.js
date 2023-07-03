import React from "react";
import Button from "./Button";
import Link from "next/link";

function Hero() {
  return (
    <div className="bg-white ">
      <div className="text-center w-full mx-auto py-12 lg:py-16 z-20">
        <h2 className="text-3xl font-extrabold text-black  sm:text-4xl">
          <span className="block">¿Buscas una colaboración para OnlyFans?</span>
          <span className="block text-blue-600">
            Encuentra todo lo que buscas para tu contenido
          </span>
        </h2>
        <p className="text-xl mt-4 max-w-xl mx-auto text-gray-400">
          Colabora con modelos, encuentra a fotografos especializados, solicita
          un manager para que te ayude con tu perfil
        </p>
        <div className="lg:mt-0 lg:flex-shrink-0">
          <div className="mt-12 inline-flex rounded-md shadow">
            <Link href="/publicar-un-trabajo">
              <Button>Publicar un trabajo</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
