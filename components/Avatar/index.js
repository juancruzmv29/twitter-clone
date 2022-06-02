import Image from "next/image";

// COMPONENTE PARA EL AVATAR
const Avatar = ({ alt, src, text, withText }) => {
  return (
    <>
      <div className="container">
        <Image className="avatar" alt={alt} src={src} title={alt} />
        {withText && <strong>{text || alt}</strong>}
      </div>

      <style jsx>{`
        .container {
          align-items: center;
          display: flex;
        }

        .avatar {
          border-radius: 9999px;
          height: 49px;
          width: 49px;
        }

        /* Cuando el avatr esta acompañado de una etiqueta strong, el + hace referencia a la etiqueta que tiene al lado  */
        .avatar + strong {
          margin-left: 8px;
        }
      `}</style>
    </>
  );
};

export default Avatar;
