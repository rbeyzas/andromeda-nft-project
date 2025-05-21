'use client';
import { ICertificate, ICertificateCollection } from '../types';
import {
  Box,
  Grid,
  Heading,
  Text,
  SimpleGrid,
  Container,
  Button,
  Flex,
  Select,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { FC, useState, useMemo } from 'react';
import { CertificateCard } from './CertificateCard';
import { Search } from 'lucide-react';

interface CertificatesListProps {
  certificates: ICertificate[];
  collection?: ICertificateCollection;
  title?: string;
  showFilters?: boolean;
}

export const CertificatesList: FC<CertificatesListProps> = ({
  certificates,
  collection,
  title = 'Certificates',
  showFilters = true,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name'>('newest');

  const bgColor = useColorModeValue('gray.50', 'gray.900');

  const filteredCertificates = useMemo(() => {
    let result = [...certificates];

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(
        (cert) =>
          cert.extension.certificate_name?.toLowerCase().includes(lowerSearch) ||
          cert.extension.recipient_name?.toLowerCase().includes(lowerSearch) ||
          cert.extension.institution_name?.toLowerCase().includes(lowerSearch) ||
          cert.id.toLowerCase().includes(lowerSearch),
      );
    }

    result.sort((a, b) => {
      if (sortBy === 'newest' && a.extension.issue_date && b.extension.issue_date) {
        return (
          new Date(b.extension.issue_date).getTime() - new Date(a.extension.issue_date).getTime()
        );
      } else if (sortBy === 'oldest' && a.extension.issue_date && b.extension.issue_date) {
        return (
          new Date(a.extension.issue_date).getTime() - new Date(b.extension.issue_date).getTime()
        );
      } else if (sortBy === 'name') {
        return (a.extension.certificate_name || '').localeCompare(
          b.extension.certificate_name || '',
        );
      }
      return 0;
    });

    return result;
  }, [certificates, searchTerm, sortBy]);

  return (
    <Box py={8} bg={bgColor} minH="100vh" data-testid="certificates-list">
      <Container maxW="container.xl">
        <Flex direction="column" mb={6}>
          <Heading as="h1" size="xl" mb={2}>
            {title}
          </Heading>

          {collection && (
            <Text color="gray.600" fontSize="md">
              Collection: {collection.name} ({collection.symbol})
            </Text>
          )}
        </Flex>

        {showFilters && (
          <HStack mb={6} spacing={4} wrap="wrap">
            <InputGroup maxW={{ base: 'full', md: '300px' }}>
              <InputLeftElement pointerEvents="none">
                <Icon as={Search} color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Search certificates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                bg="white"
                _dark={{ bg: 'gray.800' }}
              />
            </InputGroup>

            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              maxW={{ base: 'full', md: '200px' }}
              bg="white"
              _dark={{ bg: 'gray.800' }}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">By Name</option>
            </Select>
          </HStack>
        )}

        {filteredCertificates.length > 0 ? (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
            {filteredCertificates.map((certificate) => (
              <CertificateCard
                key={certificate.id}
                certificate={certificate}
                collectionAddress={collection?.cw721}
                collectionName={collection?.name}
              />
            ))}
          </SimpleGrid>
        ) : (
          <Flex
            direction="column"
            align="center"
            justify="center"
            p={10}
            borderRadius="lg"
            bg="white"
            _dark={{ bg: 'gray.800' }}
            shadow="sm"
          >
            <Heading size="md" mb={2}>
              No Certificates Found
            </Heading>
            <Text color="gray.500" textAlign="center">
              {searchTerm
                ? "Your search didn't match any certificates."
                : 'There are no certificates in this collection yet.'}
            </Text>
          </Flex>
        )}
      </Container>
    </Box>
  );
};

export default CertificatesList;
