import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

class Modal extends Component {
    componentDidMount() {
        const options = {
            onOpenStart: () => {
                console.log("Open Start");
            },
            onOpenEnd: () => {
                console.log("Open End");
            },
            onCloseStart: () => {
                console.log("Close Start");
            },
            onCloseEnd: () => {
                console.log("Close End");
            },
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissible: false,
            startingTop: "4%",
            endingTop: "10%"
        };
        M.Modal.init(this.Modal, options);

        // let instance = M.Modal.getInstance(this.Modal);
        // instance.open();
        // instance.close();
        // instance.destroy();
    }

    render() {
        return (
            <div>
                {/*<button data-target={this.props.index} className="btn light-green darken-4 modal-trigger btn-small">*/}
                {/*    Показать*/}
                {/*</button>*/}

                <div className="card-image">
                <a className="modal-trigger" href={'#'+this.props.index}>
                    <img src={this.props.photo.image} />
                </a>
                </div>
                <div
                    ref={Modal => {
                        this.Modal = Modal;
                    }}
                    id={this.props.index}
                    className="modal"
                >
                    {/* If you want Bottom Sheet Modal then add
                        bottom-sheet class to the "modal" div
                        If you want Fixed Footer Modal then add
                        modal-fixed-footer to the "modal" div*/}
                    <div className="modal-content">
                        <h4>{this.props.photo.name}</h4>
                        <p>{this.props.photo.description}</p>
                        <img src={this.props.photo.image}
                             style={{maxHeight: 650, display: "block", marginLeft: "auto", marginRight: "auto"}}
                        />
                    </div>
                    <div className="modal-footer">
                        <a className="modal-close waves-effect waves-orange btn-flat">
                            Закрыть
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;
