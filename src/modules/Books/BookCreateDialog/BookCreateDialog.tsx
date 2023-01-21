import { zodResolver } from '@hookform/resolvers/zod'
import {
    Button,
    Modal,
    Select,
    Stack,
    TextInput,
} from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { showNotification } from '@mantine/notifications'
import { IconPlus } from '@tabler/icons'
import dayjs from 'dayjs'
import {
    useEffect,
    useState,
} from 'react'
import {
    Controller,
    useForm,
} from 'react-hook-form'

import {
    extractFormFieldErrors,
    supabase,
    TABLES,
} from '../../../shared/utils'
import type { AuthorType } from '../../Authors'

import type { BookCreateFormValueType } from './BookCreateDialog.types'
import { bookValidation } from './BookCreateDialog.validation'

export const BookCreateDialog = () => {
    const [isOpen, setIsOpen] = useState(false)

    const [authors, setAuthors] = useState<AuthorType[]>([])

    const {
        control,
        formState,
        handleSubmit,
        register,
    } = useForm<BookCreateFormValueType>({
        defaultValues: {
            releaseDate: new Date().toISOString(),
        },
        resolver: zodResolver(bookValidation),
    })

    const fetchAuthors = async () => {
        await supabase
            .from(TABLES.authors)
            .select('*')
            .then((response) => {
                if (response.error) {
                    console.error(response.error)

                    showNotification({
                        color: 'red',
                        message: 'Error fetching authors',
                        title: 'Error',
                    })

                    return
                }

                setAuthors(response.data)
            })
    }

    useEffect(() => {
        void fetchAuthors()
    }, [])

    const onSubmit = async (formValue: BookCreateFormValueType) => {
        await supabase
            .from(TABLES.books)
            .insert({
                authorFk: formValue.author,
                name: formValue.name,
                pageCount: formValue.pagesCount,
                releaseDate: formValue.releaseDate,
            })
            .then(async (response) => {
                if (response.error) {
                    console.error(response.error)

                    showNotification({
                        color: 'red',
                        message: 'Error creating book',
                        title: 'Error',
                    })

                    return
                }

                await fetchAuthors()
            })
    }

    const onClose = () => {
        setIsOpen(false)
    }

    const onOpen = () => {
        setIsOpen(true)
    }

    return (
        <>
            <Button
                leftIcon={<IconPlus size={20} />}
                onClick={onOpen}
            >
                Create
            </Button>
            <Modal
                onClose={onClose}
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
                        <TextInput
                            {...register('pagesCount', {
                                valueAsNumber: true,
                            })}
                            {...extractFormFieldErrors(formState.errors.pagesCount)}
                            label="Page Count"
                            placeholder="Page count"
                            type="number"
                            withAsterisk={true}
                        />
                        <Controller
                            control={control}
                            name="author"
                            render={(controller) => {
                                return (
                                    <Select
                                        data={authors.map((author) => {
                                            return {
                                                label: `${author.firstName} ${author.lastName}`,
                                                value: author.id,
                                            }
                                        })}
                                        label="Author"
                                        onChange={controller.field.onChange}
                                        placeholder="Select author"
                                        value={controller.field.value}
                                    />
                                )
                            }}
                        />
                        <Controller
                            control={control}
                            name="releaseDate"
                            render={(controller) => {
                                return (
                                    <DatePicker
                                        label="Release Date"
                                        maxDate={dayjs().toDate()}
                                        onChange={controller.field.onChange}
                                        placeholder="Book release date"
                                        value={new Date(controller.field.value)}
                                        withAsterisk={true}
                                    />
                                )
                            }}
                        />
                        <Button type="submit">
                            Create
                        </Button>
                    </Stack>
                </form>
            </Modal>
        </>
    )
}
