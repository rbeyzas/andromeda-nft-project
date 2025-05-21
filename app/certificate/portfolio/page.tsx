'use client';
import { CertificatesList } from '@/modules/certificate/components/CertificatesList';
import { ICertificate } from '@/modules/certificate/types';
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Icon,
  Skeleton,
  SkeletonText,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { ArrowLeft, Award, User, Wallet } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

const mockUserCertificates: ICertificate[] = [
  {
    id: 'cert-001',
    owner: 'cosmos1skjwj5whet0lpe65qaq4rpq03hjxlwd9nf39lk',
    extension: {
      institution_name: 'Tech University',
      certificate_name: 'Advanced Web Development',
      recipient_name: 'Ahmet Yılmaz',
      issue_date: '2023-08-15',
      image:
        'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHdlYiUyMGRldmVsb3BtZW50fGVufDB8fDB8fHww',
      description:
        'This certificate acknowledges completion of 120 hours of advanced web development training.',
      attributes: [
        { trait_type: 'Grade', value: 'A' },
        { trait_type: 'Skills', value: 'React, Node.js, TypeScript' },
      ],
    },
  },
  {
    id: 'cert-002',
    owner: 'cosmos1skjwj5whet0lpe65qaq4rpq03hjxlwd9nf39lk',
    extension: {
      institution_name: 'Design Academy',
      certificate_name: 'Professional UI/UX Designer',
      recipient_name: 'Ahmet Yılmaz',
      issue_date: '2023-09-20',
      image:
        'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHVpJTIwZGVzaWdufGVufDB8fDB8fHww',
      description: 'This certifies proficiency in UI/UX design principles and tools.',
      attributes: [
        { trait_type: 'Tools', value: 'Figma, Adobe XD' },
        { trait_type: 'Projects Completed', value: '5' },
      ],
    },
  },
];

export default function PortfolioPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Demo için bağlantı simülasyonu
  const handleConnect = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsConnected(true);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Box minH="100vh" bg={bgColor}>
      <Container maxW="container.xl" py={8}>
        <Button
          as={Link}
          href="/certificate"
          variant="ghost"
          leftIcon={<ArrowLeft size={18} />}
          size="sm"
          mb={6}
        >
          Back to Certificates
        </Button>

        <Box mb={8}>
          <Heading as="h1" size="xl" mb={3}>
            Your Certificate Portfolio
          </Heading>
          <Text color="gray.600">
            Manage and view all your educational NFT certificates in one place.
          </Text>
        </Box>

        {!isConnected ? (
          <Box
            borderWidth="1px"
            borderRadius="lg"
            borderColor={borderColor}
            p={10}
            textAlign="center"
            bg="white"
            _dark={{ bg: 'gray.800' }}
          >
            <VStack spacing={6}>
              <Icon as={Wallet} boxSize={16} color="blue.500" />

              <VStack spacing={2}>
                <Heading size="md">Connect Your Wallet</Heading>
                <Text color="gray.600">
                  Connect your wallet to view your NFT certificates and manage your educational
                  portfolio.
                </Text>
              </VStack>

              <Button
                colorScheme="blue"
                size="lg"
                onClick={handleConnect}
                isLoading={isLoading}
                loadingText="Connecting..."
                leftIcon={<Wallet size={18} />}
              >
                Connect Wallet
              </Button>
            </VStack>
          </Box>
        ) : (
          <Box>
            <Flex
              bg="white"
              _dark={{ bg: 'gray.800' }}
              p={6}
              borderRadius="lg"
              borderWidth="1px"
              borderColor={borderColor}
              mb={8}
              justify="space-between"
              align="center"
              flexWrap={{ base: 'wrap', md: 'nowrap' }}
              gap={4}
            >
              <Flex align="center" gap={4}>
                <Flex
                  bg="blue.100"
                  color="blue.700"
                  _dark={{ bg: 'blue.900', color: 'blue.300' }}
                  p={3}
                  borderRadius="full"
                >
                  <User size={24} />
                </Flex>

                <Box>
                  <Heading size="md">Ahmet Yılmaz</Heading>
                  <Text fontSize="sm" color="gray.600">
                    cosmos1skjwj5whet0lpe65qaq4rpq03hjxlwd9nf39lk
                  </Text>
                </Box>
              </Flex>

              <Flex
                gap={5}
                wrap="wrap"
                justify={{ base: 'flex-start', sm: 'flex-end' }}
                w={{ base: '100%', md: 'auto' }}
              >
                <Box textAlign="center">
                  <Text fontSize="sm" color="gray.500">
                    Total Certificates
                  </Text>
                  <Heading size="md" color="blue.500">
                    {mockUserCertificates.length}
                  </Heading>
                </Box>

                <Box textAlign="center">
                  <Text fontSize="sm" color="gray.500">
                    Institutions
                  </Text>
                  <Heading size="md" color="purple.500">
                    {new Set(mockUserCertificates.map((c) => c.extension.institution_name)).size}
                  </Heading>
                </Box>
              </Flex>
            </Flex>

            <Tabs colorScheme="blue" variant="enclosed">
              <TabList>
                <Tab>All Certificates</Tab>
                <Tab>By Institution</Tab>
              </TabList>

              <TabPanels>
                <TabPanel px={0}>
                  <CertificatesList certificates={mockUserCertificates} title="Your Certificates" />
                </TabPanel>

                <TabPanel px={0}>
                  <Box
                    p={5}
                    borderWidth="1px"
                    borderRadius="md"
                    bg="white"
                    _dark={{ bg: 'gray.800' }}
                  >
                    <Heading size="md" mb={4}>
                      Certificates by Institution
                    </Heading>

                    {Array.from(
                      new Set(mockUserCertificates.map((c) => c.extension.institution_name)),
                    ).map((institution) => (
                      <Box key={institution} mb={6}>
                        <Flex align="center" gap={2} mb={3}>
                          <Award size={20} color="#805AD5" />
                          <Heading size="sm">{institution}</Heading>
                        </Flex>

                        <Divider mb={4} />

                        <CertificatesList
                          certificates={mockUserCertificates.filter(
                            (c) => c.extension.institution_name === institution,
                          )}
                          showFilters={false}
                          title=""
                        />
                      </Box>
                    ))}
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        )}
      </Container>
    </Box>
  );
}
