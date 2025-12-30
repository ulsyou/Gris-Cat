import { Box, Heading, useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import Form, {
  SubmitButton,
  TextAreaInputField,
  TextInputField,
} from '../../form'
import Divider from '../../UI-Components/Divider'
import { generateSlug } from '../../../utils/generateSlug'
import { CreateCollection } from '../hooks/useCreateCollection'
import useCreateCollection from '../hooks/useCreateCollection'

const schema = z.object({
  title: z
    .string()
    .max(255, 'Collection Title should not longer than 255 letter')
    .nonempty('Collection Title is required.'),
  description: z
    .string()
    .nonempty('Description is required')
    .max(1024, 'Description should not longer than 1024 letter'),
  thumbnail: z.string().nonempty('Thumbnail URL is required'),
})

type FromData = z.infer<typeof schema>

const CreateCollectionForm = () => {
  const navigate = useNavigate()
  const toast = useToast()

  const createCollection = useCreateCollection({
    onAdd: (collection) => {
      toast({
        title: 'Success',
        description: `${collection.title} is created`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      navigate('/admin/collections')
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

  const onSubmit = (data: FromData) => {
    const slug = generateSlug(data.title)
    const createCollectionData: CreateCollection = {
      ...data,
      slug,
    }

    createCollection.mutate(createCollectionData)
  }

  const labelStyleProps = { fontWeight: '300', fontSize: 'sm', color: 'gray.800' }

  const errorStyleProps = {
    fontWeight: '300',
    color: 'red.400',
  }

  return (
    <Box as="section" id="create-collection-form">
      <Heading
        fontWeight="300"
        textAlign="center"
        fontSize="5xl"
        marginBottom={5}
        color="gray.800"
      >
        Tạo Collection Mới
      </Heading>

      <Box bgColor="#fff" paddingY={8} paddingX={5}>
        <Form
          onSubmit={onSubmit}
          schema={schema}
          labelStyleProps={labelStyleProps}
          errorStyleProps={errorStyleProps}
        >
          <TextInputField
            name="title"
            label="Tên Collection*"
            placeholder="Tên Collection"
            inputStyleProps={{ color: 'gray.800' }}
          />

          <TextAreaInputField
            name="description"
            label="Mô tả Collection*"
            placeholder="Mô tả Collection"
            inputStyleProps={{ color: 'gray.800' }}
          />

          <TextInputField
            name="thumbnail"
            label="URL Ảnh Thumbnail*"
            placeholder="URL Ảnh Thumbnail"
            inputStyleProps={{ color: 'gray.800' }}
          />

          <Divider marginTop={8} marginBottom={3} />

          <SubmitButton />
        </Form>
      </Box>
    </Box>
  )
}

export default CreateCollectionForm

