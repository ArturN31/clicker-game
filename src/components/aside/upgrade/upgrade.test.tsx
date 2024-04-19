import '@testing-library/jest-dom';

import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { listOfUpgrades } from '../../../listOfUpgrades';
import { Dispatch, SetStateAction } from 'react';
import { Upgrade } from './upgrade';
import userEvent from '@testing-library/user-event';
import { User } from '../../user/user';
import { AutoClicker } from '../../autoClicker.tsx/autoClicker';
import { act } from 'react-dom/test-utils';

let userProps: User = { points: 1100 };
let clickerBtnProps: ClickerBtn = { clickPower: 1, clickPowerMultiplier: 1, userClickCount: 0 };
let upgrades: Upgrades[] = listOfUpgrades;
let autoClickerProps: AutoClicker = {
	clickPower: 0,
	clickPowerMultiplier: 1,
	clickTimer: 10000,
	autoClickerClickCount: 0,
};

const setUserProps: Dispatch<SetStateAction<User>> = (newProps: SetStateAction<User>) => {
	if (typeof newProps === 'function') {
		userProps = newProps(userProps);
	} else {
		userProps = newProps;
	}
};

const setClickerBtnProps: Dispatch<ClickerBtn> = (newProps: ClickerBtn) => {
	clickerBtnProps = newProps;
};

const setUpgrades: Dispatch<Upgrades[]> = (newProps: Upgrades[]) => {
	upgrades = newProps;
};

const setAutoClickerProps: Dispatch<SetStateAction<AutoClicker>> = (newProps: SetStateAction<AutoClicker>) => {
	if (typeof newProps === 'function') {
		autoClickerProps = newProps(autoClickerProps);
	} else {
		autoClickerProps = newProps;
	}
};

const user = userEvent.setup();

describe('Upgrade component', () => {
	test('Should render Upgrade Components - by Name', () => {
		upgrades.map((upgrade: Upgrades) => {
			render(
				<Upgrade
					upgrade={upgrade}
					userProps={userProps}
					setUserProps={setUserProps}
					clickerBtnProps={clickerBtnProps}
					setClickerBtnProps={setClickerBtnProps}
					upgrades={upgrades}
					setUpgrades={setUpgrades}
					autoClickerProps={autoClickerProps}
					setAutoClickerProps={setAutoClickerProps}
				/>,
			);
		});

		upgrades.map((upgrade: Upgrades) => {
			expect(screen.getByText(upgrade.name)).toBeInTheDocument();
		});
	});

	test('Click on all Upgrade Components once and update props', () => {
		upgrades.map((upgrade: Upgrades) => {
			render(
				<Upgrade
					upgrade={upgrade}
					userProps={userProps}
					setUserProps={setUserProps}
					clickerBtnProps={clickerBtnProps}
					setClickerBtnProps={setClickerBtnProps}
					upgrades={upgrades}
					setUpgrades={setUpgrades}
					autoClickerProps={autoClickerProps}
					setAutoClickerProps={setAutoClickerProps}
				/>,
			);
		});

		upgrades.map((upgrade: Upgrades) => {
			//click on upgrade
			user.click(screen.getByText(upgrade.name));

			//remove points based on upgrade cost
			setUserProps({ points: userProps.points - upgrade.cost });

			//update upgrade times
			upgrade.upgradedTimes = upgrade.upgradedTimes + 1;

			//update cost
			const newCost = upgrade.costIncrease(upgrade.cost);
			upgrade.cost = newCost;

			//if it is upgrade for click power
			//upgrade click power and increment user click count
			if (upgrade.upgrade.upgradeClickPowerBy && upgrade.upgrade.increaseUserClickPower) {
				const newClickPower = upgrade.upgrade.increaseUserClickPower(
					clickerBtnProps.clickPower,
					upgrade.upgrade.upgradeClickPowerBy,
				);
				setClickerBtnProps({ ...clickerBtnProps, clickPower: newClickPower });
			}

			//if it is upgrade for click power multiplier
			//upgrade click power multiplier and increment user click count
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
		});
	});

	test('Should show new upgrade cost', () => {
		upgrades.map((upgrade: Upgrades) => {
			render(
				<Upgrade
					upgrade={upgrade}
					userProps={userProps}
					setUserProps={setUserProps}
					clickerBtnProps={clickerBtnProps}
					setClickerBtnProps={setClickerBtnProps}
					upgrades={upgrades}
					setUpgrades={setUpgrades}
					autoClickerProps={autoClickerProps}
					setAutoClickerProps={setAutoClickerProps}
				/>,
			);
		});

		upgrades.map((upgrade: Upgrades) => {
			expect(screen.getAllByText(`${Math.floor(upgrade.cost * 100) / 100} points`)).toBeDefined();
		});
	});

	test('Should show updated upgrade times -> upgraded 1 times out of max', () => {
		upgrades.map((upgrade: Upgrades) => {
			render(
				<Upgrade
					upgrade={upgrade}
					userProps={userProps}
					setUserProps={setUserProps}
					clickerBtnProps={clickerBtnProps}
					setClickerBtnProps={setClickerBtnProps}
					upgrades={upgrades}
					setUpgrades={setUpgrades}
					autoClickerProps={autoClickerProps}
					setAutoClickerProps={setAutoClickerProps}
				/>,
			);
		});

		upgrades.map((upgrade: Upgrades) => {
			expect(
				screen.getAllByText(
					`Upgraded ${upgrade.upgradedTimes} ${upgrade.upgradedTimes === 1 ? 'time' : 'times'} out of ${
						upgrade.maxUpgrades
					}`,
				),
			).toBeDefined();
		});
	});
});

