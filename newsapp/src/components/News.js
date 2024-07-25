import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  render() {
    return (
      <div className="container my-3">
        <h2>Read Latest News on NewsBundle</h2>
        <div className="row">
            <div className= "col-md-4">
              <NewsItem title="myTitle" description="myDes"/>
            </div>
            <div className= "col-md-4">
              <NewsItem title="myTitle" description="myDes"/>
            </div>
            <div className= "col-md-4">
              <NewsItem title="myTitle" description="myDes"/>
            </div>
        </div>
        <div className="row my-2">
            <div className= "col-md-4">
              <NewsItem title="myTitle" description="myDes"/>
            </div>
            <div className= "col-md-4">
              <NewsItem title="myTitle" description="myDes"/>
            </div>
            <div className= "col-md-4">
              <NewsItem title="myTitle" description="myDes"/>
            </div>
        </div>

      </div>
    )
  }
}

export default News
