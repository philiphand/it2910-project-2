import React from 'react';
import { IPoetryProps, IPoem } from '../../interfaces/poetry';
import "./poetry.css"
const fetch = require("node-fetch");

async function fetchPoems(numberOfPoems:number, lines:number) {

  //Introductory poem, only shown if animation is played before API loads
  //https://www.familyfriendpoems.com/poems/teen/music/
  sessionStorage.setItem("0", JSON.stringify({ author: "Bryanna T. Perkins", lines: [
      "Music is the ocean",
      "That pulls me to the shore.",
      "Music is the rhythm",
      "That moves me to the core."
    ]}))
    
  const response = await fetch(`https://poetrydb.org/linecount,random/${lines};${numberOfPoems}/author,lines`)
  const poems = await response.json()

  if (poems.status) {
  throw new Error(poems.reason)
  }

  for (let i = 0; i < numberOfPoems; i++) {
  sessionStorage.setItem(i.toString(), JSON.stringify(poems[i]))
  }

  return true
}
fetchPoems(30, 4)

function getPoem(poemNumber:number) {
  const poem = sessionStorage.getItem(poemNumber.toString())
  return(poem !== null ? poem : "No poems found")
}

export const Poetry: React.FunctionComponent<IPoetryProps> = ({poemNumber}) => {
  const poem:IPoem = JSON.parse(getPoem(poemNumber))
  return (<div className="poem">{poem.lines.join("\n")}</div>)
}