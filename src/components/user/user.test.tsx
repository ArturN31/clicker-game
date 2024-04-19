import '@testing-library/jest-dom';

import { beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { User } from './user';

describe('User Component tests', () => {
	const userProps: User = { points: 100 };
	const clickerBtnProps: ClickerBtn = { clickPower: 10, clickPowerMultiplier: 2, userClickCount: 100 };

	//run the beforeEach hook to render the User component with the props before each test
	beforeEach(() => {
		render(
			<User
				userProps={userProps}
				clickerBtnProps={clickerBtnProps}
			/>,
		);
	});

	//verify that the correct points value is displayed
	test('Points: 100', () => {
		expect(screen.getByText(`Pts: ${Math.floor(userProps.points * 1000) / 1000}`)).toBeInTheDocument();
	});

	//verify that the correct power value is displayed
	test('Power: 10', () => {
		expect(screen.getByText(`Pwr: ${Math.floor(clickerBtnProps.clickPower * 1000) / 1000}`)).toBeInTheDocument();
	});

	//verify that the correct multiplier value is displayed
	test('Multiplier: 2x', () => {
		expect(
			screen.getByText(`Mult: ${Math.floor(clickerBtnProps.clickPowerMultiplier * 1000) / 1000}x`),
		).toBeInTheDocument();
	});

	//verify that the correct points per click value is displayed
	test('Points per click: 10 * 2', () => {
		expect(
			screen.getByText(
				`Pts/click: ${Math.floor(clickerBtnProps.clickPower * clickerBtnProps.clickPowerMultiplier * 1000) / 1000}`,
			),
		).toBeInTheDocument();
	});

	//verify that the correct clicks value is displayed
	test('Clicks: 100', () => {
		expect(screen.getByText(`Clicks: ${clickerBtnProps.userClickCount}`)).toBeInTheDocument();
	});
});
