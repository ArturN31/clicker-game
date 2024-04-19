import { Upgrade } from './upgrade/upgrade';
import { Dispatch } from 'react';

export const AsideUpgrades = (props: {
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
		userProps,
		setUserProps,
		clickerBtnProps,
		setClickerBtnProps,
		upgrades,
		setUpgrades,
		autoClickerProps,
		setAutoClickerProps,
	} = props;

	return (
		<div className='min-h-screen max-h-screen overflow-y-scroll bg-[#191716] text-white flex flex-col gap-2 p-2'>
			<p className='p-2 text-2xl text-center bg-black/[0.75] border-[1px] border-black select-none'>List of Upgrades</p>
			{upgrades.map((upgrade: Upgrades, index: number) => {
				return (
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
						key={index}
					/>
				);
			})}
		</div>
	);
};
