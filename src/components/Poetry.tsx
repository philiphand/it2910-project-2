import * as React from 'react';

type PoetryState = {
  error: any,
  isLoaded: boolean,
  poem: string[] 
}

type Poem = { 
  author: string, 
  linecount: number,  
  lines: string[],
  title: string 
};

export class Poetry extends React.Component<PoetryState> {
  state: PoetryState = {
    error: null,
    isLoaded: false,
    poem: []
  }

  componentDidMount() {
    fetch("https://poetrydb.org/linecount/4")
      .then(res => res.json())
      .then((result: Poem[]) => {
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