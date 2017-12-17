import * as decimal from 'decimal.js'
import * as fs from 'fs'
import * as Handlebars from 'handlebars'
import { Deckbox } from './Deckbox'

let tmplFile = fs.readFileSync('template.html')
let template = Handlebars.compile(tmplFile.toString())
let deckbox = new Deckbox(
  new decimal(63), new decimal(88), new decimal(20))

console.log(
  template({ deckbox: deckbox }))
