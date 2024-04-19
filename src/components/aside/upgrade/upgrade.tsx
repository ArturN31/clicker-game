import { Dispatch, useEffect, useState } from 'react';

export const Upgrade = (props: {
	upgrade: Upgrades;
	userProps: User;
	setUserProps: Dispatch<User>;
	clickerBtnProps: ClickerBtn;
	setClickerBtnProps: Dispatch<ClickerBtn>;
	upgrades: Upgrades[];
	setUpgrades: Dispatch<Upgrades[]>;
	autoClickerProps: AutoClicker;
	setAutoClickerProps: Dispatch<AutoClicker>;
}) => {
	const {
		upgrade,
		userProps,
		setUserProps,
		clickerBtnProps,
		setClickerBtnProps,
		upgrades,
		setUpgrades,
		autoClickerProps,
		setAutoClickerProps,
	} = props;

	const [cost, setCost] = useState<number>(0);

	const [upgradeTypeBasedTitleStylingTitle, setTypeBasedUpgradeTitleStyling] = useState('');
	const [upgradeTypeBasedBodyStyling, setTypeBasedUpgradeBodyStylingBody] = useState('');

	useEffect(() => {
		canAfford();
		upgradeTypeTitle();
		upgradeTypeBody();
	});

	//defines the styling of an upgrade that user can or can not afford
	const canAfford = () => {
		if (userProps.points >= upgrade.cost) {
			return true;
		}
		return false;
	};

	//sets the styling
	const upgradeTypeTitle = () => {
		//if upgrade for user click
		if (upgrade.description.toLocaleLowerCase().includes('user')) {
			//if user has enough points to buy
			canAfford()
				? setTypeBasedUpgradeTitleStyling('bg-[#A63446]/[0.85]')
				: setTypeBasedUpgradeTitleStyling('bg-[#A63446]/[0.35]');
		}

		//if upgrade for autoclicker
		if (upgrade.description.toLocaleLowerCase().includes('auto clicker')) {
			//if user has enough points to buy
			canAfford()
				? setTypeBasedUpgradeTitleStyling('bg-[#006638]/[0.85]')
				: setTypeBasedUpgradeTitleStyling('bg-[#006638]/[0.35]');
		}
	};

	const upgradeTypeBody = () => {
		//if upgrade for user click
		if (upgrade.description.toLocaleLowerCase().includes('user')) {
			//if user has enough points to buy
			canAfford()
				? setTypeBasedUpgradeBodyStylingBody('bg-[#A63446]/[0.5]')
				: setTypeBasedUpgradeBodyStylingBody('bg-[#A63446]/[0.15]');
		}

		//if upgrade for autoclicker
		if (upgrade.description.toLocaleLowerCase().includes('auto clicker')) {
			//if user has enough points to buy
			canAfford()
				? setTypeBasedUpgradeBodyStylingBody('bg-[#006638]/[0.5]')
				: setTypeBasedUpgradeBodyStylingBody('bg-[#006638]/[0.15]');
		}
	};

	useEffect(() => {
		setCost(upgrade.cost);
	}, [upgrade.cost]);

	//updates the cost of an upgrade
	const updateCost = (cost: number, name: string) => {
		setUpgrades(
			upgrades.map((upgrade: Upgrades) => {
				if (upgrade.name === name) {
					upgrade.cost = cost;
					return upgrade;
				} else return upgrade;
			}),
		);
	};

	//adds one to upgrade's upgrade times
	const incrementUpgradeTimes = (name: string) => {
		setUpgrades(
			upgrades.map((upgrade: Upgrades) => {
				if (upgrade.name === name) {
					upgrade.upgradedTimes += 1;
					return upgrade;
				} else return upgrade;
			}),
		);
	};

	const handleClick = () => {
		//if user has enough points
		if (userProps.points >= upgrade.cost) {
			//remove points from user
			const newUserPoints = userProps.points - upgrade.cost;
			userProps.points = newUserPoints;
			setUserProps({ points: newUserPoints });

			//get and set new cost of the upgrade
			const newCost = upgrade.costIncrease(upgrade.cost);
			setCost(newCost);
			updateCost(newCost, upgrade.name);

			//update upgrade times
			incrementUpgradeTimes(upgrade.name);

			//if it is an upgrade for click power
			if (upgrade.upgrade.upgradeClickPowerBy && upgrade.upgrade.increaseUserClickPower) {
				const newClickPower = upgrade.upgrade.increaseUserClickPower(
					clickerBtnProps.clickPower,
					upgrade.upgrade.upgradeClickPowerBy,
				);
				setClickerBtnProps({ ...clickerBtnProps, clickPower: newClickPower });
			}

			//if this is an upgrade for click power multiplier
			if (upgrade.upgrade.upgradeClickPowerMultiplierBy && upgrade.upgrade.increaseUserClickPowerMultiplier) {
				const newClickPowerMultiplier = upgrade.upgrade.increaseUserClickPowerMultiplier(
					clickerBtnProps.clickPowerMultiplier,
					upgrade.upgrade.upgradeClickPowerMultiplierBy,
				);
				setClickerBtnProps({ ...clickerBtnProps, clickPowerMultiplier: newClickPowerMultiplier });
			}

			//if it is an upgrade for auto clicker power
			if (upgrade.upgrade.upgradeAutoClickerPowerBy && upgrade.upgrade.increaseAutoClickerPower) {
				const newAutoClickerPower = upgrade.upgrade.increaseAutoClickerPower(
					autoClickerProps.clickPower,
					upgrade.upgrade.upgradeAutoClickerPowerBy,
				);
				setAutoClickerProps({
					...autoClickerProps,
					clickPower: newAutoClickerPower,
				});
			}

			//if it is an upgrade for auto clicker power mulitplier
			if (upgrade.upgrade.upgradeAutoClickerPowerMultiplierBy && upgrade.upgrade.increaseAutoClickerPowerMultiplier) {
				const newAutoClickerPowerMultiplier = upgrade.upgrade.increaseAutoClickerPowerMultiplier(
					autoClickerProps.clickPowerMultiplier,
					upgrade.upgrade.upgradeAutoClickerPowerMultiplierBy,
				);
				setAutoClickerProps({
					...autoClickerProps,
					clickPowerMultiplier: newAutoClickerPowerMultiplier,
				});
			}

			//if it is an upgrade for auto clicker timer
			if (upgrade.upgrade.upgradeAutoClickerTimerBy && upgrade.upgrade.decreaseAutoClickerTimer) {
				const newAutoClickerTimer = upgrade.upgrade.decreaseAutoClickerTimer(
					autoClickerProps.clickTimer,
					upgrade.upgrade.upgradeAutoClickerTimerBy,
				);
				setAutoClickerProps({
					...autoClickerProps,
					clickTimer: newAutoClickerTimer,
				});
			}
		} else alert('not enough points');
	};

	//if upgrade is not bought the maximum number of times display it to the user
	return upgrade.upgradedTimes < upgrade.maxUpgrades ? (
		<button
			className='grid border-[1px] border-black select-none hover:cursor-pointer hover:bg-black'
			onClick={() => {
				handleClick();
			}}>
			<p className={`grid p-2 text-center border-b-[1px] border-black ${upgradeTypeBasedTitleStylingTitle}`}>
				<span className='font-bold'>{upgrade.name}</span>
			</p>
			<div className={upgradeTypeBasedBodyStyling}>
				<p className='p-2 text-center border-b-[1px] border-black'>{upgrade.description}</p>
				<p className='p-2 text-center border-b-[1px] border-black'>
					<span className='font-bold'>Cost:</span> {Math.floor(cost * 100) / 100} points
				</p>
				<p className='p-2 text-sm italic'>
					Upgraded {upgrade.upgradedTimes} {upgrade.upgradedTimes === 1 ? 'time' : 'times'} out of {upgrade.maxUpgrades}
				</p>
			</div>
		</button>
	) : null;
};
