import { useState, useEffect } from "react"

function pad(pad, val) {
  return pad ? String(val).padStart(2, '0') : val;
}


export default function Timer({ duration = 60 }) {
	const [end, setEnd] = useState(null)
	const [remaining, setRemaining] = useState(0)

	const running = end && remaining;

	const min = Math.floor(remaining / 60000);
	const sec = pad(min, Math.floor((remaining / 1000) % 60));
	const hun = pad(true, Math.floor((remaining % 1000) / 10));

	function tick () {
		if (running) {
			setRemaining(Math.max(0, end - Date.now()));
			requestAnimationFrame(() => tick())
		}
	}

	const start = () => {
		setEnd(Date.now() + remaining)
		tick()
	}
	const pause = () => {
		setEnd(null)
	}
	const reset = () => {
		setRemaining(duration * 1000)
		setEnd(running ? Date.now() + remaining : null);
	}

	const currentBtn = running ? 
		<button onClick={pause}>Pause</button> :
		<button onClick={start}>Play</button>

	return (
		<div>
			{ min ? `${min}:${sec}` : `${sec}.${hun}` }
			{ !remaining && currentBtn }
			<button onClick={reset}>Replay</button>
		</div>
	)
}