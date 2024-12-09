import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({
  setProgress,
  apiKey,
  country = "in",
  pageSize = 8,
  category = "general",
}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(category)} - NewsBundle`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    setLoading(true);
    try {
      let data = await fetch(url);
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
      setProgress(30);
      let parsedData = await data.json();
      console.log("Fetched data:", parsedData);
      if (parsedData.articles && parsedData.articles.length > 0) {
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
      } else {
        console.warn("No articles found in the response.");
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
      setProgress(100);
    }
  };

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${
      page + 1
    }&pageSize=${pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "35px 0px", marginTop: "90px" }}
      >
        NewsBundle - Top {capitalizeFirstLetter(category)} Headlines
      </h1>
      {loading && <Spinner />}
      {!loading && articles.length === 0 && <p>No news articles available.</p>}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func.isRequired,
  apiKey: PropTypes.string.isRequired,
};

export default News;
