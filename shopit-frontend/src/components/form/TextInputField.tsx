import {
  BoxProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  FormLabelProps,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
  Text,
  TextProps,
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form'

// type FromData = z.infer<typeof schema>

interface Props {
  name: string
  label: string
  placeholder?: string
  startWith?: ReactNode
  endWith?: ReactNode
  labelStyleProps?: FormLabelProps
  errorStyleProps?: TextProps
  inputStyleProps?: InputProps
  registerOption?: RegisterOptions
  register?: UseFormRegister<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any
  }>
  error?: FieldError
}

const TextInputField = (props: Props) => {
  const {
    register,
    error,
    label,
    name,
    placeholder = '',
    startWith,
    endWith,
    labelStyleProps,
    inputStyleProps,
    errorStyleProps,
    registerOption,
    ...rest
  } = props

  // Remove react-hook-form methods that shouldn't be passed to DOM elements
  const { setValue, getValues, ...inputProps } = rest as any

  if (!register) return <Text>There is no Register.</Text>

  return (
    <FormControl isInvalid={error ? true : false} border={0} marginBottom={5}>
      <FormLabel htmlFor={name} {...labelStyleProps}>
        {label}
      </FormLabel>

      {startWith || endWith ? (
        <InputGroup>
          {startWith && <InputLeftElement>{startWith}</InputLeftElement>}
          <Input
            id={name}
            placeholder={placeholder}
            borderColor="gray.400"
            _hover={{ borderColor: 'gray.500' }}
            _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
            {...register(name, registerOption)}
            {...inputProps}
            {...inputStyleProps}
          />
          {endWith && <InputRightElement>{endWith}</InputRightElement>}
        </InputGroup>
      ) : (
        <Input
          id={name}
          placeholder={placeholder}
          borderColor="gray.400"
          _hover={{ borderColor: 'gray.500' }}
          _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
          {...register(name, registerOption)}
          {...inputProps}
          {...inputStyleProps}
        />
      )}
      <FormErrorMessage {...errorStyleProps}>
        {error && error.message}
      </FormErrorMessage>
    </FormControl>
  )
}

export default TextInputField
