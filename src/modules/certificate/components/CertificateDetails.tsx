'use client';
import { ICertificate } from '../types';
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  Badge,
  Divider,
  Link as ChakraLink,
  Button,
  useColorModeValue,
  Flex,
  Table,
  Tbody,
  Tr,
  Td,
  Icon,
  useClipboard,
  Tooltip,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { Calendar, Copy, Download, ExternalLink, Shield, User } from 'lucide-react';
import Link from 'next/link';

interface CertificateDetailsProps {
  certificate: ICertificate;
  collectionAddress: string;
  collectionName: string;
}

export const CertificateDetails: FC<CertificateDetailsProps> = ({
  certificate,
  collectionAddress,
  collectionName,
}) => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const {
    id,
    owner,
    extension: {
      image,
      certificate_name,
      institution_name,
      recipient_name,
      issue_date,
      description,
      verification_url,
      attributes,
    },
  } = certificate;

  const formattedDate = issue_date ? new Date(issue_date).toLocaleDateString() : '';

  // Clipboard for copying certificate ID
  const { hasCopied, onCopy } = useClipboard(id);

  return (
    <Box py={8} bg={bgColor} minH="100vh" data-testid="certificate-details">
      <Container maxW="container.xl">
        <Flex
          direction={{ base: 'column', md: 'row' }}
          gap={8}
          bg={cardBg}
          p={6}
          borderRadius="lg"
          borderColor={borderColor}
          borderWidth="1px"
          shadow="sm"
        >
          {/* Left Column - Certificate Image */}
          <Box
            width={{ base: '100%', md: '40%' }}
            position="relative"
            borderRadius="md"
            overflow="hidden"
            borderWidth="1px"
            borderColor={borderColor}
          >
            {image ? (
              <Image
                src={image}
                alt={certificate_name || 'Certificate'}
                width="100%"
                height="auto"
                objectFit="contain"
              />
            ) : (
              <Flex
                height="400px"
                bgGradient="linear(to-r, blue.400, purple.500)"
                alignItems="center"
                justifyContent="center"
                p={10}
              >
                <VStack spacing={4}>
                  <Heading color="white" textAlign="center">
                    {certificate_name || 'Certificate'}
                  </Heading>
                  {recipient_name && (
                    <Text color="white" fontSize="lg" textAlign="center">
                      Awarded to {recipient_name}
                    </Text>
                  )}
                </VStack>
              </Flex>
            )}
            <Badge
              position="absolute"
              top="4"
              right="4"
              colorScheme="blue"
              fontSize="md"
              py={1}
              px={3}
              borderRadius="full"
            >
              NFT Certificate
            </Badge>
          </Box>

          {/* Right Column - Certificate Details */}
          <VStack align="stretch" spacing={6} width={{ base: '100%', md: '60%' }}>
            <Box>
              <HStack mb={2}>
                <Heading size="lg">{certificate_name || 'Unnamed Certificate'}</Heading>
              </HStack>

              <HStack>
                <Badge colorScheme="purple" fontSize="sm">
                  {collectionName}
                </Badge>

                <Text fontSize="sm" color="gray.500">
                  ID: {id.substring(0, 8)}...
                  <Tooltip label={hasCopied ? 'Copied!' : 'Copy ID'}>
                    <Button variant="ghost" size="xs" onClick={onCopy} ml={1} p={0}>
                      <Icon as={Copy} boxSize={3} />
                    </Button>
                  </Tooltip>
                </Text>
              </HStack>

              {description && (
                <Text mt={4} color="gray.600" fontSize="md">
                  {description}
                </Text>
              )}
            </Box>

            <Divider />

            <Box>
              <Heading size="sm" mb={3}>
                Certificate Details
              </Heading>

              <VStack align="start" spacing={3}>
                {recipient_name && (
                  <HStack>
                    <Icon as={User} color="blue.500" />
                    <Text fontWeight="medium">Recipient:</Text>
                    <Text>{recipient_name}</Text>
                  </HStack>
                )}

                {institution_name && (
                  <HStack>
                    <Icon as={Shield} color="blue.500" />
                    <Text fontWeight="medium">Issuing Institution:</Text>
                    <Text>{institution_name}</Text>
                  </HStack>
                )}

                {formattedDate && (
                  <HStack>
                    <Icon as={Calendar} color="blue.500" />
                    <Text fontWeight="medium">Issue Date:</Text>
                    <Text>{formattedDate}</Text>
                  </HStack>
                )}
              </VStack>
            </Box>

            {attributes && attributes.length > 0 && (
              <>
                <Divider />

                <Box>
                  <Heading size="sm" mb={3}>
                    Attributes
                  </Heading>

                  <Table variant="simple" size="sm">
                    <Tbody>
                      {attributes.map((attr, idx) => (
                        <Tr key={idx}>
                          <Td fontWeight="medium" pl={0}>
                            {attr.trait_type}
                          </Td>
                          <Td>{attr.value}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </>
            )}

            <Divider />

            <HStack spacing={4}>
              {verification_url && (
                <Button
                  leftIcon={<ExternalLink size={16} />}
                  colorScheme="blue"
                  variant="outline"
                  as={ChakraLink}
                  href={verification_url}
                  isExternal
                >
                  Verify Certificate
                </Button>
              )}

              <Button leftIcon={<Download size={16} />} colorScheme="blue">
                Download
              </Button>
            </HStack>

            <Box mt={4} p={3} borderRadius="md" bg="blue.50" _dark={{ bg: 'blue.900' }}>
              <Text fontSize="sm">
                This certificate is stored as an NFT on the blockchain. Owner:{' '}
                <Text as="span" fontWeight="bold">
                  {owner.substring(0, 10)}...{owner.substring(owner.length - 6)}
                </Text>
              </Text>
            </Box>
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default CertificateDetails;
