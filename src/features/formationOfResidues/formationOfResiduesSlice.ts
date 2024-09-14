import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormationOfResiduesData } from './dataModule';
import { DataFiltersValues, DataTableCellSubmitData, FiltersVariants, SortType } from './types';
import { RootState } from '~/store/types';
import { getUUID } from '~/utils/getUUID';

const SLICE_NAME = 'formationOfResiduesSlice';

interface IS {
  data: FormationOfResiduesData | null;
  sort: SortType | null;
  filters: DataFiltersValues;
}

const initialState: IS = {
  data: null,
  sort: null,
  filters: {
    barCode: null,
    article: null,
    size: null,
    category: null,
  },
};

const { actions, reducer, selectors } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    clear: () => initialState,
    setData: (state, action: PayloadAction<FormationOfResiduesData>) => {
      state.data = action.payload;
    },
    sort: (state, action: PayloadAction<keyof FormationOfResiduesData[number]>) => {
      if (state.sort === null) {
        state.sort = { field: action.payload, order: 'asc' };
        return;
      }
      if (state.sort.field === action.payload) {
        if (state.sort.order === 'asc') {
          state.sort = { field: action.payload, order: 'desc' };
          return;
        }
        if (state.sort.order === 'desc') {
          state.sort = null;
          return;
        }
      }
      if (state.sort.field !== action.payload) {
        state.sort = { field: action.payload, order: 'asc' };
      }
    },
    editCell: (state, action: PayloadAction<DataTableCellSubmitData<FormationOfResiduesData[number]>>) => {
      if (state.data === null) {
        return;
      }
      const actualData = state.data.map((el) => {
        if (el.id === action.payload.rowId) {
          return { ...el, [action.payload.field]: action.payload.value };
        }
        return el;
      });

      state.data = actualData;
    },
    setFilters: (state, action: PayloadAction<DataFiltersValues>) => {
      state.filters = action.payload;
    },
  },
});

export const formationOfResiduesSlice = { actions, selectors, thunks: {} } as const;

export const formationOfResiduesReducer = reducer;

export const formationOfResiduesGetDataSelector = createSelector(
  (state: RootState) => state.formationOfResidues.data,
  (state: RootState) => state.formationOfResidues.filters,

  (state: RootState) => state.formationOfResidues.sort,
  (data, filters, sort) => {
    if (data === null) {
      return null;
    }
    const actualData = data.filter((el) => {
      let filterCount = 0;

      if (filters.barCode === null || String(el.barCode).toLowerCase().includes(filters.barCode.toLowerCase())) {
        filterCount++;
      }

      if (filters.article === null || String(el.article).toLowerCase().includes(filters.article.toLowerCase())) {
        filterCount++;
      }

      if (filters.size === null || String(el.size).toLowerCase().includes(filters.size.toLowerCase())) {
        filterCount++;
      }

      if (filters.category === null || String(el.category) === filters.category) {
        filterCount++;
      }
      // счетчик пройденных фильтров должен быть равен кол-ву фильтров
      return filterCount === 4;
    });

    if (sort) {
      actualData.sort((a, b) => {
        const left = sort.order === 'asc' ? b : a;
        const right = sort.order === 'asc' ? a : b;
        if (left[sort.field] < right[sort.field]) {
          return 1;
        }
        if (left[sort.field] > right[sort.field]) {
          return -1;
        }
        return 0;
      });
    }

    return actualData;
  },
);

export const formationOfResiduesGetFiltersVariantsSelector = createSelector(
  (state: RootState) => state.formationOfResidues.data,
  (data): FiltersVariants | null => {
    if (data === null) {
      return null;
    }
    const categoryFilterValues: FiltersVariants['categoryFilterValues'] = [
      { id: getUUID(), value: '', name: 'Не выбрано' },
    ];

    const categoriesSet = new Set();

    data.forEach(({ category }) => {
      if (!categoriesSet.has(category)) {
        categoriesSet.add(category);
        categoryFilterValues.push({ id: getUUID(), value: category, name: category });
      }
    });

    return { categoryFilterValues };
  },
);
