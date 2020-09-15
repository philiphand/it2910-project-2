import { useEffect } from "react"

export const useAsyncEffect = (fn: () => Promise<any>, dependencies: React.DependencyList) => {
    useEffect(() => {
        fn();
    }, dependencies)
}