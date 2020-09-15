export interface IPoetryProps {
    lines: string
}
  
export interface IPoetryState {
    error: any,
    isLoaded: boolean,
    poem: string[] 
}
  
export interface IPoem { 
    author: string, 
    lines: string[],
    title: string 
}