describe('User component - with updated props after acquiring all upgrades once', () => {
	test('Should render User component with updated prop values', () => {
		render(
			<User
				userProps={userProps}
				clickerBtnProps={clickerBtnProps}
			/>,
		);

		expect(screen.getByText('User:')).toBeInTheDocument();
	});

	test('Verify that User component displays updated values - Points', () => {
		render(
			<User
				userProps={userProps}
				clickerBtnProps={clickerBtnProps}
			/>,
		);

		expect(screen.getByText(`Pts: ${Math.floor(userProps.points * 1000) / 1000}`)).toBeInTheDocument();
	});

	test('Verify that User component displays updated values - Power', () => {
		render(
			<User
				userProps={userProps}
				clickerBtnProps={clickerBtnProps}
			/>,
		);

		expect(screen.getByText(`Pwr: ${Math.floor(clickerBtnProps.clickPower * 1000) / 1000}`)).toBeInTheDocument();
	});

	test('Verify that User component displays updated values - Multiplier', () => {
		render(
			<User
				userProps={userProps}
				clickerBtnProps={clickerBtnProps}
			/>,
		);

		expect(
			screen.getByText(`Mult: ${Math.floor(clickerBtnProps.clickPowerMultiplier * 1000) / 1000}x`),
		).toBeInTheDocument();
	});

	test('Verify that User component displays updated values - Points per Click', () => {
		render(
			<User
				userProps={userProps}
				clickerBtnProps={clickerBtnProps}
			/>,
		);

		expect(
			screen.getByText(
				`Pts/click: ${Math.floor(clickerBtnProps.clickPower * clickerBtnProps.clickPowerMultiplier * 1000) / 1000}`,
			),
		).toBeInTheDocument();
	});

	test('Verify that User component displays updated values - Click count', () => {
		render(
			<User
				userProps={userProps}
				clickerBtnProps={clickerBtnProps}
			/>,
		);

		expect(screen.getByText(`Clicks: ${clickerBtnProps.userClickCount}`)).toBeInTheDocument();
	});
});

describe('Auto Clicker component - with updated props after acquiring all upgrades once', () => {
	test('Should render Auto Clicker component with updated prop values', () => {
		render(
			<AutoClicker
				autoClickerProps={autoClickerProps}
				setAutoClickerProps={setAutoClickerProps}
				userProps={userProps}
				setUserProps={setUserProps}
				upgrades={upgrades}
			/>,
		);

		expect(screen.getByText('Auto Clicker:')).toBeInTheDocument();
	});

	test('Verify that Auto Clicker component displays updated values - Timer', () => {
		render(
			<AutoClicker
				autoClickerProps={autoClickerProps}
				setAutoClickerProps={setAutoClickerProps}
				userProps={userProps}
				setUserProps={setUserProps}
				upgrades={upgrades}
			/>,
		);

		expect(screen.getByText(`Timer: ${Math.floor(autoClickerProps.clickTimer) / 1000}s`)).toBeInTheDocument();
	});

	test('Verify that Auto Clicker component displays updated values - Power', () => {
		render(
			<AutoClicker
				autoClickerProps={autoClickerProps}
				setAutoClickerProps={setAutoClickerProps}
				userProps={userProps}
				setUserProps={setUserProps}
				upgrades={upgrades}
			/>,
		);

		expect(screen.getByText(`Pwr: ${Math.floor(autoClickerProps.clickPower * 1000) / 1000}`)).toBeInTheDocument();
	});

	test('Verify that Auto Clicker component displays updated values - Multiplier', () => {
		render(
			<AutoClicker
				autoClickerProps={autoClickerProps}
				setAutoClickerProps={setAutoClickerProps}
				userProps={userProps}
				setUserProps={setUserProps}
				upgrades={upgrades}
			/>,
		);

		expect(
			screen.getByText(`Mult: ${Math.floor(autoClickerProps.clickPowerMultiplier * 1000) / 1000}x`),
		).toBeInTheDocument();
	});

	test('Verify that Auto Clicker component displays updated values - Points per click', () => {
		render(
			<AutoClicker
				autoClickerProps={autoClickerProps}
				setAutoClickerProps={setAutoClickerProps}
				userProps={userProps}
				setUserProps={setUserProps}
				upgrades={upgrades}
			/>,
		);

		expect(
			screen.getByText(
				`Pts/click: ${Math.floor(autoClickerProps.clickPower * autoClickerProps.clickPowerMultiplier * 1000) / 1000}`,
			),
		).toBeInTheDocument();
	});

	test('Verify that Auto Clicker component displays updated values - Clicks', () => {
		render(
			<AutoClicker
				autoClickerProps={autoClickerProps}
				setAutoClickerProps={setAutoClickerProps}
				userProps={userProps}
				setUserProps={setUserProps}
				upgrades={upgrades}
			/>,
		);

		expect(screen.getByText(`Clicks: ${autoClickerProps.autoClickerClickCount}`)).toBeInTheDocument();
	});
});

