import { useEffect } from "react"

/**
 * React is worried that fn might change and wants to include it in the dependencies.
 * There is no need for that, and I've disabled ES lint to ignore the warning.
 */

/* eslint-disable */
export const useAsyncEffect = (fn: () => Promise<any>, dependencies: React.DependencyList) => {
    useEffect(() => {
        fn();
    }, dependencies)
}
/* eslint-enable */