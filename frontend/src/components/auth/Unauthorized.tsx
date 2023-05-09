import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
	const navigate = useNavigate();

	function goBack() {
		navigate('/');
	}

	return (
		<section>
			<div className='unauthorized'>
				<h1>Unauthorized</h1>
				<p>
					You do not have the correct access for the requested page.
				</p>
				<button className='btn btn-primary' onClick={goBack}>
					Home
				</button>
			</div>
		</section>
	);
};

export default Unauthorized;
