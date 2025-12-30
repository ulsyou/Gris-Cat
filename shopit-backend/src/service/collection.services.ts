import {
    CreateCollectionInput,
    DeleteCollectionInput,
    GetCollectionInput,
    GetCollectionsInput,
    UpdateCollectionInput,
} from "../schema/collection"
import { PrismaClient } from "@prisma/client"
import { databaseResponseTimeHistogram } from "../utils/metrics"

const prisma = new PrismaClient()

export async function createCollection(data: CreateCollectionInput["body"]) {
    const metricsLabels = {
        operation: "Create Collection",
    }

    const timer = databaseResponseTimeHistogram.startTimer()

    try {
        const result = await prisma.collection.create({
            data,
        })

        timer({ ...metricsLabels, success: "true" })
        return result
    } catch (e) {
        timer({ ...metricsLabels, success: "false" })
        throw e
    }
}

export async function getCollection({
    collectionId,
}: GetCollectionInput["params"]) {
    const metricsLabels = {
        operation: "Get Collection",
    }

    const data = {
        id: parseInt(collectionId),
    }

    const timer = databaseResponseTimeHistogram.startTimer()

    try {
        const collection = await prisma.collection.findUnique({
            where: data,
            include: { products: true },
        })

        timer({ ...metricsLabels, success: "true" })

        return collection
    } catch (e) {
        timer({ ...metricsLabels, success: "false" })
        throw e
    }
}

export async function getCollectionProducts({
    collectionId,
}: GetCollectionInput["params"]) {
    const metricsLabels = {
        operation: "Get Collection",
    }

    const data = {
        id: parseInt(collectionId),
    }

    const timer = databaseResponseTimeHistogram.startTimer()

    try {
        const collection = await prisma.collection.findUnique({
            where: data,

            include: { products: { include: { product: true } } },
        })

        timer({ ...metricsLabels, success: "true" })

        return collection?.products.map(({ product }) => product)
    } catch (e) {
        timer({ ...metricsLabels, success: "false" })
        throw e
    }
}

export async function listCollections({ query }: GetCollectionsInput) {
    console.log("query", query)

    const metricsLabels = {
        operation: "Get Collections",
    }

    const timer = databaseResponseTimeHistogram.startTimer()

    try {
        const result = await prisma.collection.findMany({
            orderBy: {
                id: "asc",
            },
        })
        timer({ ...metricsLabels, success: "true" })
        return result
    } catch (e) {
        timer({ ...metricsLabels, success: "false" })
        throw e
    }
}

export async function deleteCollection({
    collectionId,
}: DeleteCollectionInput["params"]) {
    console.log('========== DELETE COLLECTION CALLED ==========')
    console.log('collectionId:', collectionId)
    
    const metricsLabels = {
        operation: "Delete Collection",
    }

    const timer = databaseResponseTimeHistogram.startTimer()

    try {
        const id = parseInt(collectionId)
        console.log('Parsed id:', id)

        // Check if collection exists first
        const existingCollection = await prisma.collection.findUnique({
            where: { id },
        })

        if (!existingCollection) {
            throw new Error('Collection not found.')
        }

        // Use a transaction to ensure all operations succeed together
        const result = await prisma.$transaction(async (tx) => {
            // Delete all CollectionsOnProducts relationships first
            // This has ON DELETE CASCADE, so it should work
            await tx.collectionsOnProducts.deleteMany({
                where: { collectionId: id },
            })

            // Then delete the collection
            // featureProductId doesn't need to be set to null - it's a reference FROM Collection TO Product,
            // not the other way around, so it won't prevent deletion
            return await tx.collection.delete({
                where: { id },
            })
        }, {
            timeout: 10000, // 10 second timeout
        })

        timer({ ...metricsLabels, success: "true" })

        return result
    } catch (e: any) {
        timer({ ...metricsLabels, success: "false" })

        // Log the full error for debugging - using console.log to ensure it shows up
        console.log('========== DELETE COLLECTION ERROR ==========')
        console.log('Error type:', typeof e)
        console.log('Error constructor:', e?.constructor?.name)
        console.log('Error code:', e?.code)
        console.log('Error message:', e?.message)
        console.log('Error meta:', JSON.stringify(e?.meta, null, 2))
        console.log('Full error object:', JSON.stringify(e, Object.getOwnPropertyNames(e), 2))
        console.log('=============================================')

        // Provide a more helpful error message
        if (e?.code === 'P2003') {
            const field = e?.meta?.field_name || 'unknown field'
            const errorMsg = `Cannot delete collection because it is still referenced by ${field}.`
            console.log('P2003 error detected:', errorMsg)
            throw new Error(errorMsg)
        }
        if (e?.code === 'P2025') {
            throw new Error('Collection not found.')
        }
        // Re-throw with original message for other errors
        throw e
    }
}

export async function updateCollection(
    { collectionId }: UpdateCollectionInput["params"],
    body: UpdateCollectionInput["body"]
) {
    const metricsLabels = {
        operation: "Update Collection",
    }
    const id = parseInt(collectionId)

    const timer = databaseResponseTimeHistogram.startTimer()

    try {
        const result = await prisma.collection.update({
            where: { id },
            data: body,
        })

        timer({ ...metricsLabels, success: "true" })

        return result
    } catch (e) {
        timer({ ...metricsLabels, success: "false" })
        throw e
    }
}
