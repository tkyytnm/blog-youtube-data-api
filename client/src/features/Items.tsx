import { useState, useEffect } from "react";
import "./Items.css";

function Items() {
  interface Data {
    items?: Item[];
  }
  interface Item {
    id: { videoId: string };
    snippet: {
      title: string;
      description: string;
      publishedAt: string;
      thumbnails: {
        medium: {
          url: string;
        };
      };
      channelTitle: string;
      channelId: string;
    };
  }

  const [data, setData] = useState<Data>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const requestUrl = "/api";
  const youtubeUrl = "https://www.youtube.com/watch?v=";
  const channelUrl = "https://www.youtube.com/channel/";

  const formatDate = (publishedAt: string) => {
    const date = new Date(publishedAt);
    return date.toLocaleString("ja-JP");
  };

  useEffect(() => {
    fetch(requestUrl)
      .then((res) => {
        return res.json();
      })
      .then(
        (res) => {
          setIsLoading(false);
          if (!res.items) {
            setError(res);
          }
          setData(res);
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }
  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }
  return (
    <section className="items">
      {data.items?.map((item: Item, i: number) => {
        return (
          <div className="item" key={i}>
            <div className="thumbnail">
              <a href={youtubeUrl + item.id.videoId}>
                <img
                  src={item.snippet.thumbnails.medium.url}
                  alt={item.snippet.title}
                />
              </a>
            </div>
            <div className="right">
              <div className="title">
                <a href={youtubeUrl + item.id.videoId}>{item.snippet.title}</a>
              </div>
              <div className="description">{item.snippet.description}</div>
              <div className="channel">
                <a href={channelUrl + item.snippet.channelId}>
                  {item.snippet.channelTitle}
                </a>
              </div>
              <div className="time">{formatDate(item.snippet.publishedAt)}</div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default Items;
