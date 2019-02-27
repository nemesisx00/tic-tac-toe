import React from 'react'
import Game from './Game.js'

export default function App()
{
	return (
		<div id="container">
			<header id="head">Tic Tac Toe</header>
			<div id="introduction">
				<p>
					This is a simple but playable implementation of the game Tic Tac Toe. This project was primarily a learning exercise
					based on a React tutorial. I've taken some time to go a bit further and explore more of React.
				</p>
			</div>
			
			<Game />
			
			<footer id="foot">
				<div>&#169; 2019 Peter Lunneberg</div>
				<a href="https://bitbucket.org/nemesisx00/tic-tac-toe">Source Code</a>
			</footer>
		</div>
	)
}
