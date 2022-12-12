import React from "react";
import { Link, useLocation } from "react-router-dom"
import './MainMenu.scss'

const menuList = [
    {path:'/', display: 'Title Screen' },
//    {path:'/game', display: 'Start Game' },
//    {path:'/save', display: 'Save Game' },
//    {path:'/load', display: 'Load Game' },
    {path:'/option', display: 'Options' },
    {path:'/gallery', display: 'Gallery Demo' },
    {path:'/blackjack', display: 'Blackjack'}
]

function MainMenu() {
    const location = useLocation();

    const iscurrentURL = (url)=> {
        const currentPath = location.pathname.toLowerCase();
        const pathToCheck = menuList.findIndex(ml => ml.path === currentPath) !== -1 ? currentPath: '/';
        return pathToCheck === url.toLowerCase();
    }
    
    return (
        <div className="menuBar">
            <span>
                <a className="menuLink" href="https://twitter.com/SourcapStudio" target="_blank" rel="noreferrer">Coder</a>
            </span>
            {
                
                menuList.map((link)=>
                    !iscurrentURL(link.path)? 
                        <span key={link.path}>
                        <Link className="menuLink" to={link.path}> {link.display}</Link>
                        </span>
                    :null
                )
            }
            <span>
                <a className="menuLink" href="https://twitter.com/PurusagiP" target="_blank" rel="noreferrer">Artist</a>
            </span>
       </div>
    );
}

export default MainMenu;