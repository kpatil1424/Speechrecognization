import { useState, useEffect } from "react";
import React from "react"; 
import HomePage from "./Home";
import ContactPage  from "./Contacts"
import BlogPage  from "./Blog"
import NewBlogPostPage from "./NewBlogPost";
import { BrowserRouter, Route, Link, Navigate, Routes, Redirect} from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import Contacts from "./Contacts";
import Blog from "./Blog";


function App(){
  
  const[redirectUrl, setRedirectUrl] = useState("");
  const commands = [
    {
      command: ['Go to *', "Open to *"],
      callback: (redirectPage) => setRedirectUrl(redirectPage),
    },
  ];
  const {transcript} = useSpeechRecognition({ commands });
  

  const pages =["home", "blog", "new blog post", "contact"];
  const urls = {
    home: "/",
    Blog: "/blog",
    "new blog post": "/blog/new",
    Contacts: "/contact",
    
  };
  if(!SpeechRecognition.browserSupportsSpeechRecognition()){
    return null;
  }

  let redirect ="";

  if(redirectUrl){
    if(pages.includes(redirectUrl)){
      redirect = <Navigate to={urls[redirectUrl]}/>
    } else{
      redirect= <p> could not find page:{redirectUrl}</p>;
    }
  }

  return(
  <div className="App">
    <BrowserRouter>
    <div id="links">
      <Link to="/">Home</Link>
      <Link to="blog">Blog</Link>
      <Link to="/blog/new">Add Blog POST</Link>
      <Link to="/contact">Contact</Link>
    </div>
     <Routes>
      <Route path="/" exact element={<HomePage/>}/>
      <Route path="/home"  element={<HomePage/>}/>
      <Route path="/blog"  exact element={<BlogPage/>}/>
      <Route path="/blog/new" element={<NewBlogPostPage/>}/>
      <Route path="/contact"  element={<ContactPage/>}/>
    
    </Routes>
    
    </BrowserRouter>
   
    <p id="transcript">transcript: {transcript}</p>

    <button onClick={SpeechRecognition.startListening}>Start</button>
  </div>
  );
}

function Home() {
  return <h2>Home</h2>;
 }
 
 function Contact() {
  return <h2>Contact</h2>;
 }
 
 function NewBlogPost() {
  return <h2>New Blog Post</h2>;
 }

export default App;