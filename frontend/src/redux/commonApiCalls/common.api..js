import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURLPath = () => fetchBaseQuery({
    baseUrl:`http://localhost:5000/api/user`,
})

export const COMMON_API_CALLS = {
    baseURLPath
}