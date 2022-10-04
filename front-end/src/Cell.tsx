import React from 'react';
import { Cell } from './game';

interface Props {
  cell: Cell
}

class BoardCell extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <div className={`cell ${this.props.cell.clazz}`}>{this.props.cell.text}</div>
    )
  }
}

export default BoardCell;