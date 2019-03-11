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
				<div className="button" onClick={() => showOverlay()}>More Info</div>
			</div>
			
			<Game />
			
			<footer id="foot">
				<div>&#169; 2019 Peter Lunneberg</div>
				<a href="https://bitbucket.org/nemesisx00/tic-tac-toe">Source Code</a>
			</footer>
			
			<div id="greyOut" className="first hidden" onClick={() => hideOverlay()}>
				<div id="infoOverlay">
					<header>More Information</header>
					<p>
						The end Result of the React tutorial was an entirely unstyled, yet functional, game which was able to be played
						through to either a Draw or Win. It also contained a time machine-like history functionality allowing the user
						to move the game state back to that of a previous move. While following along, I opted to make the tutorial's
						code conform to my style and so I omitted semi-colons and used more ES6 style code when possible. I waited to
						start making intensive changes until I had followed the tutorial to its conclusion.
					</p>
					<p>
						The first addition I made was to style the application so it looked a bit more complete. This involved adding
						the header and footer bars as well as centering the main content on the screen. The primary responive portion of
						the page is the game board itself which grows to fill the majority of the screen when there is available space.
						Also, this information panel utilizes CSS transitions to fade in and out.
					</p>
					<p>
						The next step was to add scoreboard functionality to keep track of each player's wins. In order to maintain the
						time machine-like behavior of the history functionality, the scoreboard updates its display based upon whether
						or not a win has been detected. The score is not updated in the game state until the user moves beyond an arbitrary
						point of no return. This prompted the creation of a 'New Game' button allowing the user to chose when to move
						beyond this point of no return. Once clicked the score is updated in the game state, the move history is cleared,
						and the current turn is reset to its default.
					</p>
				</div>
			</div>
		</div>
	)
}

function showOverlay()
{
	let el = document.querySelector('#greyOut')
	if(el)
		el.className = ''
}

function hideOverlay()
{
	let el = document.querySelector('#greyOut')
	if(el)
		el.className = el.className.replace('hidden', '').trim() + ' hidden'
}
