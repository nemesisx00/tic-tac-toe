import React from 'react'
import Board from './Board.js'

const winStates = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]

const identX = 'X'
const identO = 'O'

const history_start = 'Go to start'
const history_move = 'Go to move'

const status_turn = 'Next player'
const status_draw = 'Draw'
const status_win = 'Winner:'

export default class Game extends React.Component
{
	constructor(props)
	{
		super(props)
		
		this.state = {
			history: [
				{ squares: Array(9).fill(null) }
			],
			score: {
				X: 0,
				O: 0
			},
			stepNumber: 0,
			xTurn: true
		}
	}
	
	handleClick(i)
	{
		const history = this.state.history.slice(0, this.state.stepNumber + 1)
		const current = history[this.state.stepNumber]
		const squares = current.squares.slice()
		const winner = calculateWinner(squares)
		
		if(!(squares[i] || (squares && winner)))
		{
			squares[i] = this.state.xTurn ? identX : identO
			this.setState({
				history: history.concat([{
					squares: squares
				}]),
				stepNumber: history.length,
				xTurn: !this.state.xTurn
			})
		}
	}
	
	jumpTo(step)
	{
		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) === 0
		})
	}
	
	newGame()
	{
		const history = this.state.history
		const current = history[this.state.stepNumber]
		const winner = calculateWinner(current.squares)
		
		hideNewGame()
		
		let score = Object.assign({}, this.state.score)
		if(winner)
			score[winner] += 1
		
		this.setState({
			history: [
				{ squares: Array(9).fill(null) }
			],
			score,
			stepNumber: 0,
			xTurn: true
		})
	}
	
	render()
	{
		const history = this.state.history
		const current = history[this.state.stepNumber]
		const winner = calculateWinner(current.squares)
		
		const xPlus = winner === identX
		const oPlus = winner === identO
		
		if(winner || current.squares.indexOf(null) < 0)
			showNewGame()
		
		return (
			<div className="game">
				<div className="game-board">
					<Board squares={current.squares} onClick={i => this.handleClick(i)} />
				</div>
				<div className="game-info">
					<div className="score">
						<div>{identX}: {this.state.score.X + (xPlus ? 1 : 0)}</div>
						<div>{identO}: {this.state.score.O + (oPlus ? 1 : 0)}</div>
					</div>
					<div className="status">{updateStatus(this.state.xTurn, winner, current.squares)}</div>
					<ul>{this.renderHistory(history)}</ul>
				</div>
				<div id="newGame" className="button first hidden" onClick={() => this.newGame()}>New Game</div>
			</div>
		)
	}
	
	renderHistory(history)
	{
		const moves = history.map((step, move) => {
			const desc = move
				? `${history_move} ${move}`
				: history_start
			
			return (
				<li key={move}>
					<div class="button" onClick={() => this.jumpTo(move)}>{desc}</div>
				</li>
			)
		})
		
		return moves
	}
}

function calculateWinner(squares)
{
	for(const [a, b, c] of winStates)
	{
		if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
			return squares[a]
	}
	
	return null
}

function updateStatus(xTurn, winner, squares)
{
	let status = `${status_turn} ${(xTurn ? identX : identO)}`
	if(squares.indexOf(null) < 0)
		status = status_draw
	if(winner)
		status = `${status_win} ${winner}`
	
	return status
}

function showNewGame()
{
	let el = document.querySelector('#newGame')
	if(el)
		el.className = el.className.replace('first', '').replace('hidden', '').trim()
}

function hideNewGame()
{
	let el = document.querySelector('#newGame')
	if(el)
		el.className = el.className.replace('hidden', '').trim() + ' hidden'
}
