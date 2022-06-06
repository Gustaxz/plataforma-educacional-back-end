import express from "express"
import cors from "cors"
import { prisma } from "./prisma"

const app = express()

app.use(cors())
app.use(express.json())

app.listen(process.env.PORT || 3333, () => {
    console.log('Servidor online!')
})

app.post('/', async (req, res) => {
    const { container, title, subject, madeBy } = req.body

    const response = await prisma.post.create({
        data: {
            container,
            title,
            createdAt: new Date(),
            subject,
            madeBy,
        }
    })

    return res.json(response)
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

app.post('/users', async (req, res) => {

    const {email, password, infos} = req.body

    const response = await prisma.user.create({
        data: {
            email, 
            password,
            infos
        }
    }).then( (data) => res.send({error: false, data,})).catch((e) => res.send({error: true, data: e}))

    return 

})

app.patch('/users/update', async (req, res) => {
    const { id, data } = req.body

    try {
        const response = await prisma.user.update({
            where: {
                id,
            },
            data: {
                infos: JSON.stringify(data)
            }
        }) 
    return res.json({response})     
    }
    catch {
        return res.json({error: '002', motive: 'User not found'})
    }
    
})

app.patch('/users/update/permissions', async (req, res) => {
    const { id, adm, teacher } = req.body    

    try {
        const response = await prisma.user.update({
            where: {
                id,
            },
            data: {
                adm,
                teacher,
            }
        })
        return res.json(response)
    } catch  {
        return res.json({error : '003', motive: "Something went wrong"})
    }
})

app.get('/users', async (req, res) => {
    const userId = req.query.user as string

    try {
        const response = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        return res.json(response)
    }

    catch {
        return res.json({error: '002', motive: 'User not found'})
    }
})

app.get('/users/email', async (req, res) => {
    const email = req.query.email as string

    try {
        const response = await prisma.user.findUnique({
            where: {
                email,
            }
        })

        return res.json(response)
    }

    catch {
        return res.json({error: '002', motive: 'User not found'})
    }
})

app.get('/allusers', async (req, res) => {
    try {
        const response = await prisma.user.findMany()

        return res.json(response)

    } catch  {
        return res.json({error : '003', motive: "Something went wrong"})
    }
})