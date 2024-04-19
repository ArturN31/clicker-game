import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, test, expect } from 'vitest';
import { Dispatch } from 'react';
import userEvent from '@testing-library/user-event';
import { ClickerBtn } from './clickerBtn';
import { User } from '../user/user';
import { listOfUpgrades } from '../../listOfUpgrades';

let clickerBtnProps: ClickerBtn = { clickPower: 10, clickPowerMultiplier: 2, userClickCount: 100 };
let userProps: User = { points: 20 };
const autoClickerProps: AutoClicker = {
	clickPower: 0,
	clickPowerMultiplier: 1,
	clickTimer: 10000,
	autoClickerClickCount: 0,
};

const upgrades = listOfUpgrades;

const setClickerBtnProps: Dispatch<ClickerBtn> = (newProps: ClickerBtn) => {
	clickerBtnProps = newProps;
};

const setUserProps: Dispatch<User> = (newProps: User) => {
	userProps = newProps;
};

const user = userEvent.setup();

describe('Clicker Button tests', () => {
	//run the beforeEach hook to render the ClickerBtn component with the props before each test
	beforeEach(() => {
		render(
			<ClickerBtn
				clickerBtnProps={clickerBtnProps}
				setClickerBtnProps={setClickerBtnProps}
				userProps={userProps}
				setUserProps={setUserProps}
				autoClickerProps={autoClickerProps}
				upgrades={upgrades}
			/>,
		);
	});

	test('Should display Clicker button', () => {
		expect(screen.getByRole('button', { name: 'Clicker' })).toBeVisible();
	});

	test('Update User and ClickerBtn props on button click', () => {
		user.click(screen.getByRole('button', { name: 'Clicker' }));

		//adds one to user click count
		setClickerBtnProps({
			...clickerBtnProps,
			userClickCount: clickerBtnProps.userClickCount + 1,
		});

		//adds points based on click power and click power multiplier
		setUserProps({
			points: userProps.points + clickerBtnProps.clickPower * clickerBtnProps.clickPowerMultiplier,
		});

		//verify that props store updated values
		expect(clickerBtnProps.userClickCount).toBe(101);
		expect(userProps.points).toBe(40);
	});

	test('User Component should display updated points: 40', () => {
		//render User component with updated points
		render(
			<User
				userProps={userProps}
				clickerBtnProps={clickerBtnProps}
			/>,
		);

		//verify that User component displays text with updated values
		expect(screen.getByText(`Pts: ${Math.floor(userProps.points * 1000) / 1000}`)).toBeInTheDocument();
		expect(screen.getByText('Pts: 40')).toBeInTheDocument();
	});

	test('User Component should display updated click count: 101', () => {
		//render User component with updated points
		render(
			<User
				userProps={userProps}
				clickerBtnProps={clickerBtnProps}
			/>,
		);

		//verify that User component displays text with updated values
		expect(screen.getByText(`Clicks: ${clickerBtnProps.userClickCount}`)).toBeInTheDocument();
		expect(screen.getByText('Clicks: 101')).toBeInTheDocument();
	});
});
