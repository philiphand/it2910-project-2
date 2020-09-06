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
    fetch("https://poetrydb.org/linecount/4")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          const randomPoem = result[Math.floor(Math.random() * result.length)].lines;
          console.log(randomPoem)

          this.setState({
            isLoaded: true,
            poem: randomPoem
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
        <div>
          
           {poem.map(line => (
            <p key={line}>
              {line}
            </p>
          ))} 
        </div>
      );
    }
  }
}

export default Poetry;