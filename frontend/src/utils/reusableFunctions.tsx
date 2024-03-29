import React from "react";
import resume from "../assets/resume.pdf"


export function useOnScreen(ref: any, resumeSection: boolean=false) {
    const [isIntersecting, setIntersecting] = React.useState(false)
  
    const observer = React.useMemo(() => new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting)
    , {
      rootMargin: "-100px 0px 0px 0px"
    }), [ref])

    React.useEffect(() => {
      observer.observe(ref.current)
      return () => observer.disconnect()
    }, [])
    if (resumeSection){
      if (ref.current && ref.current.classList.contains("hidden")) {
        if (isIntersecting) {
          ref.current.classList.add("show")
        } else {
          ref.current.classList.remove("show")
        }
      }
      return isIntersecting

    }else{
      return isIntersecting ? "1" : "0"
    }
  
    
  }

export const handleClickScroll = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

export const downloadResume = () => {
    fetch(resume).then(response => {
      response.blob().then(blob => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement('a');
        alink.href = fileURL;
        alink.download = resume
        alink.click();
      })
    })
  }
  


