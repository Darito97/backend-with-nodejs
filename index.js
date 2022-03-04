const express = require('express')
const app = express()
app.use(express.json())

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
]
app.get('/', (req, res) => {
  res.status(200).send('<h1>Hola mundo!</h1>')
})
app.get('/api/notes', (req, res) => {
  res.json(notes)
})
app.get('/api/notes/:id', (req, res) => {
  let id = Number(req.params.id)
  let foundNote = notes.filter(note => note.id === id)
  if (foundNote.length !== 0) {
    res.json(foundNote)
  }
  else {
    res.status(404).send('Recurso no encontrado')
  }
})

app.post('/api/notes', (req, res) => {
  let id = notes[notes.length - 1].id + 1
  const { content, important } = req.body
  if (content) {
    let note = {
      id,
      content,
      date: new Date(),
      important: important || false
    }
    notes.push(note)
    res.status(201).json({ note, success: true })
  }
  else {
    res.status(400).json({ success: false, error: "no-content" })
  }
})
app.delete('/api/notes/:id', (req, res) => {
  let id = Number(req.params.id)
  if (notes.find(note => note.id === id)) {
    notes = notes.filter(note => note.id !== id)
    res.status(204).send('Recurso eliminado')
  }
  else {
    res.status(404).send('Recurso no encontrado')
  }
})
app.put('/api/notes/:id', (req, res) => {
  let id = Number(req.params.id)
  if (notes.find(note => note.id === id)) {
    let { content, important } = req.body
    let index = notes.findIndex(note => note.id === id)
    notes[index] = {
      id,
      content,
      date: new Date(),
      important
    }
    res.status(200).json({ changed: true })
  }
  else {
    res.status(404).json({ changed: false, error: 'not found' })
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log('server runing on port ' + PORT)
})