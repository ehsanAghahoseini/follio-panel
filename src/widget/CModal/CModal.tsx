import React, { useState } from "react";

function CModal(props: any) {


    React.useEffect(() => {
        toggle(props.visible)
    }, [props.visible])

    function toggle(val: any) {
        const body = document.getElementsByTagName("body")[0];
        if (val) {
            body.style.touchAction = "none";
            body.style.width = "100%";
            body.style.overflow = "hidden";
        } else {
            body.style.touchAction = "unset";
            body.style.width = "unset";
            body.style.overflow = "auto";
        }
    }


    const handelClose = () => {
        const Modal = document.getElementById(`CModal-${props.uId}`);
        const contModal = document.getElementById(`CModal-cont-${props.uId}`);
        window.addEventListener('click', function (e: any) {
            if (Modal!.contains(e.target)) {
                if (!contModal!.contains(e.target)) {
                    // Modal.classList.remove('CModal-active')
                    props.setVisible(false)
                    if (props.onScap) {
                        props.onScap()
                    }
                }
            }
        });
    }


    React.useEffect(() => {
        handelClose()
    }, [])



    return (
        <div id={`CModal-${props.uId}`} className={`CModal ${props.visible && 'CModal-active'}`}>
            <div id={`CModal-cont-${props.uId}`} className="CModal-cont" style={{ borderRadius: props.radius }}>
                {props.title &&
                    <div className="CModel-head">
                        <h4>{props.title}</h4>
                    </div>
                }
                {props.children}
            </div>
        </div>
    )
}

export default CModal;