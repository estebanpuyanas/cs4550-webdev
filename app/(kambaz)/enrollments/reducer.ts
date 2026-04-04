import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  enrollments: [] as any[],
};

const enrollmentsSlice = createSlice({
  name: 'enrollments',
  initialState,
  reducers: {
    setEnrollments: (state, { payload: enrollments }) => {
      state.enrollments = enrollments;
    },
    enroll: (state, { payload: enrollment }) => {
      state.enrollments = [...state.enrollments, enrollment] as any;
    },
    unenroll: (state, { payload: { userId, courseId } }) => {
      state.enrollments = state.enrollments.filter(
        (e: any) => !(e.user === userId && e.course === courseId),
      ) as any;
    },
  },
});

export const { setEnrollments, enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
