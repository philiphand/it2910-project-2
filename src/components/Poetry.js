import * as React from 'react';

class Poetry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      poems: []
    };
  }

  // https://reactjs.org/docs/faq-ajax.html
  componentDidMount() {
    fetch("https://poetrydb.org/author/Emily%20Dickinson/title")
      .then(res => res.json())
      .then(
        (result) => {
          const randomInt = Math.floor(Math.random() * result.length);
          const poem = result[randomInt];
          this.setState({
            isLoaded: true,
            poem: poem
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, poem } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {poem.title}
          {/* {poems.map(poem => (
            <li key={poem.title}>
              {poem.title}
            </li>
          ))} */}
        </ul>
      );
    }
  }
}

export default Poetry;