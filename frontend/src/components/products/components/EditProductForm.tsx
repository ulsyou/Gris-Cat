import { Box, Heading } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import useCollections from '../../collections/hooks/useCollections'
import Form, {
  SubmitButton,
  TextAreaInputField,
  TextInputField,
} from '../../form'
import AutoComplete from '../../form/AutoComplete'
import Divider from '../../UI-Components/Divider'
import { generateSlug } from '../../../utils/generateSlug'
import { Product, UpdateProduct } from '../hooks/productService'
import useUpdateProduct from '../hooks/useUpdateProduct'

const schema = z.object({
  title: z
    .string()
    .max(255, 'Product Title should not longer than 255 letter')
    .nonempty('Product Title is required.'),
  description: z
    .string()
    .nonempty('Description is required')
    .max(1024, 'Description should not longer than 1024 letter'),
  price: z
    .number()
    .multipleOf(0.01, 'Product price should have only 2 decimal places.')
    .min(0, 'Product price should larger than 0.')
    .max(999999, 'Product price should not larger than 999999.'),
  SKU: z
    .string()
    .min(1, 'SKU should longer than 1')
    .max(255, 'SKU should not longer than 255.'),
  inventory: z.number().min(0),
  gallery: z.string().optional(),
  collectionIds: z.array(z.number()).optional(),
  hoverImage: z.string().optional(),
  thumbnail: z.string().optional(),
})

type FromData = z.infer<typeof schema>

interface Props {
  product: Product
}

const EditProductForm = ({ product }: Props) => {
  const { data: collections } = useCollections()
  const navigate = useNavigate()

  console.log('product', product)

  const updateProduct = useUpdateProduct(() => {
    console.log('Success')
    // Small delay to ensure cache is updated before navigation
    setTimeout(() => {
      navigate('/admin/products')
    }, 100)
  }, product.id)

  const defaultValues = {
    title: product.title,
    description: product.description,
    price: product.price,
    SKU: product.SKU,
    inventory: product.inventory,
    gallery: product.gallery.toString(),
    collectionIds:
      product?.collectionsOnProducts?.map(({ collection }) => collection.id) ||
      [],
    hoverImage: product.hoverImage || '',
    thumbnail: product.thumbnail || '',
  }

  const onSubmit = (data: FromData) => {
    const { gallery, collectionIds, ...rest } = data
    // Auto-generate slug from title, but keep existing slug if title hasn't changed
    const slug = product.title === data.title ? product.slug : generateSlug(data.title)

    const updateProjectData: UpdateProduct = {
      ...rest,
      slug,
      collectionIds,
      gallery: gallery?.split(',') || [],
    }

    updateProduct.mutate(updateProjectData)

    console.log('updateProductData', updateProjectData)
  }

  const labelStyleProps = { fontWeight: '300', fontSize: 'sm', color: 'black' }

  const errorStyleProps = {
    fontWeight: '300',
    fontSize: 'sm',
    color: 'red.400',
  }

  const inputStyleProps = { color: 'black' }

  return (
    <Box>
      <Heading
        fontWeight="300"
        textAlign="center"
        fontSize="5xl"
        marginBottom={5}
        color="black"
      >
        Edit Product Detail
      </Heading>

      <Box bgColor="#fff" paddingY={8} paddingX={5}>
        <Form
          key={`product-${product.id}-${product.updatedAt}`}
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          schema={schema}
          labelStyleProps={labelStyleProps}
          errorStyleProps={errorStyleProps}
        >
          <TextInputField
            name="title"
            label="Title*"
            placeholder="Product Title"
            inputStyleProps={inputStyleProps}
          />

          <AutoComplete
            name="collectionIds"
            label="Collection*"
            placeholder="Search Collections ..."
            selections={collections?.map(({ id, title }) => {
              return { id: `${id}`, title, value: id }
            })}
            labelStyleProps={labelStyleProps}
          />

          <TextAreaInputField
            name="description"
            label="Description*"
            placeholder="A brief description of the product."
            inputStyleProps={inputStyleProps}
          />

          <TextInputField
            name="price"
            label="Product Price*"
            registerOption={{ valueAsNumber: true }}
            placeholder="6835.25"
            startWith="$"
            inputStyleProps={inputStyleProps}
          />

          <TextInputField
            name="SKU"
            label="SKU*"
            placeholder="P356103"
            inputStyleProps={inputStyleProps}
          />

          <TextInputField
            name="inventory"
            label="Inventory*"
            registerOption={{ valueAsNumber: true }}
            placeholder="36"
            inputStyleProps={inputStyleProps}
          />

          <TextAreaInputField
            name="gallery"
            label="Gallery*"
            placeholder={`https://image1.com, https://image2.com, https://image3.com `}
            inputStyleProps={inputStyleProps}
          />

          <TextInputField
            name="hoverImage"
            label="Hover Image"
            placeholder="https://"
            inputStyleProps={inputStyleProps}
          />

          <TextInputField
            name="thumbnail"
            label="Thumbnail"
            placeholder="https://"
            inputStyleProps={inputStyleProps}
          />

          <Divider marginTop={8} marginBottom={3} />

          <SubmitButton />
        </Form>
      </Box>
    </Box>
  )
}

export default EditProductForm
