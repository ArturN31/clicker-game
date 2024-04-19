import { Dispatch, useEffect, useState } from 'react';

export const ClickerBtn = (props: {
	clickerBtnProps: ClickerBtn;
	setClickerBtnProps: Dispatch<ClickerBtn>;
	userProps: User;
	setUserProps: Dispatch<User>;
	autoClickerProps: AutoClicker;
	upgrades: Upgrades[];
}) => {
	//destructure props
	const { clickerBtnProps, setClickerBtnProps, userProps, setUserProps, autoClickerProps, upgrades } = props;

	const [clickTimer, setClickTimer] = useState<number>(autoClickerProps.clickTimer);

	//ensures that click timer is updated when props change - upgrade
	useEffect(() => {
		setClickTimer(autoClickerProps.clickTimer);
	}, [autoClickerProps.clickTimer]);

	//interval used to change the styling of a button
	//when timer runs out button changes color to show auto click
	useEffect(() => {
		const isUpgraded = upgrades.find((el: Upgrades) => {
			return el.upgrade.upgradeAutoClickerPowerBy && el.upgradedTimes > 0;
		});

		let autoClickerTimerInterval: NodeJS.Timeout;

		if (isUpgraded) {
			//start interval - 100ms
			autoClickerTimerInterval = setInterval(() => {
				//decrease click timer
				setClickTimer((prevClickTimer) => {
					if (prevClickTimer >= 100) {
						return prevClickTimer - 100;
					} else return 0;
				});

				//when timer runs out
				if (clickTimer <= 0) {
					//reset the timer
					setClickTimer(autoClickerProps.clickTimer);
				}
			}, 100);
		}

		// Cleanup function to clear interval
		return () => {
			clearInterval(autoClickerTimerInterval);
		};
	}, [autoClickerProps.clickTimer, clickTimer, upgrades]);

	//handles the click on button
	const handleClick = () => {
		//adds one to user click count
		setClickerBtnProps({
			...clickerBtnProps,
			userClickCount: clickerBtnProps.userClickCount + 1,
		});

		//adds points based on click power and click power multiplier
		setUserProps({
			...userProps,
			points: userProps.points + clickerBtnProps.clickPower * clickerBtnProps.clickPowerMultiplier,
		});
	};

	return (
		<div className='grid w-full place-content-center h-[85%]'>
			<button
				className={`w-40 h-40 text-3xl text-black transition-all duration-200 ease-in-out border-2 border-black rounded-full select-none font-semibold hover:bg-[#A63446]/[0.75] active:bg-[#A63446]/[0.5]
				${clickTimer <= 200 ? 'bg-[#006638] hover:bg-[#006638] active:bg-[#006638]' : ' bg-[#A63446]'}
				`}
				style={{ boxShadow: '0px 0px 16px 0px black' }}
				onClick={() => {
					handleClick();
				}}>
				Clicker
			</button>
		</div>
	);
};
