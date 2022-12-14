import { useEffect, useState } from 'react'
import { useFeedbacks } from 'hooks/useFeedbacks'
import { useRouter } from 'next/router'
import { useTags } from 'hooks/useTags'
import { objectHasData } from 'utils/objectUtils'
import {
	ADD,
	CANCEL,
	DELETE,
	EDIT,
	EMPTY_STRING,
	SAVE_CHANGES,
	SELECT,
} from 'utils/constants'

import Button from 'components/Button'
import SelectInput from 'components/SelectInput'
import TextArea from 'components/Textarea'
import TextInput from 'components/TextInput'

import styles from 'styles/components/forms/feedbackForm.module.css'
import { useStatus } from 'hooks/useStatus'

export default function FeedbackForm({ feedback }) {
	const hasFeedbackData = objectHasData(feedback)
	const { newFeedback, editFeedback, deleteFeedback } = useFeedbacks()
	const { back } = useRouter()
	const { status } = useStatus()
	const { tags } = useTags()
	const [values, setValues] = useState({
		title: EMPTY_STRING,
		tagId: EMPTY_STRING,
		detail: EMPTY_STRING,
	})

	const formIcon = hasFeedbackData ? 'fa-solid fa-pen' : 'fa-solid fa-plus'
	const formTitle = hasFeedbackData ? EDIT : ADD
	const formButton = hasFeedbackData ? SAVE_CHANGES : ADD

	const handleSubmit = (e) => {
		e.preventDefault()
		if (hasFeedbackData) {
			editFeedback(values)
		} else {
			newFeedback(values)
		}
	}

	const handleChange = (e) => {
		if (e.target.type === SELECT) {
			return setValues({
				...values,
				[e.target.name]: e.target.id,
			})
		}
		setValues({
			...values,
			[e.target.name]: e.target.value,
		})
	}

	useEffect(() => {
		if (hasFeedbackData) {
			setValues(feedback)
		}
	}, [feedback, hasFeedbackData])

	return (
		<form onSubmit={handleSubmit} className={styles.feedbackFormContainer}>
			<i className={`${styles.feedbackFormIcon} ${formIcon}`}></i>
			<h1>{formTitle} feedback</h1>
			<div className={styles.feedbackFormInput}>
				<h4>Titulo de feedback</h4>
				<h4 className={styles.feedbackFormSubtitle}>
					Añade un título breve y descriptivo.
				</h4>
				<TextInput
					name="title"
					handleChange={handleChange}
					value={values.title}
				/>
			</div>
			<div className={styles.feedbackFormInput}>
				<h4>Categoria</h4>
				<h4 className={styles.feedbackFormSubtitle}>
					Elija una categoría para su feedback
				</h4>
				<SelectInput
					name="tagId"
					options={tags}
					label="Categorias"
					value={values.tagId}
					handleSelectedChange={handleChange}
				/>
			</div>
			{hasFeedbackData ? (
				<div className={styles.feedbackFormInput}>
					<h4>Actualizar estatus</h4>
					<h4 className={styles.feedbackFormSubtitle}>
						Cambiar el estatus de su feedback
					</h4>
					<SelectInput
						name="statusId"
						options={status}
						label="Estatus"
						value={values.statusId}
						handleSelectedChange={handleChange}
					/>
				</div>
			) : null}
			<div className={styles.feedbackFormInput}>
				<h4>Detalle del feedback</h4>
				<h4 className={styles.feedbackFormSubtitle}>
					Incluya cualquier comentario específico sobre lo que se debe mejorar,
					agregar, etc.
				</h4>
				<TextArea
					name="detail"
					handleChange={handleChange}
					value={values.detail}
				/>
			</div>
			<div className={styles.feedbackFormButtons}>
				{hasFeedbackData ? (
					<Button
						variant="red"
						type="button"
						handleClick={() => deleteFeedback(feedback)}
					>
						{DELETE}
					</Button>
				) : null}
				<div>
					<Button variant="dark" type="button" handleClick={back}>
						{CANCEL}
					</Button>
					<Button type="submit">{formButton}</Button>
				</div>
			</div>
		</form>
	)
}
