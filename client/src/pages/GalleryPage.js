import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {PhotosList} from '../components/PhotosList'

export const GalleryPage = () => {
    const [photos, setPhotos] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchPhotos = useCallback(async () => {
        try {
            const fetched = await request('/api/photo/public', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setPhotos(fetched)
        } catch (e) {}
    }, [token, request])

    useEffect(() => {
        fetchPhotos()
    }, [fetchPhotos])

    if (loading) {
        return <Loader/>
    }
    console.log(photos)
    return (
        <>
            {!loading && <PhotosList photos={photos} />}
        </>
    )
}
