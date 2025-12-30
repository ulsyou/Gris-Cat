import {
    CreateCollectionInput,
    DeleteCollectionInput,
    GetCollectionsInput,
    UpdateCollectionInput,
} from "../schema/collection"
import { Request, Response } from "express"
import { Collection, Product } from "@prisma/client"
import { GetCollectionInput } from "../schema/collection"
import {
    createCollection,
    deleteCollection,
    getCollection,
    listCollections,
    updateCollection,
    getCollectionProducts,
} from "../service/collection.services"

export async function createCollectionHandler(
    req: Request<{}, {}, CreateCollectionInput["body"]>,
    res: Response
) {
    try {
        const collection = await createCollection(req.body)
        return res.send(collection)
    } catch (err) {
        return res.sendStatus(400)
    }
}

export async function getCollectionsHandler(
    req: Request<{}, {}, {}, GetCollectionsInput["query"]>,
    res: Response
) {
    try {
        const collections = await listCollections({ query: req.query })
        return res.send(collections)
    } catch (err) {
        return res.sendStatus(400)
    }
}

export async function getCollectionHandler(
    req: Request<GetCollectionInput["params"], {}, {}>,
    res: Response<Collection | null>
) {
    try {
        const collection = await getCollection(req.params)
        return res.send(collection)
    } catch (err) {
        return res.sendStatus(400)
    }
}
export async function getCollectionProductsHandler(
    req: Request<GetCollectionInput["params"], {}, {}>,
    res: Response<Product[] | null | undefined>
) {
    try {
        const products = await getCollectionProducts(req.params)
        return res.send(products)
    } catch (err) {
        return res.sendStatus(400)
    }
}

export async function updateCollectionHandler(
    req: Request<
        UpdateCollectionInput["params"],
        UpdateCollectionInput["body"]
    >,
    res: Response<Collection>
) {
    try {
        const collection = await updateCollection(req.params, req.body)
        return res.send(collection)
    } catch (err) {
        return res.sendStatus(400)
    }
}

export async function deleteCollectionHandler(
    req: Request<DeleteCollectionInput["params"]>,
    res: Response
) {
    try {
        const collection = await deleteCollection(req.params)
        return res.send(collection)
    } catch (err: any) {
        console.log('========== DELETE COLLECTION HANDLER ERROR ==========')
        console.log('Error type:', typeof err)
        console.log('Error constructor:', err?.constructor?.name)
        console.log('Error code:', err?.code)
        console.log('Error message:', err?.message)
        console.log('Error meta:', JSON.stringify(err?.meta, null, 2))
        console.log('Full error:', JSON.stringify(err, Object.getOwnPropertyNames(err), 2))
        console.log('====================================================')
        
        // If it's a Prisma constraint error, return 409
        if (err?.code === 'P2003' || err?.message?.includes('referenced') || err?.message?.includes('constraint')) {
            return res.status(409).send({ 
                message: err.message || 'Cannot delete collection because it is still referenced by products or other entities.',
                code: err.code,
                meta: err.meta
            })
        }
        
        // For other errors, return 400 with the error message
        return res.status(400).send({ 
            message: err.message || 'Failed to delete collection',
            code: err.code,
            meta: err.meta
        })
    }
}
