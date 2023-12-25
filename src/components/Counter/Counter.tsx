"use client";
import { observer } from "mobx-react";
import useStore from "../../store/StoreProvider";

const Counter = () => {
    const store = useStore();

    function handleLoading() {
        store.setLoading(true);
    }

    return (
        <div>
            <h1>Count: {store.counter}</h1>
            <h1>isLoading: {`${store.isLoading}`}</h1>
            <button onClick={handleLoading}>Loading</button>
            <button onClick={() => store.decrement()}>Decrement</button>
        </div>
    );
};

export default observer(Counter);
