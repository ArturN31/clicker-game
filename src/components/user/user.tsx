export const User = (props: { userProps: User; clickerBtnProps: ClickerBtn }) => {
	const { userProps, clickerBtnProps } = props;
	return (
		<div className='text-xl text-center text-white bg-[#A63446]/[0.5] h-fit select-none border-2 border-black m-2'>
			<p className='p-2 bg-[#A63446]/[0.75] border-b-[1px] border-black font-semibold'>User:</p>
			<div className='grid justify-center grid-cols-1 gap-5 p-4 sm:flex sm:flex-wrap sm:flex-grow'>
				<p>Pts: {Math.floor(userProps.points * 1000) / 1000}</p>
				<p>Pwr: {Math.floor(clickerBtnProps.clickPower * 1000) / 1000}</p>
				<p>Mult: {Math.floor(clickerBtnProps.clickPowerMultiplier * 1000) / 1000}x</p>
				<p>Pts/click: {Math.floor(clickerBtnProps.clickPower * clickerBtnProps.clickPowerMultiplier * 1000) / 1000}</p>
				<p>Clicks: {clickerBtnProps.userClickCount}</p>
			</div>
		</div>
	);
};
