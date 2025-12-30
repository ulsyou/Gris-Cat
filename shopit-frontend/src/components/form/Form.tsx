import { FormLabelProps, TextProps } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { ReactNode } from 'react'
import { useForm, UseFormProps } from 'react-hook-form'
import { ZodSchema } from 'zod'

// type FromData = z.infer<typeof schema>

interface Props extends UseFormProps {
  children: ReactNode
  schema: ZodSchema
  onSubmit: (data: any) => void
  labelStyleProps?: FormLabelProps
  errorStyleProps?: TextProps
}

export function Form({
  defaultValues,
  children,
  onSubmit,
  schema,
  ...rest
}: Props) {
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {Array.isArray(children)
        ? children.map((child) => {
            if (!child.props.name) return child
            
            // Only pass setValue and getValues to components that need them (like AutoComplete)
            const needsFormMethods = child.type?.name === 'AutoComplete' || 
                                   child.props.setValue !== undefined ||
                                   child.props.getValues !== undefined
            
            const propsToPass = {
              ...child.props,
              register,
              error: errors[child.props.name],
              key: child.props.name,
              ...(needsFormMethods && { setValue, getValues }),
            }
            
            // Remove setValue and getValues from rest if they exist
            const { setValue: _, getValues: __, ...restProps } = rest as any
            
            return React.createElement(child.type, {
              ...propsToPass,
              ...restProps,
            })
          })
        : children}
    </form>
  )
}

export default Form
