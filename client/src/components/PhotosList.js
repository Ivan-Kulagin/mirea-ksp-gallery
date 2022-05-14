import React, {useContext} from 'react'
import {AuthContext} from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'
import {Link} from 'react-router-dom'

export const PhotosList = ({ photos }) => {
    const {token} = useContext(AuthContext)
    const {request} = useHttp()
    if (!photos.length) {
        return <p className="center">Фотографий пока нет</p>
    }

    const deleteHandler = async (value) => {
        try {
            console.log(value)
            await request('/api/photo/delete', 'POST', {photoId: value},{
                Authorization: `Bearer ${token}`
            })
        } catch (e) {}
    }

    return (
        <div className="row">
        { photos.map((photo) => {
            return (
                <div className="col s6" key={photo._id}>
                    <div className="card">
                        <div className="card-image">
                            <img src={photo.image} />
                        </div>
                        <div className="card-content">
                            <span className="card-title black-text text-accent-3">{photo.user_data[0].name}</span>
                            <p>{photo.name}</p>
                        </div>
                        <div className="card-action">
                            <button className="btn red darken-4"
                                    onClick={() => deleteHandler(photo._id)}> Delete
                            </button>

                            <button className="btn blue darken-4 offset-l3"
                                    onClick={() => deleteHandler(photo._id)}> Delete
                            </button>
                        </div>
                    </div>
                </div>
            )
        }) }
        </div>
    )
}
