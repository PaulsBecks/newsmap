import useWindowDimensions from "../hooks/useWindowDimensions";
import NewsEntry from "../types/NewsEntry";
import MobileNewsContainer from "./MobileNewsContainer";
import NewsList from "./NewsList";

export default function NewsContainer({ news }: { news: NewsEntry[] }) {
  const { width } = useWindowDimensions();
  if (width < 800) {
    return <MobileNewsContainer news={news} />;
  }
  return (
    <div
      className="newsmap-news-container"
      style={{
        height: "100%",
        overflow: "auto",
        padding: "1rem",
        width: "300px",
        backgroundColor: "transparent",
        position: "absolute",
        top: 0,
        right: 0,
        color: "black",
        zIndex: 900,
        paddingTop: "1rem",
      }}
    >
      <NewsList news={news} />
    </div>
  );
}
