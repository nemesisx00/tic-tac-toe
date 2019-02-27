import React from 'react'

const numberOfRows = 3
const squaresPerRow = 3

export default class Board extends React.Component
{
	render()
	{
		let n = 0
		const rows = []
		for(let i = 0; i < numberOfRows; i++)
		{
			let squares = []
			for(let j = 0; j < squaresPerRow; j++)
			{
				squares.push(this.renderSquare(n++))
			}
			
			rows.push((
				<div className="board-row">
					{squares}
				</div>
			))
		}
		
		return (
			<div>
				{rows}
			</div>
		)
	}
	
	renderSquare(i)
	{
		return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />
	}
}

function Square(props)
{
	return (
		<button className="square" onClick={props.onClick}>
			{props.value}
		</button>
	)
}
