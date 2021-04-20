import React from 'react';
import "Modal.css";
import Star_1 from "elements/Star";
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as movieActions } from 'redux/modules/movie';

const Modal = ( props ) => {

    const dispatch = useDispatch();

    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { id, open, close, header, content, rate } = props;

    const [ value, setValue ] = React.useState("");

    const editReview = () => {

        const obj = {
            r_id : id,
            rate : rate,
            content : value,
        };
        console.log(obj);

        dispatch(movieActions.editCommentAPI(obj));
        close();
    }

    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={ open ? 'openModal modal' : 'modal' }>
            { open ? (  
                <section>
                    <header>
                        {header}
                        {/* <Star_1 /> */}
                        {/* <button className="close" onClick={close}> &times; </button> */}
                    </header>
                    <textarea defaultValue={content} onChange={(e)=> setValue(e.target.value)}>
                        {/* {props.children} */}
                    </textarea>
                    <footer>
                        <button className="edit" onClick={editReview}> 수정 </button>
                        <button className="close" onClick={close}> 취소 </button>
                    </footer>
                </section>
            ) : null }
        </div>
    )
}

export default Modal;