import { Request, Response } from 'express'
import { Post } from '../entity/Post'
import { User } from '../entity/User'

export default class PostCrud {
    constructor(app) {
         // CREATE POSTS
        app.post('/posts', async(req: Request, res: Response) => {
            const { userUuid, title, body } = req.body
            try {

                const user = await User.findOneOrFail({ uuid: userUuid})
                const post = new Post({title, body, user})

                await post.save()
                return res.status(201).json(post)
            } catch(err){
                console.log(err)
                return res.status(500).json(err)
            }
        })

        // READ
        app.get('/posts', async(_:Request, res: Response) => {
            try {
                const posts = await Post.find({ relations: ['user']})
                return res.status(200).json(posts)
            } catch(err){
                console.log(err)
                return res.status(500).json(err)
            }
        })

        // UPDATE
        app.put('/posts/:uuid', async(req: Request, res: Response) => {
            const uuid = req.params.uuid
            const {name, email, role } = req.body

            // try {
            //     const user = await Post.findOneOrFail({ uuid })
            //     user.name = name || user.name
            //     user.email = email || user.email
            //     user.role = role || user.role
            //     await user.save()
            //     return res.json(user)

            // } catch (err) {
            //     console.log(err)
            //     return res.status(500).json(err)
                
            // }
        })

        // DELETE
        app.delete('/posts/:uuid', async(req: Request, res: Response) => {
            const uuid = req.params.uuid

            try {
                const user = await Post.findOneOrFail({ uuid })
                await user.remove()
                return res.status(204).json({message: "user deleted sucessfull"})

            } catch (err) {
                console.log(err)
                return res.status(500).json(err)
                
            }
        })


        // FIND
        app.get('/posts/:uuid', async(req: Request, res: Response) => {
            const uuid = req.params.uuid

            try {
                const user = await Post.findOneOrFail({ uuid })
                return res.status(200).json(user)

            } catch (err) {
                console.log(err)
                return res.status(404).json(err)
                
            }
        })
    }
}