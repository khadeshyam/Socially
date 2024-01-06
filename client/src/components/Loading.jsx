import { Center, Spinner, Box } from '@chakra-ui/react'
const Loading = () => (
	<Box bgGradient="linear(to-r, #8253e0, #b542b3)">
		<Center h="100vh">
			<Spinner
				thickness='4px'
				speed='0.65s'
				emptyColor='gray.200'
				color='blue.500'
				size='xl'
			/>
		</Center>
	</Box>
);
export default Loading;