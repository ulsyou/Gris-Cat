import { Prisma } from "@prisma/client"

import { Request, Response } from "express"
import validateResource from "../middleware/validateResource"
import { CreateUserInput, ListUsersInput } from "../schema/user"
import { createUser, listUsers } from "../service/user.services"

export async function createUserHandler(
    req: Request<{}, {}, CreateUserInput["body"]>,
    res: Response
) {
    try {
        const user = await createUser(req.body)
        return res.send(user)
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (err.code === "P2002") {
                console.log(
                    "There is a unique constraint violation, a new user cannot be created with this email"
                )
                return res.send(500)
            }
        } else {
            return res.send(500)
        }
    }
}

// export async function getUserHandler(
//     req: Request<GetUserInput["params"], {}, {}>,
//     res: Response
// ) {
//     const user = await getUser(req.params)

//     if (!user) return res.sendStatus(404)

//     return res.send(user)
// }

// export async function updateUserHandler(
//     req: Request<UpdateUserInput["params"], {}, UpdateUserInput["body"]>,
//     res: Response
// ) {
//     const update = req.body

//     const user = await getUser(req.params)

//     if (!user) {
//         return res.sendStatus(404)
//     }

//     const updatedProduct = await updateUser(req.params, update)

//     return res.send(updatedProduct)
// }

export async function listUsersHandler(
    req: Request<{}, {}, {}, ListUsersInput["query"]>,
    res: Response
) {
    try {
        const users = await listUsers({ query: req.query })
        return res.send(users)
    } catch (err) {
        return res.sendStatus(400)
    }
}
