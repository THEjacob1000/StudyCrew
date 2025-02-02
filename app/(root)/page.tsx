'use client'

// React specific imports
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Header from './../../components/Header/Header'
import Hero from './../../components/Hero/Hero'
import Mission from './../../components/Mission/Mission'
import Features from './../../components/Features/Features'
import Project from './../../components/Project/Project'
import SignUp from './../../components/SignUp/Signup'
import Team from './../../components/Team/Team'
import Footer from './../../components/Footer/Footer'
import Faqs from './../../components/FAQs/Faqs'

import useScrollFadeIn from './../../lib/hooks/useFadeIn'
const FadingHero = useScrollFadeIn(Hero)
const FadingMission = useScrollFadeIn(Mission)
const FadingFeatures = useScrollFadeIn(Features)
const FadingProject = useScrollFadeIn(Project)
const FadingSignUp = useScrollFadeIn(SignUp)
const FadingTeam = useScrollFadeIn(Team)
const FadingFAQ = useScrollFadeIn(Faqs)

function App (): JSX.Element {
	// State for the active page section
	const [activePage, setActivePage] = useState('')

	// Refs to target elements for the IntersectionObserver
	const missionRef = React.useRef(null)
	const featuresRef = React.useRef(null)
	const projectRef = React.useRef(null)
	const teamRef = React.useRef(null)
	const signupRef = React.useRef(null)
	const faqRef = React.useRef(null)

	useEffect(() => {
		// Cached ref nodes
		const missionNode = missionRef.current
		const featuresNode = featuresRef.current
		const projectNode = projectRef.current
		const teamNode = teamRef.current
		const signupNode = signupRef.current
		const faqNode = faqRef.current

		// Callback to handle what happens when the elements intersect
		const callback = (entries: any): void => {
			entries.forEach((entry: any) => {
				if (entry.isIntersecting) {
					// Setting the active page based on the intersecting component
					switch (entry.target.className) {
						case 'mission-component':
							setActivePage('mission')
							break
						case 'features-component':
							setActivePage('features')
							break
						case 'project-component':
							setActivePage('project')
							break
						case 'empower-component':
							setActivePage('signup')
							break
						case 'team-component':
							setActivePage('team')
							break
						case 'faq-component':
							setActivePage('faq')
							break
						default:
							break
					}
				}
			})
		}

		// Options for IntersectionObserver
		const options = {
			rootMargin: '-50% 0px -50% 0px', // The callback is triggered when half of the target is visible.
			threshold: 0
		}

		// Setting up the IntersectionObserver
		const observer = new IntersectionObserver(callback, options)

		// Observing the refs
		if (missionNode) observer.observe(missionNode)
		if (featuresNode) observer.observe(featuresNode)
		if (projectNode) observer.observe(projectNode)
		if (teamNode) observer.observe(teamNode)
		if (signupNode) observer.observe(signupNode)
		if (faqNode) observer.observe(faqNode)

		// Cleanup function to unobserve the refs
		return () => {
			if (missionNode) observer.unobserve(missionNode)
			if (featuresNode) observer.unobserve(featuresNode)
			if (projectNode) observer.unobserve(projectNode)
			if (teamNode) observer.unobserve(teamNode)
			if (signupNode) observer.unobserve(signupNode)
			if (faqNode) observer.unobserve(faqNode)
		}
	}, [])

	// Component render
	return (
		<Router>
			{/* Header with page navigation props */}

			<div className="header">
				<Header
					missionRef={missionRef}
					featuresRef={featuresRef}
					projectRef={projectRef}
					teamRef={teamRef}
					signupRef={signupRef}
					faqRef={faqRef}
					activePage={activePage}
					setActivePage={setActivePage}
				/>
			</div>

			{/* Various site sections */}
			<FadingHero id="hero" delay={100} />

			<div className="mission-component" ref={missionRef}>
				<FadingMission id="mission" />
			</div>

			<div className="features-component" ref={featuresRef}>
				<FadingFeatures id="features" />
			</div>

			<div className="project-component" ref={projectRef}>
				<FadingProject id="project" />
			</div>

			<div className="empower-component" ref={signupRef}>
				<FadingSignUp id="sign-up" />
			</div>

			<div className="team-component" ref={teamRef}>
				<FadingTeam id="team" />
			</div>

			<div className="faq-component" ref={faqRef}>
				<FadingFAQ id="faq" />
			</div>

			{/* Footer */}
			<div className="footer-component">
				<Footer
					missionRef={missionRef}
					featuresRef={featuresRef}
					projectRef={projectRef}
					teamRef={teamRef}
					signupRef={signupRef}
					faqRef={faqRef}
					activePage={activePage}
					setActivePage={setActivePage}
				/>
			</div>
		</Router>
	)
}
export default App
