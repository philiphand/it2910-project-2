import React, { useState } from 'react';
import { useAsyncEffect } from '../../hooks/asyncEffekt';
import { IPoem, IPoetryProps } from '../../interfaces/poetry';
import "./poetry.css"

export const Poetry: React.FunctionComponent<IPoetryProps> = ({lines}) => {
  let [poem, setPoem] = useState<IPoem | null>(null)
  let [error, setError] = useState<Error | null>(null)

  useAsyncEffect(async () => {
    try {
      const response = await fetch(`https://poetrydb.org/linecount,random/${lines};1/author,lines`)
      const json = await response.json()

      if (json.status) {
        throw new Error(json.reason)
      }

      setPoem(json[0])
    }
    catch(ex) {
      setError(ex)
    }
  }, [lines])

  if (error)
    return (<div>Error: {error.message}</div>)
  else if (poem)
    return (<div className="poem">{poem.lines.join("\n")}</div>)
  else
    return (<div>Loading...</div>)
}