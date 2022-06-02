import { useRouter } from "next/router";
import Tweet from "../components/Tweet";




// Página del twweet que clickeamos
export default function TweetPage(props) {
    const router = useRouter()
    // isFallbacj es una propiedad que me dice si realmente la página en ese momento esta modoFallback, osea en un modo en el que no ha hecho match, no esta generada la página estatica todavia por lo tanto tiene que ejecutar el getStaticProps pero lo va a ejecutar en el cliente y mientras genera esa página lo que va a hacer es renderizar lo que yo quiero como el loading
    if(router.isFallback) return "Loading..."


    return (
        <>
            <Tweet {...props} />
            <style jsx>{``}</style>
        </>
    )
}

export async function getStaticProps({ params }) {}