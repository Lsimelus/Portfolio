import casual from "../assets/workImages/casual.png"
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
import music from "../assets/workImages/music.png"


const workImageMapper: Record<number, any> = {
  0: casual,
  1: code,
  2: cookie,
  3: genes,
  4: markov,
  5: neural,
  6: poetry,
  7: portfolio,
  8: royal,
  9: static1,
  10: static2,
  11: tbd,
  12: music
}
export const getWorkImage = (key: number) => {
  return workImageMapper[key]

}
