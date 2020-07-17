import React from 'react'
import './HeaderTop.css'

import {Link} from 'react-router-dom'

function HeaderTop(){
 function scrollNav(){
    const navScroll = id =>{
        let nav = document.getElementById(id)
        if(window.pageYOffset>150)
         nav.classList.add('nav-on-scroll')
        else
         nav.classList.remove('nav-on-scroll')
    }
    window.onscroll = () =>{
        navScroll('navBox')
    }
  
 }
 scrollNav();

    return(
        <div className="header-box">
            <div className="header-title">
               <p id="ttitle">Star Wars</p>
               <p id="tsubtitle">Guide</p>
            </div>
            <div className="nav-box" id="navBox">
                <nav className="max-margin">
                    <ul>
                        <li><Link to="/">Movies</Link> </li>
                        <li><Link to="/planets">Planets</Link> </li>
                        <li><Link to="/starships">Starships</Link> </li>
                        <li><Link to="people">People</Link> </li>
                    </ul>
                </nav>

            </div>

        </div>
    )
}

export default HeaderTop;