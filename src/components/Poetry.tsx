import * as React from 'react';

type PoetryProps = {
  lines: string
}

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

export class Poetry extends React.Component<PoetryProps, PoetryState> {
  constructor(props: PoetryProps) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      poem: []
    }
  }

  componentDidMount() {
    fetch("https://poetrydb.org/linecount/" + this.props.lines)
      .then(res => res.json())
      .then((result: Poem[]) => {
          const randomPoem = result[Math.floor(Math.random() * result.length)].lines;
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
          {poem.map((line, index) => (
            <p key={index}>
              {line}
            </p>
          ))} 
        </div>
      );
    }
  }
}