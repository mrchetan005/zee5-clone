// useApi.js
import { useState } from 'react';
import api from '../api';

function useApi() {
    const [data, setData] = useState(null);
    const [moreData, setMoreData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // ! Function to make a GET request
    const get = async (queryPath) => {
        setLoading(true);
        try {
            const response = await api.get(queryPath);
            setData(response?.data?.data);
            if (response?.data?.data) {
                setMoreData(prev => [...prev, ...response.data.data]);
            }
            setError(null);
        } catch (err) {
            setError(err);
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const getSingle = async (queryPath) => {
        setLoading(true);
        try {
            const response = await api.get(queryPath);
            setData(response?.data?.data);
        } catch (err) {
            setError(err);
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return { data, moreData, setMoreData, loading, error, get, getSingle };
}

export default useApi;
