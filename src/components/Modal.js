import React from 'react';
import "shared/css/Modal.css";
import { useDispatch } from 'react-redux';
import { actionCreators as movieActions } from 'redux/modules/movie';

const Modal = ( props ) => {
    const dispatch = useDispatch();
    const { id, open, close, header, content, rate } = props; // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const [ value, setValue ] = React.useState("");

    const editReview = () => {
        const obj = {
            r_id : id,
            rate : rate,
            content : value,
        };
        dispatch(movieActions.editCommentAPI(obj));
        close(); // Modal Close
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