import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

import { Product } from "../types";
import { ProductContext } from "./_app";

export const List = ({
  products,
  categoryFilter,
}: {
  products: Product[];
  categoryFilter: string;
}) => {
  const dollarUSLocale = Intl.NumberFormat("es-CO");
  const selectedProduct: any = useContext(ProductContext);
  const productList = categoryFilter.length
    ? products.filter(({ category }) => category === categoryFilter)
    : products;
  return productList.length ? (
    <div className="max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {productList.map((product) => {
          const { id, name, description, photo, price, sold } = product;
          return (
            <Link href={!sold ? `/product/${id}` : "#"} key={id}>
              <a
                className={`group relative ${sold ? "opacity-25" : ""}`}
                onClick={() => selectedProduct.setProduct(product)}
              >
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <Image
                    src={photo || ""}
                    alt={description}
                    className="w-full h-full object-center object-cover"
                    width={500}
                    height={610}
                  />
                </div>
                {sold && (
                  <p className="mt-1 text-center text-red-500 font-bold">
                    VENDIDO
                  </p>
                )}
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <span
                        aria-hidden="true"
                        className="absolute inset-0"
                      ></span>
                      {name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{description}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ${dollarUSLocale.format(price)}
                  </p>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  ) : (
    <p className="text-center">No hay productos</p>
  );
};
