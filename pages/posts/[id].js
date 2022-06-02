import { useRouter } from "next/router";
import Tweet from "../components/Tweet";
import { searchData } from "../../hooks/useFirestore";

// Página del twweet que clickeamos
export default function TweetPage(props) {
  const router = useRouter();
  // isFallbacj es una propiedad que me dice si realmente la página en ese momento esta modoFallback, osea en un modo en el que no ha hecho match, no esta generada la página estatica todavia por lo tanto tiene que ejecutar el getStaticProps pero lo va a ejecutar en el cliente y mientras genera esa página lo que va a hacer es renderizar lo que yo quiero como el loading
  if (router.isFallback) return "Loading...";

  return (
    <>
      <Tweet {...props} />
      <style jsx>{``}</style>
    </>
  );
}

// PARA RUTAS ESTATICAS
export async function getStaticPaths() {
  return {
    // En los paths tenemos un objeto y adentro del params tenemos un id
    paths: [{ params: { id: "" } }], // aca es donde tendriamos la lista de todas las urls que tendriamos que hacer con el getStaticProps
    fallback: false, // Lo que decimos aca es basicamente, si el path que haz intentado acceder no esta ahi es un 404. El fallback a true va a decir que si el path no esta aqui lo que va a hacer es renderiazar la aplicación aunque no esten los paths
  };
}

// PARA EL TWEET ESTATICO
export async function getStaticProps(context) {
  // params, req, res, query vamos a tener en el contesxt
  const { params } = context; // extraemos params de context, que ademas de query tiene otros mas elementos, en params vamos a tener la posibilidad de acceder al id
  const { id } = params; // extraemos los segmentos de params

  const postData = searchData(id);

  return {
    props: {
      postData,
    },
  };
}
