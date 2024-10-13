import {
    Box,
    Flex,
    Heading,
    Spacer,
    Link,
    IconButton,
    useDisclosure,
    Divider,
    Text,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CgMenuGridO } from 'react-icons/cg';
import { useEffect, useRef, useState } from 'react';
import '../App.css';

const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [showCloseIcon, setShowCloseIcon] = useState(false);
    const menuRef = useRef();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1180);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1180);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setShowCloseIcon(true), 200);
        } else {
            setShowCloseIcon(false);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const menuVariants = {
        hidden: { opacity: 0, x: '100%' },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                delayChildren: 0.5,
                staggerChildren: 0.5,
                duration: 0.5,
                ease: 'easeInOut',
            },
        },
        exit: { opacity: 0, x: '100%' },
    };

    return (
        <Box
            bgColor="#ebebeb"
            borderBottomRadius="12px"
            py="2.5rem"
            px="2rem"
            position="relative"
            boxShadow="lg"
            mb="10px"
            fontFamily="'Coda', system-ui"
        >
            <Flex alignItems="center" justifyContent="space-between" wrap="wrap">
                <Flex
                    flexDirection={isMobile ? 'column' : 'row'} 
                    alignItems={isMobile ? 'flex-start' : 'center'}
                >
                    <Heading
                        as={RouterLink}
                        to="/"
                        fontSize={{ base: '2xl', md: '3xl' }} 
                        fontFamily="'Coda', system-ui"
                        color="#000000"
                        letterSpacing="wider"
                        mb={isMobile ? 2 : 0} 
                    >
                        Logan Gonzalez #0
                    </Heading>
                </Flex>
                <Spacer />
                <IconButton
                    aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
                    icon={
                        showCloseIcon ? (
                            <motion.div
                                whileHover={{ scale: 1.2, color: '#e47608' }}
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'loop' }}
                                style={{ color: '#e47608' }}
                            >
                                <CloseIcon />
                            </motion.div>
                        ) : (
                            <motion.div
                                whileHover={{ scale: 1.2, color: '#e47608' }}
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'loop' }}
                                style={{ color: '#e47608' }}
                            >
                                <CgMenuGridO />
                            </motion.div>
                        )
                    }
                    display={isMobile ? 'block' : 'none'}
                    onClick={isOpen ? onClose : onOpen}
                    variant="unstyled"
                    fontSize="30px"
                    _focus={{ boxShadow: 'none' }}
                    mt="20px"
                    mb="20px"
                />
                <Flex
                    as="ul"
                    display={isMobile ? 'none' : 'flex'}
                    listStyleType="none"
                    ml="auto"
                    alignItems="center"
                    gap="2rem"
                    flex="1"
                    justifyContent="space-evenly"
                    whiteSpace="nowrap"
                >
                    {['PLAYER BIO', 'HOOPS FILM', 'PLAYER CARDS', 'ACADEMICS', 'STAT TRACKER'].map((text, index) => (
                        <Link
                            key={index}
                            as={RouterLink}
                            to="/"
                            fontSize="lg"
                            fontWeight="extrabold"
                            color="#000000"
                            position="relative"
                            _hover={{ transform: 'scale(1.05)', transition: 'transform 0.2s', color: '#e47608' }}
                            _after={{
                                content: '""',
                                position: 'absolute',
                                bottom: '-0.2rem',
                                left: 0,
                                width: '0%',
                                height: '2px',
                                bg: '#e47608',
                                transition: 'width 0.3s ease',
                            }}
                            _hoverAfter={{ width: '100%' }}
                        >
                            {text}
                        </Link>
                    ))}
                </Flex>

                {isOpen && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={menuVariants}
                        style={{ position: 'fixed', top: 0, right: 0, width: '70%', height: '100vh', zIndex: 10 }}
                    >
                        <Box
                            ref={menuRef}
                            bgColor="#ebebeb"
                            p="1rem"
                            borderTopLeftRadius="30px"
                            borderBottomLeftRadius="30px"
                            color="#000000"
                            height="100%"
                            boxShadow="0 0 20px rgba(0, 0, 0, 0.9)"
                        >
                            <Flex alignItems="center" justifyContent="space-between" mb="1rem">
                                <Text fontSize="lg" ml="20px" fontWeight="extrabold">
                                    MENU
                                </Text>
                                <IconButton
                                    icon={<CloseIcon w={6} h={6} />}
                                    color="#F28C28"
                                    aria-label="Close Menu"
                                    variant="outline"
                                    onClick={onClose}
                                    bgColor="transparent"
                                    _focus={{ boxShadow: 'none' }}
                                    _hover={{ bg: 'transparent' }}
                                    size="lg"
                                    fontWeight="bold"
                                />
                            </Flex>
                            <Divider />
                            <Flex as="ul" flexDirection="column" alignItems="flex-start" gap="1rem" mt="1rem">
                                {['PLAYER BIO', 'HOOPS FILM', 'PLAYER CARDS', 'ACADEMICS', 'STAT TRACKER'].map((text, index) => (
                                    <Link
                                        key={index}
                                        as={RouterLink}
                                        to="/"
                                        fontSize="lg"
                                        fontWeight="extrabold"
                                        color="#000000"
                                        position="relative"
                                        _hover={{ transform: 'scale(1.05)', transition: 'transform 0.2s', color: '#e47608' }}
                                    >
                                        {text}
                                    </Link>
                                ))}
                            </Flex>
                        </Box>
                    </motion.div>
                )}
            </Flex>
        </Box>
    );
};

export default Navbar;
