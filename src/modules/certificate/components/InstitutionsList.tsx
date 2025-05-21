'use client';
import { IEducationInstitution } from '../types';
import {
  Box,
  Grid,
  Heading,
  Text,
  SimpleGrid,
  Container,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import React, { FC, useState, useMemo } from 'react';
import { InstitutionCard } from './InstitutionCard';
import { Plus, Search } from 'lucide-react';
import Link from 'next/link';

interface InstitutionsListProps {
  institutions: IEducationInstitution[];
  title?: string;
  showAddButton?: boolean;
}

export const InstitutionsList: FC<InstitutionsListProps> = ({
  institutions,
  title = 'Educational Institutions',
  showAddButton = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  const filteredInstitutions = useMemo(() => {
    if (!searchTerm) return institutions;

    const lowerSearch = searchTerm.toLowerCase();
    return institutions.filter(
      (institution) =>
        institution.name.toLowerCase().includes(lowerSearch) ||
        institution.description.toLowerCase().includes(lowerSearch),
    );
  }, [institutions, searchTerm]);

  return (
    <Box py={8} bg={bgColor} minH="100vh" data-testid="institutions-list">
      <Container maxW="container.xl">
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align={{ base: 'flex-start', md: 'center' }}
          mb={6}
          gap={4}
        >
          <Heading as="h1" size="xl">
            {title}
          </Heading>

          {showAddButton && (
            <Button
              as={Link}
              href="/institutions/create"
              colorScheme="blue"
              leftIcon={<Plus size={18} />}
            >
              Add Institution
            </Button>
          )}
        </Flex>

        <Flex mb={6}>
          <InputGroup maxW={{ base: 'full', md: '400px' }}>
            <InputLeftElement pointerEvents="none">
              <Icon as={Search} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search institutions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              bg="white"
              _dark={{ bg: 'gray.800' }}
            />
          </InputGroup>
        </Flex>

        {filteredInstitutions.length > 0 ? (
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={6}>
            {filteredInstitutions.map((institution) => (
              <InstitutionCard key={institution.id} institution={institution} />
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
              No Institutions Found
            </Heading>
            <Text color="gray.500" textAlign="center">
              {searchTerm
                ? "Your search didn't match any institutions."
                : 'There are no educational institutions registered yet.'}
            </Text>
          </Flex>
        )}
      </Container>
    </Box>
  );
};

export default InstitutionsList;