describe('Auto Clicker component - auto clicking with updated props', () => {
	test('Should update timer every 100ms', () => {
		vi.useFakeTimers();

		//decrease click timer
		act(() => {
			vi.advanceTimersByTime(100);
			setAutoClickerProps((prevProps) => {
				return { ...prevProps, clickTimer: prevProps.clickTimer - 100 };
			});
		});

		render(
			<AutoClicker
				autoClickerProps={autoClickerProps}
				setAutoClickerProps={setAutoClickerProps}
				userProps={userProps}
				setUserProps={setUserProps}
				upgrades={upgrades}
			/>,
		);

		//verify output
		expect(screen.getByText(`Timer: ${Math.floor(autoClickerProps.clickTimer) / 1000}s`));
	});

	test('Should decrease click timer to 0', () => {
		vi.useFakeTimers();

		//decrease click timer
		act(() => {
			vi.advanceTimersByTime(9162);
			setAutoClickerProps({
				...autoClickerProps,
				clickTimer: autoClickerProps.clickTimer - 9162,
			});
		});

		//render auto clicker with new props
		render(
			<AutoClicker
				autoClickerProps={autoClickerProps}
				setAutoClickerProps={setAutoClickerProps}
				userProps={userProps}
				setUserProps={setUserProps}
				upgrades={upgrades}
			/>,
		);

		//verify new timer value
		expect(screen.getByText(`Timer: ${Math.floor(autoClickerProps.clickTimer) / 1000}s`));
	});

	test('Should simulate a button click when timer reaches 0', () => {
		render(
			<AutoClicker
				autoClickerProps={autoClickerProps}
				setAutoClickerProps={setAutoClickerProps}
				userProps={userProps}
				setUserProps={setUserProps}
				upgrades={upgrades}
			/>,
		);

		//if timer === 0
		if (Math.floor(autoClickerProps.clickTimer) / 1000 === 0) {
			setUserProps((prevProps) => {
				return {
					points: autoClickerProps.clickPower * autoClickerProps.clickPowerMultiplier + prevProps.points,
				};
			});

			setClickerBtnProps({ ...clickerBtnProps, userClickCount: clickerBtnProps.userClickCount + 1 });
		}
	});

	test('Should render updated props after simulated button click', () => {
		render(
			<User
				userProps={userProps}
				clickerBtnProps={clickerBtnProps}
			/>,
		);

		expect(screen.getByText(`Pts: ${Math.floor(userProps.points * 1000) / 1000}`));
	});

	test('Should reset the timer to previous value when it reaches 0', () => {
		if (Math.floor(autoClickerProps.clickTimer) / 1000 === 0) {
			setAutoClickerProps({ ...autoClickerProps, clickTimer: 9162 });
		}

		render(
			<AutoClicker
				autoClickerProps={autoClickerProps}
				setAutoClickerProps={setAutoClickerProps}
				userProps={userProps}
				setUserProps={setUserProps}
				upgrades={upgrades}
			/>,
		);

		expect(screen.getByText(`Timer: ${Math.floor(autoClickerProps.clickTimer) / 1000}s`)).toBeInTheDocument();
	});
});
