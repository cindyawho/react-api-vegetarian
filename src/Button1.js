import { useState } from 'react';

export default function Button1() {
    const [counter, setCounter] = useState(0);

    function handleClick() {
        setCounter(counter + 1);
    }

    return (
        <button onClick={handleClick}>
            Clicks - {counter}
        </button>
    );
}