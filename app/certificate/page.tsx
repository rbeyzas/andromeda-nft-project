'use client';
import { InstitutionsList } from '@/modules/certificate/components/InstitutionsList';
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { Award, BookOpen, Building2, Wallet } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const mockInstitutions = [
  {
    id: 'inst-001',
    name: 'Tech University',
    logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHVuaXZlcnNpdHl8ZW58MHx8MHx8fDA%3D',
    description:
      'Leading technology education institution offering certifications in software development, AI, and data science.',
    website: 'https://example.com',
    collections: [
      {
        name: 'Software Development Certifications',
        symbol: 'SDC',
        cw721: 'cosmos14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s4hmalr',
        certificates: [
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
        ],
      },
    ],
  },
  {
    id: 'inst-002',
    name: 'Design Academy',
    logo: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGRlc2lnbiUyMGFjYWRlbXl8ZW58MHx8MHx8fDA%3D',
    description:
      'Creative design academy focusing on UI/UX design, graphic design, and digital arts certifications.',
    website: 'https://example.com/design',
    collections: [
      {
        name: 'UI/UX Design Certifications',
        symbol: 'UIUX',
        cw721: 'cosmos14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s4hmala',
        certificates: [
          {
            id: 'cert-002',
            owner: 'cosmos1skjwj5whet0lpe65qaq4rpq03hjxlwd9nf39la',
            extension: {
              institution_name: 'Design Academy',
              certificate_name: 'Professional UI/UX Designer',
              recipient_name: 'Ayşe Demir',
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
        ],
      },
    ],
  },
  {
    id: 'inst-003',
    name: 'Business School',
    logo: 'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGJ1c2luZXNzJTIwc2Nob29sfGVufDB8fDB8fHww',
    description:
      'Premier business education provider offering certifications in management, finance, and entrepreneurship.',
    website: 'https://example.com/business',
    collections: [
      {
        name: 'Business Management Certifications',
        symbol: 'BMC',
        cw721: 'cosmos14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s4hmalb',
        certificates: [],
      },
    ],
  },
];

export default function CertificatePage() {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box minH="100vh">
      {/* Hero Section */}
      <Box bg="blue.600" color="white" py={{ base: 16, md: 24 }} px={4}>
        <Container maxW="container.xl">
          <VStack spacing={6} align="start" maxW="container.md">
            <Heading size="2xl">Educational Certificates as NFTs</Heading>
            <Text fontSize="xl">
              Secure, verifiable educational achievements stored on the blockchain. Own your
              credentials and build your professional portfolio with NFT certificates.
            </Text>
            <Flex gap={4} pt={4} flexWrap="wrap">
              <Button
                as={Link}
                href="/certificate/portfolio"
                size="lg"
                colorScheme="white"
                variant="outline"
                leftIcon={<Wallet size={20} />}
              >
                View Your Portfolio
              </Button>
              <Button
                as={Link}
                href="#institutions"
                size="lg"
                bg="white"
                color="blue.600"
                _hover={{ bg: 'gray.100' }}
                leftIcon={<Building2 size={20} />}
              >
                Browse Institutions
              </Button>
            </Flex>
          </VStack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={16} px={4} bg={bgColor}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <Heading textAlign="center">Benefits of NFT Certificates</Heading>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} width="full">
              <Box
                p={6}
                borderRadius="lg"
                borderWidth="1px"
                borderColor={borderColor}
                boxShadow="sm"
              >
                <VStack spacing={4} align="start">
                  <Flex bg="blue.100" color="blue.700" p={3} borderRadius="md">
                    <Award size={24} />
                  </Flex>
                  <Heading size="md">Verified Credentials</Heading>
                  <Text>
                    All certificates are verified by the issuing institutions and securely stored on
                    blockchain, ensuring authenticity.
                  </Text>
                </VStack>
              </Box>

              <Box
                p={6}
                borderRadius="lg"
                borderWidth="1px"
                borderColor={borderColor}
                boxShadow="sm"
              >
                <VStack spacing={4} align="start">
                  <Flex bg="green.100" color="green.700" p={3} borderRadius="md">
                    <Wallet size={24} />
                  </Flex>
                  <Heading size="md">Digital Portfolio</Heading>
                  <Text>
                    Build your professional portfolio by collecting verifiable certificates from
                    different institutions.
                  </Text>
                </VStack>
              </Box>

              <Box
                p={6}
                borderRadius="lg"
                borderWidth="1px"
                borderColor={borderColor}
                boxShadow="sm"
              >
                <VStack spacing={4} align="start">
                  <Flex bg="purple.100" color="purple.700" p={3} borderRadius="md">
                    <BookOpen size={24} />
                  </Flex>
                  <Heading size="md">Lifelong Learning</Heading>
                  <Text>
                    Partner with leading educational institutions to continuously enhance your
                    skills and certifications.
                  </Text>
                </VStack>
              </Box>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      <Divider />

      <Box py={8} id="institutions">
        <InstitutionsList institutions={mockInstitutions} showAddButton={true} />
      </Box>
    </Box>
  );
}
