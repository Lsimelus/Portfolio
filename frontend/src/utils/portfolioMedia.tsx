import code from "../assets/workImages/code.png"
import cookie from "../assets/workImages/cookie.png"
import genes from "../assets/workImages/genes.png"
import markov from "../assets/workImages/markov.png"
import neural from "../assets/workImages/neural.png"
import poetry from "../assets/workImages/poetry.png"
import portfolio from "../assets/workImages/portfolio.png"
import royal from "../assets/workImages/royal.png"
import static1 from "../assets/workImages/static1.png"
import static2 from "../assets/workImages/static2.png"
import tbd from "../assets/workImages/tbd.png"
import casual from "../assets/workImages/casual.png"
import casualVid from "../assets/workVids/casualVid.mp4"
import cookieVid from "../assets/workVids/cookieVid.mp4"
import geneticVid from "../assets/workVids/geneticVid.mp4"
import markovVid from "../assets/workVids/markovVid.mp4"
import neuralVid from "../assets/workVids/neuralVid.mp4"
import poetryVid from "../assets/workVids/poetryVid.mp4"
import royalVid from "../assets/workVids/royalVid.mp4"



const workMediaMapper: Record<number, {image?: any, vid?: any}> = {
  0: { "vid": casualVid , "image": casual},
  1: { "image": code },
  2: {
    "image": cookie,
    "vid": cookieVid
  },
  3: {
    "image": genes,
    "vid": geneticVid
  },
  4: {
    "vid": markovVid,
    "image": markov
  },
  5: {
    "image": neural,
    "vid": neuralVid
  },
  6: {
    "image": poetry,
    "vid": poetryVid
  },
  7: { "image": portfolio },
  8: {
    "image": royal,
    "vid": royalVid
  },
  9: { "image": static1 },
  10: { "image": static2 },
  11: { "image": tbd }
}


export const getWorkMedia = (key: number) => {
  return workMediaMapper[key]

}
