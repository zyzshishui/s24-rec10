import React from 'react';
import './App.css'; // import the css file to enable your styles.
import { GameState, Cell } from './game'

/**
 * Define the type of the props field for a React component
 */
interface Props { }

/**
 * Using generics to specify the type of props and state.
 */
class App extends React.Component<Props, GameState> {
  /**
   * @param props has type Props
   */
  constructor(props: Props) {
    super(props)
    /**
     * state is a special field in a React component. React will
     * keep track of the changes to the state field. Anytime there's
     * an update to the value of state, React will automatically
     * re-render the HTML.
     * 
     * state has type GameState as specified in the class inheritance.
     */
    this.state = { cells: [] }
  }

  /**
   * Use arrow function, i.e., () => {} to create an async function,
   * otherwise, 'this' would become undefined in runtime. This is
   * just an issue of Javascript.
   */
  newGame = async () => {
    const response = await fetch('/newgame');
    const json = await response.json();
    this.setState({ cells: json['cells'] });
  }

  play(link: string): React.MouseEventHandler {
    return async (e) => {
      e.preventDefault();
      const response = await fetch(link)
      const json = await response.json();
      this.setState({ cells: json['cells'] });
    }
  }

  createCell(cell: Cell, index: number): React.ReactNode {
    if (cell.link !== "")
      /**
       * key is used for React when given a list of items. It
       * helps React to keep track of the list items and decide
       * which list item need to be updated.
       * @see https://reactjs.org/docs/lists-and-keys.html#keys
       */
      return (
        <a key={index} href='/' onClick={this.play(cell.link)}>
          <div className={`cell ${cell.clazz}`}>{cell.text}</div>
        </a>
      )
    else
      return (
        <div key={index} className={`cell ${cell.clazz}`}>{cell.text}</div>
      )
  }

  /**
   * This function will call after the HTML is rendered.
   * We update the initial state by creating a new game.
   * @see https://reactjs.org/docs/react-component.html#componentdidmount
   */
  componentDidMount(): void {
    this.newGame();
  }

  /**
   * The only method you must define in a React.Component subclass.
   * @returns the React element via JSX.
   * @see https://reactjs.org/docs/react-component.html
   */
  render(): React.ReactNode {
    /**
     * We use JSX to define the template. An advantage of JSX is that you
     * can treat HTML elements as code.
     * @see https://reactjs.org/docs/introducing-jsx.html
     */
    return (
      <div>
        <div id="board">
          {this.state.cells.map((cell, i) => this.createCell(cell, i))}
        </div>
        <div id="bottombar">
          <button onClick={/* get the function, not call the function */this.newGame}>New Game</button>
          {/* Exercise: implement Undo function */}
          <button>Undo</button>
        </div>
      </div>
    );
  }
}

export default App;
