import '@testing-library/jest-dom';

import { beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AsideUpgrades } from './asideUpgrades';
import { listOfUpgrades } from '../../listOfUpgrades';
import { Dispatch, SetStateAction } from 'react';

describe('Aside Upgrades component', () => {
	const userProps: User = { points: 0 };
	const clickerBtnProps: ClickerBtn = { clickPower: 0, clickPowerMultiplier: 0, userClickCount: 0 };
	const upgrades: Upgrades[] = listOfUpgrades;
	const autoClickerProps: AutoClicker = {
		clickPower: 0,
		clickPowerMultiplier: 0,
		clickTimer: 0,
		autoClickerClickCount: 0,
	};

	const setUserProps: Dispatch<SetStateAction<User>> = () => {};
	const setClickerBtnProps: Dispatch<SetStateAction<ClickerBtn>> = () => {};
	const setUpgrades: Dispatch<SetStateAction<Upgrades[]>> = () => {};
	const setAutoClickerProps: Dispatch<SetStateAction<AutoClicker>> = () => {};

	beforeEach(() => {
		render(
			<AsideUpgrades
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

	test('Should render Aside Upgrades Component', () => {
		expect(screen.getByText('List of Upgrades')).toBeInTheDocument();
	});

	test('Should render upgrades', () => {
		upgrades.map((upgrade: Upgrades) => {
			expect(screen.getByText(upgrade.name));
		});
	});
});
