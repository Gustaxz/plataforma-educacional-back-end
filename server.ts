import express from "express"
import cors from "cors"
import { prisma } from "./prisma"

const app = express()

app.use(cors())
app.use(express.json())

app.listen(process.env.PORT ||3333, () => {
    console.log('Servidor online!')
})

app.post('/', async (req, res) => {
    const { container, title, subject } = req.body

    await prisma.post.create({
        data: {
            container,
            title,
            createdAt: new Date(),
            subject,
        }
    })

    console.log(req.body)

    return res.send("Post enviado")
})

app.get('/subjects', async (req, res) => {
    const subject = req.query.subject as string

    const response = await prisma.post.findMany({
        where: {
            subject,
        }
    })

    res.send(JSON.stringify(response))
})

app.get('/topics', async (req, res) => {
    const topic = req.query.topic
    const id = Number(topic)

    const response = await prisma.post.findUnique({
        where: {
            id,
        }
    })

    res.send(JSON.stringify(response))
})