/// <reference types="vite/client" />

interface ClickerBtn {
    clickPower: number;
    clickPowerMultiplier: number;
    userClickCount: number;
}

interface AutoClicker {
    clickPower: number;
    clickPowerMultiplier: number;
    clickTimer: number;
    autoClickerClickCount: number;
}

interface User {
    points: number;
}

interface Upgrades {
    name: string;
    description: string;
    upgrade: {
        upgradeClickPowerBy?: number;
        increaseUserClickPower?(userPower: number, increaseBy: number): number;

        upgradeClickPowerMultiplierBy?: number;
        increaseUserClickPowerMultiplier?(userPower: number, increaseBy: number): number;

        upgradeAutoClickerPowerBy?: number;
        increaseAutoClickerPower?(clickPower: number, increaseBy: number): number;

        upgradeAutoClickerPowerMultiplierBy?: number;
        increaseAutoClickerPowerMultiplier?(clickPower: number, increaseBy: number): number;

        upgradeAutoClickerTimerBy?: number;
        decreaseAutoClickerTimer?(clickTimer: number, decreaseBy: number): number;
    };
    upgradedTimes: number;
    maxUpgrades: number;
    cost: number;
    costIncrease(cost: number): number;
}