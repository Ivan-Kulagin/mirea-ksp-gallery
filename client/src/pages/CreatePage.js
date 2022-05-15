import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'
import {useMessage} from "../hooks/message.hook";
import FileBase64 from 'react-file-base64'

export const CreatePage = () => {
  const history = useHistory()
  const message = useMessage()
  const auth = useContext(AuthContext)
  const {request} = useHttp()
  const [profileName, setProfileName] = useState('')
  const [profileEmail, setProfileEmail] = useState('')
  const [item, setItem] = useState({ name: '', description: '', image: '', public: false });
  const getProfileData = async () => {
    const data = await request('/api/profile', 'GET', null, {
      Authorization: `Bearer ${auth.token}`
    })
    setProfileName(data.name)
    setProfileEmail(data.email)
  }

  useEffect(() => {
    window.M.updateTextFields()
    getProfileData()
  }, [])

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        await request('/api/profile/update', 'PATCH', {name: profileName}, {
          Authorization: `Bearer ${auth.token}`
        })
      } catch (e) {}
    }
  }

  const onSubmitHandler = async event => {
    event.preventDefault();
    try {
      const data = await request('/api/photo/upload', 'PUT',
          {name: item.name, description: item.description, image: item.image, public: item.public},
          {Authorization: `Bearer ${auth.token}`})
      message(data.message)
      history.push(`/`)
    } catch (e) {}
  }

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
        <div>
          <h5>Параметры профиля</h5>
          <br />
          <div className="input-field">
            <input
                placeholder="Введите ваше имя"
                id="name-field"
                type="text"
                value={profileName}
                onChange={e => setProfileName(e.target.value)}
                onKeyPress={pressHandler}
            />
            <label htmlFor="email-field">Имя автора</label>
          </div>
          <div className="input-field">
            <input
                placeholder="Адрес электронной почты"
                id="name-field"
                type="text"
                value={profileEmail}
                disabled={true}
            />
            <label htmlFor="email-field">Адрес электронной почты</label>
          </div>
        </div>
        <br />
        <div>
          <h5>Добавить фотографию</h5>
          <br />
          <form action="" onSubmit={onSubmitHandler}>
            <div className="input-field">
              <input
                  placeholder="Подпишите фотографию"
                  id="name"
                  type="text"
                  onChange={e => setItem({ ...item, name: e.target.value })}
              />
              <label htmlFor="name">Подпись к фотографии</label>
            </div>

            <div className="input-field">
              <input
                  placeholder="Расскажите, что изображено на вашей фотографии"
                  id="description"
                  type="text"
                  onChange={e => setItem({ ...item, description: e.target.value })}
              />
              <label htmlFor="description">Описание фотографии</label>
            </div>

            <div className="file-field input-field">
              <div className="btn">
                <span>Выбрать фото</span>
                <input type="file"/>
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text"
                       placeholder="Фотография"/>
                <FileBase64
                    multiple={ false }
                    onDone={({base64}) => setItem({ ...item, image: base64 })}
                />
              </div>
            </div>
            <div style={{display: "flex"}}>
              <div>
                <label>
                  <input type="checkbox" onChange={e => setItem({...item, public: e.target.checked})}
                         className="filled-in"
                  />
                  <span>Опубликовать</span>
                </label>
              </div>
              <div style={{width: "100%"}}></div>
              <div className="right-align">
                <button className="btn">submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
