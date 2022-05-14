import React, {useContext} from 'react'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {AuthContext} from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'
import Modal from "./Modal";
import {Link} from 'react-router-dom'

export const PhotosList = ({ photos }) => {
    const {token, userId} = useContext(AuthContext)
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

    const editHandler = () => {console.log('edit')}

    return (
        <ResponsiveMasonry
            columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
        ><Masonry>
        { photos.map((photo, index) => {
            return (
                <div key={photo._id}>
                    <div className="card" style={{marginLeft: 10}}>
                        <Modal index={index} photo={photo} />
                        <div className="card-content">
                            <span className="card-title black-text text-accent-3">{photo.name}</span>
                            <p className="truncate">{photo.description}</p>
                        </div>
                        {(photo.user_data[0]._id === userId) &&
                        <div className="card-action" style={{display: 'flex'}}>
                            <button className="btn blue darken-4 waves-effect waves-light btn-small"
                                    onClick={() => editHandler(photo._id)}> Изменить
                            </button>

                            <button className="btn red darken-4 waves-effect waves-light btn-small" style={{marginLeft: 8}}
                                    onClick={() => deleteHandler(photo._id)}> Удалить
                            </button>
                        </div>
                        }
                    </div>
                </div>
            )
        }) }</Masonry></ResponsiveMasonry>
    )
}
