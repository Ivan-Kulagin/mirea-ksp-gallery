import React, {useContext} from 'react'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {AuthContext} from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'
import { useHistory } from "react-router-dom";
import Modal from "./Modal";
import EditDetailsModal from "./EditDetailsModal";

export const PhotosList = ({ photos, isUserOwnPage }) => {
    const {token, userId} = useContext(AuthContext)
    const {request} = useHttp()
    const history = useHistory()
    if (!photos.length) {
        return <p className="center">Фотографий пока нет</p>
    }

    const deleteHandler = async (value) => {
        try {
            console.log(value)
            await request('/api/photo/delete', 'DELETE', {photoId: value},{
                Authorization: `Bearer ${token}`
            })
            history.push('/gallery')
        } catch (e) {}
    }

    const editHandler = async (data) => {
        try {
            // console.log(data)
            await request('/api/photo/update', 'PATCH',
                {id: data.photoId, name: data.photoName, description: data.photoDescription, public: data.photoPublic},
                {Authorization: `Bearer ${token}`}
            )
            console.log(history)
            history.push('/gallery')
        } catch (e) {}
    }

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
                            <span className="blue-grey-text text-lighten-2">Опубликовал {photo.user_data[0].name}</span>
                        </div>
                        {(photo.user_data[0]._id === userId) && (isUserOwnPage) &&
                        <div className="card-action" style={{display: 'flex'}}>
                            <EditDetailsModal changeCallback={editHandler} photo={photo}/>

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
