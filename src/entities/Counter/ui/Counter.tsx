import { Button } from 'shared/ui/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { counterActions } from '../model/slice/counterSlice';
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';

export const Counter = () => {
    const dispatch = useDispatch();
    const counterValue = useSelector(getCounterValue);
    const onIncrement = () => {
        dispatch(counterActions.increment());
    };

    const onDecrement = () => {
        dispatch(counterActions.decrement());
    };
    return (
        <div>
            <h1 data-testid="value-title">{counterValue}</h1>
            <Button onClick={onIncrement} data-testid="increment-btn">+</Button>
            <Button onClick={onDecrement} data-testid="decrement-btn">-</Button>
        </div>
    );
};
