import styles from 'styles/pages/desktop.module.css'
import Image from 'next/image'
import { useState } from 'react'

import Button from 'components/Button'
import Header from 'components/Header'
import Layout from 'components/Layout'
import FeedbackCard from 'components/FeedbackCard'
import Roadmap from 'components/Roadmap'
import TagList from 'components/TagList'

import emptyListImage from 'assets/empty-list-image.png'

export default function Desktop() {
	const [toggleMenu, setToggleMenu] = useState(false)
	const [feedbacks, setFeedbacks] = useState([{}])

	const menuIcon = toggleMenu ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'
	const isOpenMenu = toggleMenu ? styles.desktopMenuActive : ''

	return (
		<Layout twoColumns>
			<section className={styles.desktopSidebar}>
				<header className={styles.desktopLogo}>
					<div>
						<h2>Feedback app</h2>
						<p className="text-small">Board</p>
					</div>
					<i
						className={menuIcon}
						onClick={() => setToggleMenu(!toggleMenu)}
					></i>
					<div className={`${styles.desktopMenu} ${isOpenMenu}`}>
						<div className={styles.desktopMenuContainer}>
							<TagList />
							<Roadmap />
						</div>
					</div>
				</header>
				<TagList className={styles.desktopTags} id="desktopTagList" />
				<Roadmap className={styles.desktopRoadMap} />
			</section>
			<section>
				<Header />
				{feedbacks.length > 0 ? (
					<div className={styles.desktopFeedbackList}>
						<FeedbackCard
							commentId="1"
							title="Add tags for solutions"
							subtitle="Easier to search for solutions based on a specific stack."
							tag="Enhancement"
						/>
						<FeedbackCard
							commentId="3"
							title="Add tags for solutions"
							subtitle="Easier to search for solutions based on a specific stack."
							tag="Enhancement"
						/>
					</div>
				) : (
					<div className={styles.desktopFeedbackListEmpty}>
						<div className={styles.desktopFeedbackListEmptyContainer}>
							<Image
								src={emptyListImage}
								width={129}
								height={136}
								alt="No tienes comentarios aun"
							/>
							<h1>Aún no hay comentarios.</h1>
							<p className="text-regular">
								¿Tienes una sugerencia? ¿Encontró un error que necesita ser
								aplastado? Nos encanta escuchar nuevas ideas para mejorar
								nuestra aplicación.
							</p>
							<Button icon="fa-solid fa-plus">Añadir</Button>
						</div>
					</div>
				)}
			</section>
		</Layout>
	)
}
