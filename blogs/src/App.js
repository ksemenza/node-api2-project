import React from 'react';
import logo from './logo.svg';
import './App.css';
import PostList from './components/posts/PostList';
import CommentList from './components/comments/CommentList';

function App() {


  return (
    <div className="App">
      <header className="App-header">
    
      <h2>Kim's Blog Posting</h2>
      </header>
      <PostList/>
      <CommentList/>
    </div>
  );
}

export default App;
