import { useState } from 'react';
import './App.css';
import { listOfUpgrades } from './listOfUpgrades';
import { AsideUpgrades } from './components/aside/asideUpgrades';
import { User } from './components/user/user';
import { AutoClicker } from './components/autoClicker.tsx/autoClicker';
import { ClickerBtn } from './components/clickerBtn/clickerBtn';

function App() {
	const [clickerBtnProps, setClickerBtnProps] = useState<ClickerBtn>({
		clickPower: 1,
		clickPowerMultiplier: 1,
		userClickCount: 0,
	});

	const [userProps, setUserProps] = useState<User>({
		points: 0,
	});

	const [upgrades, setUpgrades] = useState(listOfUpgrades);

	const [autoClickerProps1, setAutoClickerProps1] = useState<AutoClicker>({
		clickPower: 0,
		clickPowerMultiplier: 1,
		clickTimer: 10000,
		autoClickerClickCount: 0,
	});

	//TODO: UPGRADING TIMER REDUCTION CAUSES THE TIMER TO RESET

	//TODO: ADD AUTOMATIC SAVING BASED ON USER CHOSEN INTERVAL
	//TODO: ADD MANUAL SAVING

	//TODO: POTENTIALY ADD MULITPLE AUTO CLICKERS.

	return (
		<div className='grid grid-cols-4 bg-[#1B2430]'>
			<div className='col-span-2 lg:col-span-1'>
				<AsideUpgrades
					userProps={userProps}
					setUserProps={setUserProps}
					clickerBtnProps={clickerBtnProps}
					setClickerBtnProps={setClickerBtnProps}
					upgrades={upgrades}
					setUpgrades={setUpgrades}
					autoClickerProps={autoClickerProps1}
					setAutoClickerProps={setAutoClickerProps1}
				/>
			</div>
			<div className='flex flex-col col-span-2 lg:col-span-3'>
				<div className='grid grid-cols-1 lg:grid-cols-2'>
					<User
						userProps={userProps}
						clickerBtnProps={clickerBtnProps}
					/>
					<AutoClicker
						autoClickerProps={autoClickerProps1}
						setAutoClickerProps={setAutoClickerProps1}
						userProps={userProps}
						setUserProps={setUserProps}
						upgrades={upgrades}
					/>
				</div>
				<ClickerBtn
					clickerBtnProps={clickerBtnProps}
					setClickerBtnProps={setClickerBtnProps}
					userProps={userProps}
					setUserProps={setUserProps}
					autoClickerProps={autoClickerProps1}
					upgrades={upgrades}
				/>
			</div>
		</div>
	);
}

export default App;
