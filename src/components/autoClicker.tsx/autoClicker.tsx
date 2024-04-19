import { useEffect, useState, Dispatch, SetStateAction } from 'react';

export const AutoClicker = (props: {
	autoClickerProps: AutoClicker;
	setAutoClickerProps: Dispatch<SetStateAction<AutoClicker>>;
	userProps: User;
	setUserProps: Dispatch<SetStateAction<User>>;
	upgrades: Upgrades[];
}) => {
	const { autoClickerProps, setAutoClickerProps, setUserProps, upgrades } = props;

	const [clickTimer, setClickTimer] = useState<number>(autoClickerProps.clickTimer);

	const isUpgraded = upgrades.find((el: Upgrades) => {
		return el.upgrade.upgradeAutoClickerPowerBy && el.upgradedTimes > 0;
	});

	useEffect(() => {
		//performs auto-click
		const simulateUserClick = () => {
			setUserProps((prevUserProps: User) => {
				//update user points with auto-clicker click power
				return { ...prevUserProps, points: prevUserProps.points + autoClickerProps.clickPower };
			});
			setAutoClickerProps((prevClickerProps: AutoClicker) => {
				//increment auto-clicker click count
				return { ...prevClickerProps, autoClickerClickCount: prevClickerProps.autoClickerClickCount + 1 };
			});
		};

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
					//simulate user click
					simulateUserClick();

					//reset the timer
					setClickTimer(autoClickerProps.clickTimer);
				}
			}, 100);
		}

		// Cleanup function to clear interval
		return () => {
			clearInterval(autoClickerTimerInterval);
		};
	}, [autoClickerProps, setAutoClickerProps, setUserProps, isUpgraded, clickTimer]);

	useEffect(() => {
		setClickTimer(autoClickerProps.clickTimer);
	}, [autoClickerProps.clickTimer]);

	return (
		<div className='text-xl text-center text-white bg-[#006638]/[0.5] h-fit select-none border-2 border-black m-2'>
			<p className='p-2 bg-[#006638]/[0.75] border-b-[1px] border-black font-semibold'>Auto Clicker:</p>
			<div className='grid justify-center grid-cols-1 gap-5 p-4 sm:flex sm:flex-wrap sm:flex-grow'>
				<p>Timer: {Math.floor(clickTimer) / 1000}s</p>
				<p>Pwr: {Math.floor(autoClickerProps.clickPower * 1000) / 1000}</p>
				<p>Mult: {Math.floor(autoClickerProps.clickPowerMultiplier * 1000) / 1000}x</p>
				<p>
					Pts/click: {Math.floor(autoClickerProps.clickPower * autoClickerProps.clickPowerMultiplier * 1000) / 1000}
				</p>
				<p>Clicks: {autoClickerProps.autoClickerClickCount}</p>
			</div>
		</div>
	);
};
