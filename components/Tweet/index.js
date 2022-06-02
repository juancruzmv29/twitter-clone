import Link from "next/link";
import Image from "next/image";
import { colors } from "../../styles/theme";
import useTimeAgo from "../../hooks/useTimeAgo";
import { useRouter } from "next/router";
import Avatar from "../Avatar";

const Tweet = ({ avatar, userName, content, id, createdAt, img }) => {
  // Le pasamos el createdAt que es el timestamp que le llega

  // Evento para clickear el article
  const timeago = useTimeAgo(createdAt);
  const router = useRouter();

  // Evento para clickear el articulo
  const handleArticleClick = (e) => {
    e.preventDefault();
    router.push("/status/[id]", `/status/${id}`);
  };

  return (
    <>
      <article onClick={handleArticleClick} className="tweet">
        <div className="avatar">
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> . </span>
            <Link href="#">
              <a>
                <time title={createdAt}>{timeago}</time>
              </a>
            </Link>
          </header>
          <p>{content}</p>
          {img && <Image src={img} alt="imagen" />}
        </section>
      </article>

      <style jsx>{`
                article {
                    display: flex;
                    background-color: ${colors.black}
                    border-top: 1px solid ${colors.gray}
                    border-bottom: 1px solid ${colors.gray}
                    padding: 10px 15px;
                }

                article:hover {
                    background: #f5f8fa;
                    cursor: pointer;
                }
                
                img {
                    border-radius: 10px;
                    height: auto;
                    margin-top: 10px;
                    width: 100%
                }

                div {
                    padding-right: 10px
                }

                p {
                    margin: 0;
                }

                a {
                    color: #555;
                    font-size: 14px;
                    text-decoration: none;
                }
            `}</style>
    </>
  );
};

export default Tweet;
