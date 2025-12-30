import { Box, Heading, useToast } from '@chakra-ui/react'
import { useState } from 'react'
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
import useUpdateCollection from '../hooks/useUpdateCollection'

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

interface Props {
  collection: Collection
}

const EditCollectionForm = ({ collection }: Props) => {
  const navigate = useNavigate()
  const toast = useToast()
  const [formVersion, setFormVersion] = useState(0)

  const updateCollection = useUpdateCollection(() => {
    // Increment form version to force form remount with new data
    setFormVersion((prev) => prev + 1)
    toast({
      title: 'Thành công',
      description: `Collection "${collection.title}" đã được cập nhật`,
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
    // Small delay to ensure cache is updated before navigation
    setTimeout(() => {
      navigate('/admin/collections')
    }, 100)
  }, collection.id)

  const defaultValues = {
    title: collection.title,
    description: collection.description,
    thumbnail: collection.thumbnail,
  }

  const onSubmit = (data: FromData) => {
    // Auto-generate slug from title, but keep existing slug if title hasn't changed
    const slug = collection.title === data.title ? collection.slug : generateSlug(data.title)
    const updateCollectionData: CreateCollection = {
      ...data,
      slug,
    }

    updateCollection.mutate(updateCollectionData, {
      onError: (error: any) => {
        toast({
          title: 'Lỗi',
          description: error.response?.data?.message || error.message || 'Không thể cập nhật collection',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      },
    })
  }

  const labelStyleProps = { fontWeight: '300', fontSize: 'sm', color: 'black' }

  const errorStyleProps = {
    fontWeight: '300',
    color: 'red.400',
  }

  const inputStyleProps = { color: 'black' }

  return (
    <Box as="section" id="edit-collection-form">
      <Heading
        fontWeight="300"
        textAlign="center"
        fontSize="5xl"
        marginBottom={5}
        color="black"
      >
        Chỉnh sửa Collection
      </Heading>

      <Box bgColor="#fff" paddingY={8} paddingX={5}>
        <Form
          key={`collection-${collection.id}-${formVersion}`}
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          schema={schema}
          labelStyleProps={labelStyleProps}
          errorStyleProps={errorStyleProps}
        >
          <TextInputField
            name="title"
            label="Tên Collection*"
            placeholder="Tên Collection"
            inputStyleProps={inputStyleProps}
          />

          <TextAreaInputField
            name="description"
            label="Mô tả Collection*"
            placeholder="Mô tả Collection"
            inputStyleProps={inputStyleProps}
          />

          <TextInputField
            name="thumbnail"
            label="URL Ảnh Thumbnail*"
            placeholder="URL Ảnh Thumbnail"
            inputStyleProps={inputStyleProps}
          />

          <Divider marginTop={8} marginBottom={3} />

          <SubmitButton />
        </Form>
      </Box>
    </Box>
  )
}

export default EditCollectionForm

