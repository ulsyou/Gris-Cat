import prisma from "../libs/prisma"

export interface CheckoutSessionProdut {
    productId: number
    quantity: number
}

async function lookupProductPrice(order: CheckoutSessionProdut[]) {
    console.log("order", order)
    try {
        const productsDetail = await prisma.product.findMany({
            where: {
                id: { in: order.map(i => i.productId) },
            },
        })

        if (!productsDetail) throw new Error("No product found.")

        const orderWithProductDetail = order.map(o => {
            const product = productsDetail.find(pd => pd.id === o.productId)
            if (!product || !product.price) {
                throw new Error(`Product with id ${o.productId} not found or has no price`)
            }
            return {
                ...o,
                ...product,
            }
        })

        return orderWithProductDetail.map(opd => ({
            productId: opd.productId,
            title: opd.title,
            price: opd.price,
            quantity: opd.quantity,
        }))
    } catch (e) {
        console.log("Error", e)
        throw new Error(String(e))
    }
}

export async function createCheckoutSession(order: CheckoutSessionProdut[]) {
    // TODO: Implement your payment method here
    // This is a placeholder function - replace with your payment provider integration
    
    const frontEndDomain = process.env.FRONTENDDOMAIN || "http://localhost:5173"
    
    const orderItems = await lookupProductPrice(order)
    console.log("orderItems", orderItems)

    // Calculate total amount
    const totalAmount = orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )

    // Return order summary - replace this with your payment provider's checkout URL
    return {
        orderItems,
        totalAmount,
        successUrl: `${frontEndDomain}/checkoutsucess?success=true`,
        cancelUrl: `${frontEndDomain}/cart?canceled=true`,
        // url: "your-payment-provider-checkout-url" // Add your payment provider's checkout URL here
    }
}

const calculateOrderAmount = (items: any) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400
}
