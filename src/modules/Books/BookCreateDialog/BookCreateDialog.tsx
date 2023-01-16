import { zodResolver } from '@hookform/resolvers/zod'
import {
    Button,
    Modal,
    Select,
    Stack,
    TextInput,
} from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useDisclosure } from '@mantine/hooks'
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
    const [isOpen, setIsOpen] = useDisclosure(false)

    const [authors, setAuthors] = useState<AuthorType[]>([])
    const [loading, setLoading] = useState(false)

    const {
        control,
        formState,
        handleSubmit,
        register,
        reset,
    } = useForm<BookCreateFormValueType>({
        defaultValues: { // TODO: default value not passed to form field
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
        fetchAuthors()
    }, [])

    const onSubmit = async (formValue: BookCreateFormValueType) => {
        setLoading(true)

        await supabase
            .from(TABLES.books)
            .insert({
                author_fk: formValue.author,
                name: formValue.name,
                page_count: formValue.pagesCount,
                release_date: formValue.releaseDate,
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

                setLoading(false)
            })
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
                                                label: `${author.first_name} ${author.last_name}`,
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
