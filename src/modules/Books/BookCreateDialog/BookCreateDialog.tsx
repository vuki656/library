import { zodResolver } from '@hookform/resolvers/zod'
import {
    Button,
    Modal,
    Stack,
    TextInput,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPlus } from '@tabler/icons'
import { useForm } from 'react-hook-form'

import { extractFormFieldErrors } from '../../../shared/utils'

import type { BookCreateFormValueType } from './BookCreateDialog.types'
import { bookValidation } from './BookCreateDialog.validation'

export const BookCreateDialog = () => {
    const [isOpen, setIsOpen] = useDisclosure(false)

    const {
        formState,
        handleSubmit,
        register,
        reset,
    } = useForm<BookCreateFormValueType>({
        resolver: zodResolver(bookValidation),
    })

    const onSubmit = (formValue: BookCreateFormValueType) => {
        console.log(formValue)
    }

    return (
        <>
            <Button
                leftIcon={<IconPlus size={20} />}
                onClick={setIsOpen.open}
            >
                Create
            </Button>
            <Modal
                onClose={setIsOpen.close}
                opened={isOpen}
                title="Create Book"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack>
                        <TextInput
                            {...register('name')}
                            {...extractFormFieldErrors(formState.errors.name)}
                            label="Name"
                            placeholder="Book name"
                            withAsterisk={true}
                        />
                        <Button
                            loading={false}
                            type="submit"
                        >
                            Create
                        </Button>
                    </Stack>
                </form>
            </Modal>
        </>
    )
}
