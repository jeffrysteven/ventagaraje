import { useState } from "react";
import Header from "./header";
import List from "./list";
import db from "../utils/db";

const Home = ({ productsData }: any) => {
  const [category, setCategory] = useState("");
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        <br />
        <div className="lg:text-center">
          <div className="col-span-6 sm:col-span-3">
            <select
              id="category"
              name="category"
              autoComplete="category-name"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="">Todas las categorías</option>
              <option value="ropa">Ropa</option>
              <option value="muebles">Muebles</option>
              <option value="cocina">Cocina</option>
              <option value="tech">Tech</option>
            </select>
          </div>
        </div>
        <List products={productsData} categoryFilter={category} />
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const products = await db.collection("products").get();
  const productsData = products.docs.map((product) => ({
    id: product.id,
    ...product.data(),
  }));
  return {
    props: { productsData },
  };
};

export default Home;
