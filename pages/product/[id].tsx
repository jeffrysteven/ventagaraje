import Image from "next/image";
import { Header } from "../header";
import { Footer } from "../footer";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ProductContext } from "../_app";
import axios from "axios";
import Link from "next/link";

export const ProductDetail = () => {
  let { product }: any = useContext(ProductContext);
  const [prod, setProd] = useState(product);
  const dollarUSLocale = Intl.NumberFormat("es-CO");
  const router = useRouter();
  useEffect(() => {
    async function fetchProduct() {
      setProd(await (await axios.get(`/api/product/${router.query.id}`)).data);
    }
    if (router.query.id && !prod.id) {
      fetchProduct();
    }
  }, [prod.id, router.query.id]);
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header name={prod.name} />
        <br />
        {prod && prod.id && (
          <div className="pt-6">
            <div className="lg:text-center">
              <Image
                src={prod?.photo}
                alt={prod?.description}
                className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                width={500}
                height={500}
              />
            </div>
            <div className="text-center">
              <Link
                href={`https://wa.me/+573008099791?text=${escape(
                  `Hola! Estoy interesad@ en ${prod.name}: ${window.location.href}`
                )}`}
              >
                <a target="_blank">
                  <Image
                    src="/order-via-whatsapp.png"
                    alt={"desc"}
                    width={200}
                    height={60}
                  />
                </a>
              </Link>
            </div>
            <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                  {prod?.name}
                </h1>
              </div>
              <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <div>
                  <h3 className="sr-only">Descripción</h3>
                  <div className="space-y-6">
                    <p className="text-base text-gray-500">
                      {prod?.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 lg:mt-0 lg:row-span-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl text-gray-900">
                  ${dollarUSLocale.format(prod?.price)}
                </p>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default ProductDetail;
