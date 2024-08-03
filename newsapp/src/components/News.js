import React, { Component } from 'react';
import NewsItem from './NewsItem';

export class News extends Component {
  constructor() {
    super();
    console.log("Hello I am constructor");
    this.state = {
      articles: [],
      loading: false
    };
  }

  async componentDidMount() {
    let url = "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=8ebaf927ee814f869f7f07de5c01bf1b";
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({ articles: parseData.articles });
  }
  

  render() {
    return (
      <div className="container my-3">
        <h2>Read Latest News on NewsBundle</h2>
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={element.description ? element.description.slice(0, 88) : ""}
                  imgURL={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>  
            );
          })}
        </div>
        <button className='btn'>Previous</button>
        <button className='btn'>Next</button>
      </div>
    );
  }
}

export default News;

