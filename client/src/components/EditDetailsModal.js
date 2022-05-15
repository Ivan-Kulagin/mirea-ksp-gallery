import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photoId: this.props.photo._id,
            photoName: this.props.photo.name,
            photoDescription: this.props.photo.description,
            photoPublic: this.props.photo.public
        }
    }

    sendData = (e) => {
        e.preventDefault()
        // console.log(this.state)
        this.props.changeCallback(this.state)
    }

    componentDidMount() {
        const options = {
            onOpenStart: () => {},
            onOpenEnd: () => {},
            onCloseStart: () => {},
            onCloseEnd: () => {},
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissible: false,
            startingTop: "5%",
            endingTop: "30%"
        };
        M.Modal.init(this.Modal, options);
    }

    render() {
        return (
            <div>
                <button data-target={this.props.photo._id} className="modal-trigger btn blue darken-4 waves-effect waves-light btn-small">
                    Изменить
                </button>

                <div
                    ref={Modal => {
                        this.Modal = Modal;
                    }}
                    id={this.props.photo._id}
                    className="modal"
                    style={{maxWidth: 800}}
                >
                    <div className="modal-content">
                        <form action="" onSubmit={this.props.handleChange}>
                            <div style={{display: 'flex'}}>
                                <img src={this.props.photo.image} style={{height: 200, marginRight: 20}}/>
                                <div style={{width: 500}}>
                                    <h5>Подпись</h5>
                                    <div className="input-field">
                                        <input
                                            placeholder={this.state.photoName}
                                            value={this.state.photoName}
                                            id="name"
                                            type="text"
                                            onChange={(e) => this.setState({photoName: e.target.value})}
                                        />
                                    </div>
                                    <label>
                                        <input type="checkbox" onChange={(e) => this.setState({photoPublic: e.target.checked})}
                                               checked={this.state.photoPublic}
                                               className="filled-in"
                                        />
                                        <span>Опубликовать</span>
                                    </label>
                                </div>
                            </div>

                            <h5>Описание</h5>
                            <div className="input-field">
                                <textarea
                                    placeholder={this.state.photoDescription}
                                    value={this.state.photoDescription}
                                    id="description"
                                    className="materialize-textarea"
                                    style={{height: 250}}
                                    type="text"
                                    onChange={(e) => this.setState({photoDescription: e.target.value})}
                                />
                            </div>
                            <div className="right-align">
                                <button className="btn modal-close" onClick={this.sendData}>Обновить</button>
                            </div>
                        </form>
                    </div>
                    {/*        <div className="file-field input-field">*/}
                    {/*            <div className="btn">*/}
                    {/*                <span>Выбрать фото</span>*/}
                    {/*                <input type="file"/>*/}
                    {/*            </div>*/}
                    {/*            <div className="file-path-wrapper">*/}
                    {/*                <input className="file-path validate" type="text"*/}
                    {/*                       placeholder="Фотография"/>*/}
                    {/*                <FileBase64*/}
                    {/*                    multiple={ false }*/}
                    {/*                    onDone={({base64}) => setItem({ ...item, image: base64 })}*/}
                    {/*                />*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        <div style={{display: "flex"}}>*/}
                    {/*            <div>*/}
                    {/*                <label>*/}
                    {/*                    <input type="checkbox" onChange={e => setItem({...item, public: e.target.checked})}*/}
                    {/*                           className="filled-in"*/}
                    {/*                    />*/}
                    {/*                    <span>Опубликовать</span>*/}
                    {/*                </label>*/}
                    {/*            </div>*/}
                    {/*            <div style={{width: "100%"}}></div>*/}
                    {/*            <div className="right-align">*/}
                    {/*                <button className="btn">submit</button>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </form>*/}
                    {/*</div>*/}
                    <div className="modal-footer">
                        <a className="modal-close waves-effect waves-orange">
                            Закрыть
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;
