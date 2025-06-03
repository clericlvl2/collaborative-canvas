// Why @app dependency? It's a weak 'type-only' dep, it allows redux hooks to be typed
import type { TAppDispatch, TRootState } from '@app/store';

import { useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = useDispatch.withTypes<TAppDispatch>();
export const useAppSelector = useSelector.withTypes<TRootState>();
