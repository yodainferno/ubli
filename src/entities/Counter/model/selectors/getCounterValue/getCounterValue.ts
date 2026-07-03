import { createSelector } from '@reduxjs/toolkit';
import { getCounter } from '../getCounter/getCounter';

// createSelector позволяет reselect - переиспользовать другие селеты
// мемоизирует
// тут нет вычислений - и можео было так, но для примера
export const getCounterValue = createSelector(
    getCounter,
    (counter) => counter.value,
);
