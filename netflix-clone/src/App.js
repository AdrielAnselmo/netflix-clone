import React, { useEffect, useState } from "react";
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import'./App.css'
import Header from "./components/Header";

function App() {
  const [movieList, setMovieList] = useState([]); 
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(()=>{
    const loadAll = async () =>{
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      let originals = list.filter(i=>i.slug === 'originals')
      let randomChosen = Math.floor(Math.random()*(originals[0].items.results.length -1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setFeaturedData(chosenInfo);

      console.log(chosenInfo)
      
      console.log(chosen);
    }

    loadAll();
  },[]);

  useEffect(()=>{
    const scrollListener = () =>{
      if(window.scrollY > 10){
        setBlackHeader(true);
      }else{
        setBlackHeader(false);

      }
    }
    window.addEventListener('scroll', scrollListener);
    return () =>{
    window.removeEventListener('scroll', scrollListener)
    }
  },[])
  return (
    <div className="page">
        <Header black={blackHeader} />
        {featuredData && <FeaturedMovie item={featuredData}/>}
        
        <section className="lists">
          {movieList.map((item, key)=>(
            <div>
              <MovieRow key={key} title={item.title} items={item.items}/>
            </div>
          ))}
        </section>
        <footer>
          Feito com <span role="img" aria-label="coracao">❤️</span> por Adriel Anselmo<br/>
          Direitos de imagem para Netflix<br/>
          Dados pegos pela Tmdb
        </footer>
        {movieList.length <= 0 && 
        <div className="loading">
          <img width={600} src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="carregando"/>
        </div>
        }
    </div>
  );
}

export default App;
