const app = require('./src/app')
const PORT = 3000

app.listen(PORT, () => {
    console.log(`This apple is listening on port ${PORT}`)
})