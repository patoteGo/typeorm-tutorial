import { validate } from 'class-validator'
import { Request, Response } from 'express'
import { User } from '../entity/User'

export default class UserCrud {
 constructor(app){
    // CREATE
    app.post('/users', async(req: Request, res: Response) => {
        const { name, email, role } = req.body
        try {
            const user = User.create({name, email, role})
            const errors = await validate(user)
            if(errors.length > 0) throw errors

            await user.save()
            return res.status(201).json(user)
        } catch(err){
            console.log(err)
            return res.status(500).json(err)
        }
    })

    // READ
    app.get('/users', async(_:Request, res: Response) => {
        try {
            const users = await User.find({relations : ['posts']})
            return res.status(200).json(users)
        } catch(err){
            console.log(err)
            return res.status(500).json(err)
        }
    })

    // UPDATE
    app.put('/users/:uuid', async(req: Request, res: Response) => {
        const uuid = req.params.uuid
        const {name, email, role } = req.body

        try {
            const user = await User.findOneOrFail({ uuid })
            user.name = name || user.name
            user.email = email || user.email
            user.role = role || user.role
            await user.save()
            return res.json(user)

        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
            
        }
    })

    // DELETE
    app.delete('/users/:uuid', async(req: Request, res: Response) => {
        const uuid = req.params.uuid

        try {
            const user = await User.findOneOrFail({ uuid })
            await user.remove()
            return res.status(204).json({message: "user deleted sucessfull"})

        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
            
        }
    })


    // FIND
    app.get('/users/:uuid', async(req: Request, res: Response) => {
        const uuid = req.params.uuid

        try {
            const user = await User.findOneOrFail({ uuid })
            return res.status(200).json(user)

        } catch (err) {
            console.log(err)
            return res.status(404).json(err)
            
        }
    })

 }    
}
