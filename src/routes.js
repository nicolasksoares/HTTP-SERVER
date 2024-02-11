import { randomUUID } from 'node:crypto'
import { Database } from "./database.js"
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { search } = req.query
            
            const tasks = database.select('tasks', search ? {
                title: search,
                description: search
            } : null )

            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { id, title, description} = req.body

            const task = {

                id: randomUUID(),
                title,
                description,
                Created_at: Date(),
    
            }
    
            database.insert('tasks', task)
    
            return res.writeHead(201).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const{ id } = req.params

            database.delete('tasks', id)

            return res.writeHead(204).end()
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params
            const { title, description} = req.body

            database.update('tasks', id ,{
                title,
                description,
                Updated_at: Date()
            })
            return res.end()
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete/:complete'),
        handler: (req, res) => {
            const { id, complete } = req.params
            const { Complete_at } = req.body

            database.patch('tasks', id, {
                Complete_at: Date(),
            })
            return res.end()
    }
}

]