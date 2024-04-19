export const listOfUpgrades: Upgrades[] = [
	{
		name: 'Weak Click Power Upgrade',
		description: "Adds 0.25 to user's click power",
		upgrade: {
			upgradeClickPowerBy: 0.25,
			increaseUserClickPower(userPower: number, increaseBy: number) {
				return userPower + increaseBy;
			},
		},
		upgradedTimes: 0,
		maxUpgrades: 30,
		cost: 20,
		costIncrease(cost) {
			return cost * 1.1;
		},
	},
	{
		name: 'Weak Click Power Multiplier Upgrade',
		description: "Adds 2.5% to user's click power multiplier",
		upgrade: {
			upgradeClickPowerMultiplierBy: 1.025,
			increaseUserClickPowerMultiplier(userPower: number, increaseBy: number) {
				return userPower * increaseBy;
			},
		},
		upgradedTimes: 0,
		maxUpgrades: 20,
		cost: 25,
		costIncrease(cost) {
			return cost * 1.15;
		},
	},
	{
		name: 'Weak Auto Click Power Upgrade',
		description: 'Auto clicker produces additional 2.5 points.',
		upgrade: {
			upgradeAutoClickerPowerBy: 2.5,
			increaseAutoClickerPower(clickPower, increaseBy) {
				return clickPower + increaseBy;
			},
		},
		upgradedTimes: 0,
		maxUpgrades: 10,
		cost: 50,
		costIncrease(cost) {
			return cost * 1.2;
		},
	},
	{
		name: 'Weak Auto Click Power Multiplier Upgrade',
		description: 'Adds 2.5% to auto clicker power multiplier',
		upgrade: {
			upgradeAutoClickerPowerMultiplierBy: 1.025,
			increaseAutoClickerPowerMultiplier(clickPower, increaseBy) {
				return clickPower * increaseBy;
			},
		},
		upgradedTimes: 0,
		maxUpgrades: 10,
		cost: 75,
		costIncrease(cost) {
			return cost * 1.25;
		},
	},
	{
		name: 'Weak Auto Click Timer Upgrade',
		description: 'Reduces auto clicker timer by 2.5%',
		upgrade: {
			upgradeAutoClickerTimerBy: 0.975,
			decreaseAutoClickerTimer(clickTimer, decreaseBy) {
				return clickTimer * decreaseBy;
			},
		},
		upgradedTimes: 0,
		maxUpgrades: 10,
		cost: 80,
		costIncrease(cost) {
			return cost * 1.25;
		},
	},
	{
		name: 'Basic Click Power Upgrade',
		description: "Adds 0.5 to user's click power",
		upgrade: {
			upgradeClickPowerBy: 0.5,
			increaseUserClickPower(userPower: number, increaseBy: number) {
				return userPower + increaseBy;
			},
		},
		upgradedTimes: 0,
		maxUpgrades: 23,
		cost: 100,
		costIncrease(cost) {
			return cost * 1.15;
		},
	},
	{
		name: 'Basic Click Power Multiplier Upgrade',
		description: "Adds 5% to user's click power multiplier",
		upgrade: {
			upgradeClickPowerMultiplierBy: 1.05,
			increaseUserClickPowerMultiplier(userPower: number, increaseBy: number) {
				return userPower * increaseBy;
			},
		},
		upgradedTimes: 0,
		maxUpgrades: 10,
		cost: 150,
		costIncrease(cost) {
			return cost * 1.175;
		},
	},
	{
		name: 'Basic Auto Click Upgrade',
		description: 'Auto clicker produces additional 5 points',
		upgrade: {
			upgradeAutoClickerPowerBy: 5,
			increaseAutoClickerPower(clickPower, increaseBy) {
				return clickPower + increaseBy;
			},
		},
		upgradedTimes: 0,
		maxUpgrades: 10,
		cost: 175,
		costIncrease(cost) {
			return cost * 1.2;
		},
	},
	{
		name: 'Basic Auto Click Power Multiplier Upgrade',
		description: 'Adds 5% to auto clicker power multiplier',
		upgrade: {
			upgradeAutoClickerPowerMultiplierBy: 1.05,
			increaseAutoClickerPowerMultiplier(clickPower, increaseBy) {
				return clickPower * increaseBy;
			},
		},
		upgradedTimes: 0,
		maxUpgrades: 10,
		cost: 200,
		costIncrease(cost) {
			return cost * 1.25;
		},
	},
	{
		name: 'Basic Auto Click Timer Upgrade',
		description: 'Reduces auto clicker timer by 5%',
		upgrade: {
			upgradeAutoClickerTimerBy: 0.95,
			decreaseAutoClickerTimer(clickTimer, decreaseBy) {
				return clickTimer * decreaseBy;
			},
		},
		upgradedTimes: 0,
		maxUpgrades: 10,
		cost: 225,
		costIncrease(cost) {
			return cost * 1.25;
		},
	},
];
