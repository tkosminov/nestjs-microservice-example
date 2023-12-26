export const date_mock = new Date(1703564192530);
jest.useFakeTimers().setSystemTime(date_mock);

export const v4_mock = '13487280-dd65-4196-8f5b-34852cf36d48';
jest.mock('uuid', () => ({ v4: () => v4_mock }));
