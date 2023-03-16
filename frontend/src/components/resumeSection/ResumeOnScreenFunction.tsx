import React from "react";


export function useOnScreen(ref: any) {
    const [isIntersecting, setIntersecting] = React.useState(false)
  
    const observer = React.useMemo(() => new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting)
      , {
        rootMargin: "200px 0px -100px 0px"
      }), [ref])
  
    React.useEffect(() => {
      if (ref.current) {
  
        observer.observe(ref.current)
        return () => observer.disconnect()
      }
    }, [])
  
    if (ref.current && ref.current.classList.contains("hidden")) {
      if (isIntersecting) {
        ref.current.classList.add("show")
      } else {
        ref.current.classList.remove("show")
      }
    }
    return isIntersecting
  }