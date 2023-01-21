import { zodResolver } from '@hookform/resolvers/zod'
import { ActionIcon, Button, Modal, Select, Stack, TextInput } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { showNotification } from '@mantine/notifications'
import { IconPencil } from '@tabler/icons'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import authors from '../../../pages/authors'
import { DEFAULT_ICON_SIZE } from '../../../shared/constants'
import { extractFormFieldErrors, supabase, TABLES } from '../../../shared/utils'
import { AuthorType } from '../../Authors'
import type { BookUpdateDialogProps, BookUpdateFormValueType } from './BookUpdateDialog.types'
import { bookUpdateValidation } from './BookUpdateDialog.validation'

export const BookUpdateDialog = (props: BookUpdateDialogProps) => {
    const {
        onSubmit: onSubmitProp,
        book,
    } = props

    const [isOpen, setIsOpen] = useState(false)

    const [authors, setAuthors] = useState<AuthorType[]>([])

    const {
        control,
        formState,
        handleSubmit,
        register,
    } = useForm<BookUpdateFormValueType>({
        values: {
            pagesCount: book.pageCount,
            id: book.id,
            name: book.name,
            releaseDate: book.releaseDate,
            author: book.author.id,
        },
        resolver: zodResolver(bookUpdateValidation),
    })

    const onSubmit = (formValue: BookUpdateFormValueType) => {
        void supabase
            .from(TABLES.books)
            .update({
                authorFk: formValue.author,
                pageCount: formValue.pagesCount,
                releaseDate: formValue.releaseDate.toDateString(),
                name: formValue.name,
            })
            .eq('id', formValue.id)
            .then((response) => {
                if (response.error) {
                    console.error(response.error)

                    showNotification({
                        color: 'red',
                        message: 'Error updating employee',
                        title: 'Error',
                    })

                    return
                }

                onSubmitProp()

                setIsOpen(false)

                showNotification({
                    color: 'green',
                    message: 'Employee updated successfully',
                    title: 'Success',
                })
            })
    }

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

    const onClose = () => {
        setIsOpen(false)
    }

    const onOpen = () => {
        setIsOpen(true)
    }

    return (
        <>
            <ActionIcon
                color="blue"
                variant="light"
                onClick={onOpen}
            >
                <IconPencil size={DEFAULT_ICON_SIZE} />
            </ActionIcon>
            <Modal
                onClose={onClose}
                opened={isOpen}
                title="Update Book"
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
                            Update
                        </Button>
                    </Stack>
                </form>
            </Modal>
        </>
    )
}
