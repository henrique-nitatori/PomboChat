import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'

import PomboIcon from '../images/pigeon.svg'

import '../Styles/Pages/Home.css'

export default function Home() {
    const [user, setUser] = useState()
    let history = useHistory()

    function handleNavigationToChat() {
        history.push('/chat', { user: user })
    }

    return (
        <div id="home">
            <div className="card">
                <header className="card__title">
                <img src={PomboIcon} alt="Pombo" className="card__title__image"/>
                    <h2>Bem vindo ao Pombo Chat</h2>
                </header>
                <main className="card__content">
                    <input type="text" className="card__content__input" placeholder="Digite seu nome" value={user} onChange={e => setUser(e.target.value) } />
                    <button className="card__content__button" onClick={handleNavigationToChat}>Entrar</button>
                </main>
            </div>
        </div>
    )
}