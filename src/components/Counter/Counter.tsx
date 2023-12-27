"use client";

import { decrement, increment } from "@/app/lib/store/features/counter/counterSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import { RootState } from "@/app/lib/store/store";
import { useDispatch } from "react-redux";

const Counter = () => {
    const count = useAppSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();

    return (
        <div>
            <h1>Count: {count}</h1>
            <h1>isLoading: {`${"isLoading"}`}</h1>
            <button onClick={() => dispatch(increment())}>increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
        </div>
    );
};

export default Counter;
