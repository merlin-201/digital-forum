import { useState } from "react";

import "./PostInput.css";

import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { createPost } from "../../actions/posts";
import { hidePostInputPopup } from "../../actions/postInputPopup";


export default function PostInput() {
	const dispatch = useDispatch();

	const [comment, setComment] = useState("");

	const topicId = useSelector( (state) => state.topic.id );
	const taggedUser = useSelector( (state) => state.postInputPopup.taggedUser);
		
	const handleSubmit = () => {
		let reqBody = {
			topic_id : topicId,
			text : comment,
			tagged_user_id : taggedUser?.id
		}
		dispatch( createPost(reqBody) );
	}


	return (
		<div className="card shadow-lg rounded comment-box">

		<div className="card-header d-flex justify-content-between">
			<strong className="fs-5">Comment</strong>
			<FontAwesomeIcon icon={faClose} className="fs-3 mx-3" style={{cursor : "pointer"}} onClick={ () => dispatch( hidePostInputPopup() )}/>
		</div>

		<div className="card-body pb-2">
			{ taggedUser && (
				<span className="text-muted">
					Replying to&nbsp;
					<span className="text-primary">@{taggedUser?.username}</span>
				</span>
			)}

			<textarea
			className="form-control mt-2"
			placeholder="Leave a comment here"
			style={{ height: 150 }}
			name="comment"
			value={comment}
			onChange={e => setComment(e.target.value)}
			>
			</textarea>
			

			<div className="float-end mt-2">
			<button type="button" className="btn btn-primary px-4" onClick={handleSubmit}>Post</button>
			</div>
		</div>
		</div>
	);
}