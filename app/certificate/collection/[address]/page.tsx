'use client';
import { CertificatesList } from '@/modules/certificate/components/CertificatesList';
import { ICertificate, ICertificateCollection } from '@/modules/certificate/types';
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Icon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react';

// Demo veri - normalde API/blockchain'den alınır
const mockCollections: ICertificateCollection[] = [
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
      {
        id: 'cert-003',
        owner: 'cosmos1skjwj5whet0lpe65qaq4rpq03hjxlwd9nf39lm',
        extension: {
          institution_name: 'Tech University',
          certificate_name: 'Mobile App Development',
          recipient_name: 'Mehmet Öz',
          issue_date: '2023-07-10',
          image:
            'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW9iaWxlJTIwYXBwfGVufDB8fDB8fHww',
          description:
            'Certificate for completing the mobile app development course with Flutter and React Native.',
          attributes: [
            { trait_type: 'Grade', value: 'B+' },
            { trait_type: 'Skills', value: 'Flutter, React Native' },
          ],
        },
      },
    ],
  },
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
  {
    name: 'Business Management Certifications',
    symbol: 'BMC',
    cw721: 'cosmos14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s4hmalb',
    certificates: [],
  },
];

export default function CollectionPage() {
  const params = useParams<{ address: string }>();
  const address = params.address;

  // Adresi kullanarak koleksiyonu bul
  const collection = useMemo(() => {
    return mockCollections.find((c) => c.cw721 === address);
  }, [address]);

  if (!collection) {
    return (
      <Container maxW="container.xl" py={10}>
        <Box textAlign="center" py={10}>
          <Heading mb={4}>Collection Not Found</Heading>
          <Text mb={6}>
            The certificate collection you&apos;re looking for does not exist or has been removed.
          </Text>
          <Button as={Link} href="/certificate" leftIcon={<ArrowLeft size={18} />}>
            Back to Certificates
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Box>
      <Container maxW="container.xl" py={6}>
        <HStack mb={6}>
          <Button
            as={Link}
            href="/certificate"
            variant="ghost"
            leftIcon={<ArrowLeft size={18} />}
            size="sm"
          >
            Back
          </Button>
        </HStack>

        <Flex justify="space-between" align="center" mb={8}>
          <Box>
            <Heading size="xl">{collection.name}</Heading>
            <Text color="gray.600">
              Contract: {collection.cw721.substring(0, 8)}...
              {collection.cw721.substring(collection.cw721.length - 8)}
            </Text>
          </Box>

          <Button
            as={Link}
            href={`/certificate/create?collection=${collection.cw721}`}
            colorScheme="blue"
            leftIcon={<Plus size={18} />}
          >
            Create Certificate
          </Button>
        </Flex>
      </Container>

      <CertificatesList
        certificates={collection.certificates}
        collection={collection}
        title={`${collection.name} (${collection.symbol})`}
      />
    </Box>
  );
}
