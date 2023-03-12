import React from "react";
import resume from "../assets/resume.pdf"
import data from "../data/data.json"


export function useOnScreen(ref: any) {
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
  
    return isIntersecting ? "1" : "0"
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
  


export const formatTechSection= () => {
  let mapper = data.tech as any
  var formattedData: any[] = [[], [], []]
  
  for (const [key, value] of Object.entries(mapper)) {
    let data: any = value
    data["name"] = key
    formattedData[data["cat"]].push(data)
  }
  return formattedData
}