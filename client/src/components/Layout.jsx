import { useSwipeable } from 'react-swipeable';
import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, Box, useDisclosure } from '@chakra-ui/react';
import { Suspense ,lazy} from 'react';
import { Outlet } from 'react-router-dom';
const Loading = lazy(() => import("./Loading"));
const LeftBar = lazy(() => import("./LeftBar"));
const RightBar = lazy(() => import("./RightBar"));

const Layout = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const handlers = useSwipeable({
		onSwipedRight: () => onOpen(),
		preventDefaultTouchmoveEvent: true,
		trackMouse: true
	});

	return (
		<Suspense fallback={<Loading />}>
			<Box display="flex" {...handlers}>
				<Drawer isOpen={isOpen} placement="left" onClose={onClose}>
					<DrawerOverlay>
						<DrawerContent>
							<DrawerCloseButton />
							<Suspense fallback={<Loading />}>
								<LeftBar />
							</Suspense>
						</DrawerContent>
					</DrawerOverlay>
				</Drawer>
				<Box flex="2.15" display={{ base: "none", md: "block" }}>
					<Suspense fallback={<Loading />}>
						<LeftBar />
					</Suspense>
				</Box>
				<Box flex="6">
					<Suspense fallback={<Loading />}>
						<Outlet />
					</Suspense>
				</Box>
				<Suspense fallback={<Loading />}>
					<Box
						flex="3"
						display={{ base: "none", lg: "block" }}
					>
						<RightBar />
					</Box>
				</Suspense>
			</Box>
		</Suspense>
	);
};

export default Layout;