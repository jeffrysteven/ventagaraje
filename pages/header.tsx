import Head from "next/head";
import Link from "next/link";

const Header = ({ name }: any) => (
  <div className="text-center">
    <Head>
      <title>Venta de garaje {name && `- ${name}`}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta httpEquiv="Content-Language" content="es" />
    </Head>
    {name ? (
      <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto text-base text-indigo-600 font-semibold tracking-wide uppercase">
        <Link href="/">🏠 Home</Link>
      </p>
    ) : (
      <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
        HOLI ❤️
      </h2>
    )}
    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
      Venta de garaje de Cindy y Jeff
    </p>
    <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
      Si te gusta algo, no dudes en contactarme al whatsapp
    </p>
  </div>
);

export default Header;