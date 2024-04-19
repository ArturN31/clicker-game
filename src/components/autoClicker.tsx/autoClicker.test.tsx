import '@testing-library/jest-dom';

import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { listOfUpgrades } from '../../listOfUpgrades';
import { Dispatch, SetStateAction } from 'react';
import { User } from '../user/user';
import { AutoClicker } from './autoClicker';
import { act } from 'react-dom/test-utils';

let userProps: User = { points: 0 };
let clickerBtnProps: ClickerBtn = { clickPower: 1, clickPowerMultiplier: 1, userClickCount: 0 };
const upgrades: Upgrades[] = listOfUpgrades;
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

const setAutoClickerProps: Dispatch<SetStateAction<AutoClicker>> = (newProps: SetStateAction<AutoClicker>) => {
	if (typeof newProps === 'function') {
		autoClickerProps = newProps(autoClickerProps);
	} else {
		autoClickerProps = newProps;
	}
};

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
			vi.advanceTimersByTime(9900);
			setAutoClickerProps({
				...autoClickerProps,
				clickTimer: autoClickerProps.clickTimer - 9900,
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
			setAutoClickerProps({ ...autoClickerProps, clickTimer: 9900 });
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
