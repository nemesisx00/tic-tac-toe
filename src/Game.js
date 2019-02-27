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

function calculateWinner(squares)
{
	for(const [a, b, c] of winStates)
	{
		if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
			return squares[a]
	}
	
	return null
}

export default class Game extends React.Component
{
	constructor(props)
	{
		super(props)
		
		this.state = {
			history: [
				{ squares: Array(9).fill(null) }
			],
			stepNumber: 0,
			xTurn: true
		}
	}
	
	handleClick(i)
	{
		const history = this.state.history.slice(0, this.state.stepNumber + 1)
		const current = history[this.state.stepNumber]
		const squares = current.squares.slice()
		
		if(!(squares[i] || (squares && calculateWinner(squares))))
		{
			squares[i] = this.state.xTurn ? 'X' : 'O'
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
	
	renderHistory(history)
	{
		const moves = history.map((step, move) => {
			const desc = move
				? 'Go to move ' + move
				: 'Go to start'
			
			return (
				<li key={move}>
					<div class="button" onClick={() => this.jumpTo(move)}>{desc}</div>
				</li>
			)
		})
		
		return moves
	}
	
	render()
	{
		const history = this.state.history
		const current = history[this.state.stepNumber]
		const winner = calculateWinner(current.squares)
		
		let status = 'Next player: ' + (this.state.xTurn ? 'X' : 'O')
		if(winner)
			status = 'Winner: ' + winner
		if(current.squares.indexOf(null) < 0)
			status = 'Draw!'
		
		return (
			<div className="game">
				<div className="game-board">
					<Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
				</div>
				<div className="game-info">
					<div>{status}</div>
					<ul>{this.renderHistory(history)}</ul>
				</div>
			</div>
		)
	}
}
