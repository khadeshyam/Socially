import { useContext } from 'react';
import { SocketContext } from '../context/socketContext';

const useSocket = ()=> {
	const context = useContext(SocketContext);

	if (context === undefined) {
		throw new Error('useSocket must be used within a SocketProvider');
	}

	return context;
}

export default useSocket;