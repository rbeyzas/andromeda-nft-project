'use client';
import { ICertificate } from '../types';
import {
  Box,
  Image,
  Text,
  Badge,
  VStack,
  Heading,
  Flex,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import React, { FC } from 'react';

interface CertificateCardProps {
  certificate: ICertificate;
  collectionAddress?: string;
  collectionName?: string;
}

export const CertificateCard: FC<CertificateCardProps> = ({
  certificate,
  collectionAddress,
  collectionName,
}) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const {
    id,
    extension: { image, certificate_name, institution_name, recipient_name, issue_date },
  } = certificate;

  const formattedDate = issue_date ? new Date(issue_date).toLocaleDateString() : '';

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={cardBg}
      borderColor={borderColor}
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', shadow: 'md' }}
      data-testid="certificate-card"
    >
      <Link href={`/certificate/${collectionAddress}/${id}`} passHref>
        <Box as="a">
          <Box position="relative" height="200px" overflow="hidden">
            {image ? (
              <Image
                src={image}
                alt={certificate_name || 'Certificate'}
                objectFit="cover"
                width="100%"
                height="100%"
              />
            ) : (
              <Flex
                height="100%"
                bgGradient="linear(to-r, blue.400, purple.500)"
                alignItems="center"
                justifyContent="center"
              >
                <Text color="white" fontWeight="bold">
                  {certificate_name || 'Certificate'}
                </Text>
              </Flex>
            )}
            <Badge
              position="absolute"
              top="2"
              right="2"
              colorScheme="blue"
              variant="solid"
              borderRadius="full"
              px="2"
            >
              NFT
            </Badge>
          </Box>

          <VStack p="4" align="start" spacing="2">
            <Heading size="md" noOfLines={1}>
              {certificate_name || 'Unnamed Certificate'}
            </Heading>

            <Text fontSize="sm" color="gray.500">
              ID: {id}
            </Text>

            <Divider />

            <Text fontSize="sm" fontWeight="medium">
              {recipient_name ? `Issued to: ${recipient_name}` : ''}
            </Text>

            <Text fontSize="sm">{institution_name ? `By: ${institution_name}` : ''}</Text>

            {formattedDate && (
              <Text fontSize="xs" color="gray.500">
                Issued on: {formattedDate}
              </Text>
            )}

            {collectionName && (
              <Badge variant="outline" colorScheme="purple" fontSize="xs">
                {collectionName}
              </Badge>
            )}
          </VStack>
        </Box>
      </Link>
    </Box>
  );
};

export default CertificateCard;
