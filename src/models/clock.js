import { prompt } from '../controllers/prompt'

class Clock {
  constructor() {
    setInterval(()=> prompt.ask(), 15*60*1000)
  }
}

let clock = new Clock()
