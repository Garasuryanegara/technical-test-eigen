import "./App.css";
import React, { useEffect, useState } from "react";
import { Carousel, Button, Modal } from "antd";
import axios from "axios";

const contentStyle: React.CSSProperties = {
  height: "430px",
  color: "#fff",
  lineHeight: "430px",
  textAlign: "center",
  background: "#364d79",
};

interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface ApiData {
  status: string;
  totalResult: number;
  articles: Article[];
}

const App: React.FC = () => {
  const [data, setData] = useState<ApiData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  let todayNews: Article[] = [];
  let carousel: Article[] = [];
  let breakingNews: Article[] = [];

  const showModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get<ApiData>(
        "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=0b5161d34cce4af287e390f717856147"
      );
      setData(response.data);
    } catch (error) {
      console.error(`Error fetching data, ${error}`);
    }
  };
  if (data && data.articles) {
    todayNews = data.articles.slice(0, 3);
    carousel = data.articles.slice(3, 7);
    breakingNews = data.articles.slice(5, 10);
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ paddingLeft: "40px", paddingRight: "40px" }}>
      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ padding: "20px", width: "50%" }}>
          <Carousel autoplay>
            {carousel.map((item, index) => {
              return (
                <div>
                  <div style={contentStyle}>
                    <div
                      style={{
                        color: "white",
                        fontSize: "30px",
                        fontWeight: "800",
                        letterSpacing: "1px",
                        position: "absolute",
                        marginTop: "100px",
                        marginLeft: "30px",
                        whiteSpace: "normal",
                      }}
                    >
                      {item.title.length > 40
                        ? item.title.slice(0, 38) + "..."
                        : item.title}
                    </div>
                    <div>
                      <img
                        style={{ width: "100%", zIndex: "-10" }}
                        src={item.urlToImage}
                        alt="Image News"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
        <div
          style={{
            padding: "20px",
            width: "50%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2 style={{ fontWeight: "700" }}>Today News</h2>
          {todayNews.map((item, index) => {
            return (
              <div
                style={{
                  width: "100%",
                  height: "130px",
                  borderRadius: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  boxShadow: "box-shadow 0.3s",
                }}
                onClick={showModal}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0px 0px 10px 0px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    maxWidth: "400px",
                    width: "100%",
                    padding: "10px",
                  }}
                >
                  <p>{item.author}</p>
                  <h3>{item.title}</h3>
                </div>
                <div
                  style={{
                    height: "100%",
                    width: "130px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{
                      width: "110px",
                      height: "110px",
                      borderRadius: "15px",
                      objectFit: "cover",
                    }}
                    src={item.urlToImage}
                    alt="Hutan"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <div style={{ width: "96.2%", padding: "20px" }}>
          <h2>Breaking News</h2>
          <div
            style={{
              width: "100%",
              display: "flex",
              gap: "20px",
            }}
          >
            {breakingNews.map((item) => {
              return (
                <div
                  style={{
                    width: "300px",
                    height: "310px",
                    borderRadius: "15px",
                    border: "1px solid lightgrey",
                    cursor: "pointer",
                    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "160px",
                      borderTopLeftRadius: "15px",
                      borderTopRightRadius: "15px",
                    }}
                    alt="Hutan"
                    src={item.urlToImage}
                  />
                  <div
                    style={{
                      padding: "10px",
                      justifyItems: "center",
                      height: "140px",
                    }}
                  >
                    <div
                      style={{
                        padding: "10px",
                        fontSize: "16px",
                        fontWeight: "700",
                        paddingBottom: "20px",
                      }}
                    >
                      {item.title}
                    </div>
                    <div>{item.author}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={closeModal}
        onCancel={closeModal}
      >
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};
export default App;
