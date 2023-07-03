import Button from "@/components/Button";
import Head from "next/head";
import React, { useEffect, useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const DEFAULT_JOB_DETAILS = {
  position: "",
  salary: "",
  type: "once",
  remote: false,
  city: "",
  description: "",
  publisher: "",
  email: "",
  socials: "",
  highlighted: false,
  duration: 0,
  published: false,
};

function PublicarUnTrabajo() {
  const [jobDetails, setJobDetails] = useState(DEFAULT_JOB_DETAILS);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setJobDetails({
      ...jobDetails,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey);

  const createCheckOutSession = async () => {
    setLoading(true);
    const stripe = await stripePromise;
    const checkoutSession = await axios.post("/api/create-stripe-session", {
      price,
    });

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    const highlighted = jobDetails.highlighted ? 5 : 0;
    setPrice(Number(highlighted) + Number(jobDetails.duration));
  }, [jobDetails]);

  return (
    <>
      <Head>
        <title>Publica un trabajo</title>
      </Head>
      <form className="container max-w-2xl mx-auto md:w-3/4">
        <div className="">
          <div className="py-16 border-b-blue-600 border-b-2 border-dotted">
            <h2 className="text-3xl font-bold">
              Hire the best React and React Native developers. Post your job for
              free for 30 days.
            </h2>
          </div>

          {/* DETAILS */}
          <div className="items-center justify-between w-full py-12 space-y-4 text-blue-600 md:inline-flex md:space-y-0 border-b-blue-600 border-b-2 border-dotted">
            <h2 className="font-bold md:w-1/3">Detalles del trabajo</h2>
            <div className="md:w-2/3 space-y-4">
              <div className="relative space-y-2">
                <label
                  htmlFor="name-with-label"
                  className="text-gray-700 font-bold"
                >
                  Posicion
                </label>
                <input
                  type="text"
                  className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2"
                  name="position"
                  onChange={handleChange}
                  placeholder="Manager, editor, ..."
                />
              </div>
              <div className="relative space-y-2">
                <label
                  htmlFor="name-with-label"
                  className="text-gray-700 font-bold"
                >
                  Salario
                </label>
                <input
                  type="text"
                  className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2"
                  name="salary"
                  onChange={handleChange}
                  placeholder="1.000€"
                />
              </div>
              <div className="relative space-y-2">
                <label
                  htmlFor="name-with-label"
                  className="text-gray-700 font-bold"
                >
                  Tipo de oferta
                </label>
                <div className="flex flex-col">
                  <div>
                    <input
                      type="radio"
                      name="type"
                      value="once"
                      checked={jobDetails.type === "once"}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="name-with-label"
                      className="text-gray-700 ml-2"
                    >
                      Puntual - 1 vez
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="type"
                      value="fixed"
                      checked={jobDetails.type === "fixed"}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="name-with-label"
                      className="text-gray-700 ml-2"
                    >
                      Fijo
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LOCATION */}
          <div className="items-center justify-between w-full py-12 space-y-4 text-blue-600 md:inline-flex md:space-y-0 border-b-blue-600 border-b-2 border-dotted">
            <h2 className="font-bold md:w-1/3">Localizacion del trabajo</h2>
            <div className="space-y-5 md:w-2/3">
              <div className=" relative space-y-4">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="remote"
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="name-with-label"
                    className="text-gray-700 ml-2"
                  >
                    Es un trabajo en remoto
                  </label>
                </div>

                <div className="relative space-y-2">
                  <label
                    htmlFor="name-with-label"
                    className="text-gray-700 font-bold"
                  >
                    Ciudad
                  </label>
                  <input
                    type="text"
                    className={`rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 €{
                      jobDetails.remote
                        ? "cursor-not-allowed bg-gray-200"
                        : "bg-white"
                    } text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2`}
                    name="city"
                    disabled={jobDetails.remote}
                    onChange={handleChange}
                    placeholder="Donde es el trabajo?"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="flex flex-col space-y-2 justify-between w-full py-12 text-blue-600 md:inline-flex md:space-y-0 border-b-blue-600 border-b-2 border-dotted">
            <h2 className="font-bold mb-2">Descripcion del trabajo</h2>
            <textarea
              type="textarea"
              rows={10}
              name="description"
              onChange={handleChange}
              className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2"
              placeholder="Describe el trabajo: requerimentos, objetivos, conocimientos..."
            />
          </div>

          {/* PUBLISHER */}
          <div className="items-center justify-between w-full py-12 space-y-4 text-blue-600 md:inline-flex md:space-y-0 border-b-blue-600 border-b-2 border-dotted">
            <h2 className="font-bold md:w-1/3">Detalles del publicante</h2>
            <div className="md:w-2/3 space-y-4">
              <div className="relative space-y-2">
                <label
                  htmlFor="name-with-label"
                  className="text-gray-700 font-bold"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2"
                  name="publisher"
                  onChange={handleChange}
                  placeholder="Tu nombre"
                />
              </div>
              <div className="relative space-y-2">
                <label
                  htmlFor="name-with-label"
                  className="text-gray-700 font-bold"
                >
                  Email
                </label>
                <input
                  type="text"
                  className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2"
                  name="email"
                  onChange={handleChange}
                  placeholder="ejemplo@email.com"
                />
              </div>
              <div className="relative space-y-2">
                <label
                  htmlFor="name-with-label"
                  className="text-gray-700 font-bold"
                >
                  Twitter/Instagram (opcional)
                </label>
                <input
                  type="text"
                  className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2"
                  name="socials"
                  onChange={handleChange}
                  placeholder="@MiNombreDeUsuario"
                />
              </div>
            </div>
          </div>

          {/* HIGHLIGHT */}
          <div className="items-center justify-between w-full py-12 space-y-4 text-blue-600 md:inline-flex md:space-y-0 border-b-blue-600 border-b-2 border-dotted">
            <h2 className="font-bold md:w-1/3">Destaca tu publicacion</h2>
            <div className="md:w-2/3 space-y-4">
              <div className="relative">
                <input
                  onChange={handleChange}
                  type="checkbox"
                  name="highlighted"
                />
                <label htmlFor="name-with-label" className="text-gray-700 ml-2">
                  Destacar tu publicacion (+5€)
                </label>
              </div>
              <div className="flex flex-col">
                <div>
                  <input
                    type="radio"
                    name="duration"
                    value={5}
                    checked={Number(jobDetails.duration) === 5}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="name-with-label"
                    className="text-gray-700 ml-2"
                  >
                    Fijar tu publicacion arriba durante 24h (+5€)
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="duration"
                    value={10}
                    checked={Number(jobDetails.duration) === 10}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="name-with-label"
                    className="text-gray-700 ml-2"
                  >
                    Fijar tu publicacion arriba durante 1 semana (+10€)
                  </label>
                </div>

                <div>
                  <input
                    type="radio"
                    name="duration"
                    value={15}
                    checked={Number(jobDetails.duration) === 15}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="name-with-label"
                    className="text-gray-700 ml-2"
                  >
                    Fijar tu publicacion arriba durante 1 mes (+15€)
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="duration"
                    value={0}
                    checked={Number(jobDetails.duration) === 0}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="name-with-label"
                    className="text-gray-700 ml-2"
                  >
                    No fijar
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full py-12 ml-auto md:w-1/3">
            <Button onClick={createCheckOutSession}>
              {loading ? "Procesando..." : `Publicar - ${price}€`}{" "}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

export default PublicarUnTrabajo;
