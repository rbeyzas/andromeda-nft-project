'use client';
import { IEducationInstitution } from '../types';
import {
  Box,
  Image,
  Text,
  Badge,
  VStack,
  Heading,
  Flex,
  HStack,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import Link from 'next/link';
import React, { FC } from 'react';
import { Building2, Award, ExternalLink } from 'lucide-react';

interface InstitutionCardProps {
  institution: IEducationInstitution;
}

export const InstitutionCard: FC<InstitutionCardProps> = ({ institution }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const { id, name, logo, description, website, collections } = institution;

  const certificateCount = collections.reduce(
    (acc, collection) => acc + collection.certificates.length,
    0,
  );

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={cardBg}
      borderColor={borderColor}
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', shadow: 'md' }}
      height="100%"
      display="flex"
      flexDirection="column"
      data-testid="institution-card"
    >
      <Flex p={4} alignItems="center" borderBottomWidth="1px" borderColor={borderColor}>
        <Box width="60px" height="60px" flexShrink={0} mr={4} borderRadius="md" overflow="hidden">
          {logo ? (
            <Image src={logo} alt={name} width="100%" height="100%" objectFit="cover" />
          ) : (
            <Flex
              width="100%"
              height="100%"
              bg="blue.500"
              alignItems="center"
              justifyContent="center"
            >
              <Building2 color="white" size={30} />
            </Flex>
          )}
        </Box>

        <VStack align="start" spacing={1}>
          <Heading size="md" noOfLines={1}>
            {name}
          </Heading>

          <HStack spacing={2}>
            <Badge colorScheme="blue">
              {collections.length} Collection{collections.length !== 1 ? 's' : ''}
            </Badge>
            {certificateCount > 0 && (
              <Badge colorScheme="green">
                <Flex align="center" gap={1}>
                  <Award size={12} />
                  <Text>
                    {certificateCount} Certificate{certificateCount !== 1 ? 's' : ''}
                  </Text>
                </Flex>
              </Badge>
            )}
          </HStack>
        </VStack>
      </Flex>

      <Box p={4} flex="1">
        <Text noOfLines={3} mb={4} fontSize="sm" color="gray.600">
          {description}
        </Text>
      </Box>

      <Box p={4} pt={0} borderTopWidth="1px" borderColor={borderColor} mt="auto">
        <HStack spacing={2}>
          <Button
            as={Link}
            href={`/institutions/${id}`}
            colorScheme="blue"
            variant="solid"
            size="sm"
            width="full"
          >
            View Details
          </Button>

          {website && (
            <Button
              as="a"
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit website"
              colorScheme="blue"
              variant="outline"
              size="sm"
              width="fit-content"
            >
              <ExternalLink size={16} />
            </Button>
          )}
        </HStack>
      </Box>
    </Box>
  );
};

export default InstitutionCard;
