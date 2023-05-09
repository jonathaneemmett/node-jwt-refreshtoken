import { Props } from '../types/types';
import Navbar from './Navbar';
import Title from './Title';

const Layout = ({ children }: Props) => {
	return (
		<>
			<Navbar />
			<main className='container'>
				<Title />
				{children}
			</main>
		</>
	);
};

export default Layout;
