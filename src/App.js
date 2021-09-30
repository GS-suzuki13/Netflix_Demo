import React, {useEffect, useState} from "react";
import './App.css';
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import FeatureMovie from "./components/FeatureMovies";
import Header from "./components/Header";
import InstagramIcon from '@material-ui/icons/Instagram';
import {GitHub, LinkedIn, WhatsApp} from "@material-ui/icons";


export default () => {

    const [movieList, setMovieList] = useState([]);
    const [featureData, setFeatureData] = useState(null);
    const [blackHeader, setBlackHeader] = useState(false);

    useEffect(() => {
        const loadAll = async () => {
            let list = await Tmdb.getHomeList();
            setMovieList(list);

            let originals = list.filter(i => i.slug === 'originals');
            let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
            let chosen = originals[0].items.results[randomChosen];
            let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
            setFeatureData(chosenInfo)
        }

        loadAll();
    }, []);

    useEffect(() => {
        const scrollListener = () => {
            if (window.scrollY > 10) {
                setBlackHeader(true);
            } else {
                setBlackHeader(false);
            }
        }

        window.addEventListener('scroll', scrollListener);

        return () => {
            window.removeEventListener('scroll', scrollListener);
        }
    }, [])

    return (
        <div className="page">

            <Header black={blackHeader}/>

            {featureData &&
            <FeatureMovie item={featureData}/>
            }

            <section className="lists">
                {movieList.map((item, key) => (
                    <MovieRow key={key} title={item.title} items={item.items}/>
                ))}
            </section>

            <footer>
                Direitos de imagem para Netflix<br/>
                Desenvolvido por Gustavo Suzuki<br/>
                Dados pego do site Themoviedb.og<br/>
            </footer>

            {movieList.length <= 0 &&
            <div className="loading">
                <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif"/>
            </div>
            }
            <div className="links">
                <a href="https://www.instagram.com/gustavosuzuki3/">
                    <InstagramIcon style={{fontSize: 30}}/><br/>
                </a>
                <a href="https://www.linkedin.com/in/gustavo-galhardo-suzuki-858189163/">
                    <LinkedIn style={{fontSize: 30}}/><br/>
                </a>
                <a href="https://github.com/GS-suzuki13">
                    <GitHub style={{fontSize: 30}}/><br/>
                </a>
                <a href="https://api.whatsapp.com/send/?phone=554797609807&text&app_absent=0">
                    <WhatsApp style={{fontSize: 30}}/>
                </a>
            </div>
        </div>
    );
}