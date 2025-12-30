import { Request, Response, NextFunction } from "express"
import { AnyZodObject, ZodOptional, ZodError } from "zod"

const validate =
    (schema: AnyZodObject | ZodOptional<AnyZodObject>) =>
    async (req: Request<any>, res: Response, next: NextFunction) => {
        try {
            const dataToValidate: any = {}
            // Always include params if they exist (for route params)
            if (req?.params && Object.keys(req.params).length > 0) {
                dataToValidate.params = req.params
            }
            // Only include body for POST, PUT, PATCH requests
            if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
                if (req?.body && Object.keys(req.body).length > 0) {
                    dataToValidate.body = req.body
                }
            }
            // Always include query for GET requests (even if empty), or if it has content
            if (req.method === 'GET' || (req?.query && Object.keys(req.query).length > 0)) {
                dataToValidate.query = req.query || {}
            }
            
            console.log('========== VALIDATION START ==========')
            console.log('Method:', req.method)
            console.log('URL:', req.url)
            console.log('Data to validate:', JSON.stringify(dataToValidate, null, 2))
            const schemaShape = 'shape' in schema ? schema.shape : {}
            console.log('Schema shape keys:', Object.keys(schemaShape))
            console.log('Has body in data?', 'body' in dataToValidate)
            console.log('Has params in data?', 'params' in dataToValidate)
            console.log('======================================')
            
            await schema.parseAsync(dataToValidate)
            next()
        } catch (error) {
            let err = error
            if (err instanceof ZodError) {
                console.log('Validation error:', err.issues)
                err = err.issues.map(e => ({
                    path: e.path.join('.'),
                    message: e.message,
                }))
            }
            return res.status(409).json({
                status: "failed",
                error: err,
            })
        }
        // } catch (e: any) {
        //     return res.status(400).send(e.errors)
        // }
    }

export default validate
