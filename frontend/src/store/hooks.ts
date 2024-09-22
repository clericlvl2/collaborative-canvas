import { useDispatch, useSelector } from 'react-redux';

import type { IAppDispatch, IRootState } from './store';

export const useAppDispatch = useDispatch.withTypes<IAppDispatch>();
export const useAppSelector = useSelector.withTypes<IRootState>();
