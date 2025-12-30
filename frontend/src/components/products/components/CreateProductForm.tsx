import { Box, Heading, useToast } from '@chakra-ui/react'
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
import { CreateProduct } from '../hooks/productService'
import useCreateProduct from '../hooks/useCreateProduct'

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

const CreateProductForm = () => {
  const { data: collections } = useCollections()
  const navigate = useNavigate()
  const toast = useToast()

  const createProudct = useCreateProduct({
    onAdd: (product) => {
      toast({
        title: 'Success',
        description: `${product.title} is created`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      navigate('/admin/products')
    },
    onError: (error) => {
      toast({
        title: 'Error.',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    },
  })

  const defaultValues = {
    inventory: 1,
  }

  const onSubmit = (data: FromData) => {
    const { gallery, collectionIds, ...rest } = data
    const slug = generateSlug(data.title)

    const createProdutData: CreateProduct = {
      ...rest,
      slug,
      gallery: gallery?.split(',') || [],
      collectionIds: collectionIds || [],
    }

    createProudct.mutate(createProdutData)

    console.log('createProdutData', createProdutData)
  }

  const labelStyleProps = { fontWeight: '300', fontSize: 'sm', color: 'black' }

  const errorStyleProps = {
    fontWeight: '300',
    fontSize: 'sm',
    color: 'red.400',
  }

  const inputStyleProps = { color: 'black' }

  return (
    <Box as="section" id="creat-product-from">
      <Heading
        fontWeight="300"
        textAlign="center"
        fontSize="5xl"
        marginBottom={5}
        color="black"
      >
        Thêm sản phẩm
      </Heading>

      <Box bgColor="#fff" paddingY={8} paddingX={5}>
        <Form
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          schema={schema}
          labelStyleProps={labelStyleProps}
          errorStyleProps={errorStyleProps}
        >
          <TextInputField
            name="title"
            label="Tên sản phẩm*"
            placeholder="Tên sản phẩm"
            inputStyleProps={inputStyleProps}
          />

          <AutoComplete
            name="collectionIds"
            label="Collections"
            placeholder="Search Collections ..."
            selections={collections?.map(({ id, title }) => {
              return { id: `${id}`, title, value: id }
            })}
            labelStyleProps={labelStyleProps}
          />

          <TextAreaInputField
            name="description"
            label="Mô tả*"
            placeholder="Mô tả sản phẩm"
            inputStyleProps={inputStyleProps}
          />

          <TextInputField
            name="price"
            label="Giá sản phẩm*"
            registerOption={{ valueAsNumber: true }}
            placeholder="Giá sản phẩm"
            startWith="$"
            inputStyleProps={inputStyleProps}
          />

          <TextInputField
            name="SKU"
            label="Mã sản phẩm*"
            placeholder="P356103"
            inputStyleProps={inputStyleProps}
          />

          <TextInputField
            name="inventory"
            label="Số lượng*"
            registerOption={{ valueAsNumber: true }}
            placeholder="Số lượng sản phẩm"
            inputStyleProps={inputStyleProps}
          />

          <TextAreaInputField
            name="gallery"
            label="Ảnh sản phẩm*"
            placeholder={`Ảnh sản phẩm`}
            inputStyleProps={inputStyleProps}
          />

          <TextInputField
            name="hoverImage"
            label="Ảnh hover"
            placeholder="Ảnh hover"
            inputStyleProps={inputStyleProps}
          />

          <TextInputField
            name="thumbnail"
            label="Ảnh thu nhỏ"
            placeholder="Ảnh thu nhỏ"
            inputStyleProps={inputStyleProps}
          />

          <Divider marginTop={8} marginBottom={3} />

          <SubmitButton />
        </Form>
      </Box>
    </Box>
  )
}

export default CreateProductForm
