import React from 'react';
import { IPoetryProps, IPoem } from '../../interfaces/poetry';
import "./poetry.css"

function getPoem(poemNumber:number) {
  const poem = sessionStorage.getItem(poemNumber.toString())
  return(poem !== null ? poem : "No poems found")
}

export const Poetry: React.FunctionComponent<IPoetryProps> = ({poemNumber}) => {

  if (getPoem(poemNumber) === "No poems found") {
    return <div className="poem">Loading poem...</div>
  }
  else {
    const poem:IPoem = JSON.parse(getPoem(poemNumber))
    return (<div className="poem">{poem.lines.join("\n")}</div>)
  }
}