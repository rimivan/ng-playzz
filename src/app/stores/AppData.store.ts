import { signalStore, withState } from '@ngrx/signals';


const initialState: any = {};

export const TableRowState = signalStore(
  { providedIn: 'root' },
  withState(initialState)
);
